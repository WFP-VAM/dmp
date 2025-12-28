#!/bin/bash

# Script to fetch CloudWatch logs for the backend ECS service
# Usage: ./get-logs.sh [application-name] [region] [--follow] [--tail N]

set -e

APPLICATION_NAME="${1:-stagingdmp}"
REGION="${2:-eu-west-1}"
FOLLOW=false
TAIL_LINES=100

# Parse arguments
shift 2 2>/dev/null || true
while [[ $# -gt 0 ]]; do
  case $1 in
    --follow|-f)
      FOLLOW=true
      shift
      ;;
    --tail|-n)
      TAIL_LINES="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "🔍 Fetching logs for application: $APPLICATION_NAME in region: $REGION"
echo "=========================================="

# Find the ECS cluster name
CLUSTER_NAME=$(aws ecs list-clusters \
  --region "$REGION" \
  --query "clusterArns[?contains(@, '${APPLICATION_NAME}')]" \
  --output text | head -n1 | awk -F'/' '{print $NF}')

if [ -z "$CLUSTER_NAME" ]; then
  echo "❌ Could not find ECS cluster for application: $APPLICATION_NAME"
  echo "Available clusters:"
  aws ecs list-clusters --region "$REGION" --output text
  exit 1
fi

echo "✅ Found cluster: $CLUSTER_NAME"

# Find the service name
SERVICE_NAME=$(aws ecs list-services \
  --region "$REGION" \
  --cluster "$CLUSTER_NAME" \
  --query "serviceArns[?contains(@, 'FargateService')]" \
  --output text | head -n1 | awk -F'/' '{print $NF}')

if [ -z "$SERVICE_NAME" ]; then
  echo "❌ Could not find ECS service in cluster: $CLUSTER_NAME"
  echo "Available services:"
  aws ecs list-services --region "$REGION" --cluster "$CLUSTER_NAME" --output text
  exit 1
fi

echo "✅ Found service: $SERVICE_NAME"

# Get the task definition name
TASK_DEFINITION=$(aws ecs describe-services \
  --region "$REGION" \
  --cluster "$CLUSTER_NAME" \
  --services "$SERVICE_NAME" \
  --query "services[0].taskDefinition" \
  --output text | awk -F'/' '{print $NF}' | awk -F':' '{print $1}')

if [ -z "$TASK_DEFINITION" ]; then
  echo "❌ Could not find task definition for service: $SERVICE_NAME"
  exit 1
fi

echo "✅ Found task definition: $TASK_DEFINITION"

# Get running tasks
TASK_ARN=$(aws ecs list-tasks \
  --region "$REGION" \
  --cluster "$CLUSTER_NAME" \
  --service-name "$SERVICE_NAME" \
  --desired-status RUNNING \
  --query "taskArns[0]" \
  --output text)

if [ -z "$TASK_ARN" ] || [ "$TASK_ARN" = "None" ]; then
  echo "⚠️  No running tasks found. Checking stopped tasks..."
  TASK_ARN=$(aws ecs list-tasks \
    --region "$REGION" \
    --cluster "$CLUSTER_NAME" \
    --service-name "$SERVICE_NAME" \
    --desired-status STOPPED \
    --query "taskArns[0]" \
    --output text)
fi

if [ -z "$TASK_ARN" ] || [ "$TASK_ARN" = "None" ]; then
  echo "❌ No tasks found for service: $SERVICE_NAME"
  exit 1
fi

echo "✅ Found task: $TASK_ARN"

# Extract task ID
TASK_ID=$(echo "$TASK_ARN" | awk -F'/' '{print $NF}')

# Try to find the log group - ECS Fargate typically uses /ecs/<task-definition-name>
LOG_GROUP="/ecs/$TASK_DEFINITION"

# Check if log group exists
if ! aws logs describe-log-groups \
  --region "$REGION" \
  --log-group-name-prefix "$LOG_GROUP" \
  --query "logGroups[?logGroupName=='$LOG_GROUP'].logGroupName" \
  --output text | grep -q "$LOG_GROUP"; then
  
  echo "⚠️  Log group $LOG_GROUP not found. Searching for log groups..."
  
  # Try alternative patterns
  ALTERNATIVE_GROUPS=$(aws logs describe-log-groups \
    --region "$REGION" \
    --query "logGroups[?contains(logGroupName, '${APPLICATION_NAME}') || contains(logGroupName, 'ecs')].logGroupName" \
    --output text)
  
  if [ -n "$ALTERNATIVE_GROUPS" ]; then
    echo "Found these log groups:"
    echo "$ALTERNATIVE_GROUPS" | tr '\t' '\n'
    LOG_GROUP=$(echo "$ALTERNATIVE_GROUPS" | tr '\t' '\n' | grep -i "ecs" | head -n1)
    if [ -z "$LOG_GROUP" ]; then
      LOG_GROUP=$(echo "$ALTERNATIVE_GROUPS" | tr '\t' '\n' | head -n1)
    fi
    echo "Using: $LOG_GROUP"
  else
    echo "❌ Could not find any log groups. The service may not have CloudWatch logging configured."
    exit 1
  fi
fi

echo ""
echo "📋 Fetching logs from: $LOG_GROUP"
echo "=========================================="
echo ""

# Fetch logs
if [ "$FOLLOW" = true ]; then
  echo "Following logs (press Ctrl+C to stop)..."
  echo ""
  aws logs tail "$LOG_GROUP" \
    --region "$REGION" \
    --follow \
    --format short
else
  aws logs tail "$LOG_GROUP" \
    --region "$REGION" \
    --since 30m \
    --format short | tail -n "$TAIL_LINES"
fi

