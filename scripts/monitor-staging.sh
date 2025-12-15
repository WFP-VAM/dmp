#!/bin/bash

# Simple script to monitor CloudFormation deployment status
# Usage: ./scripts/monitor-staging.sh

set -e

STACK_NAME="${STACK_NAME:-stagingdmpNestStack}"
REGION="${REGION:-eu-west-2}"
CHECK_INTERVAL=20  # seconds

echo "🔍 Monitoring CloudFormation deployment"
echo "Stack: $STACK_NAME"
echo "Region: $REGION"
echo "Check interval: ${CHECK_INTERVAL}s"
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

check_status() {
  aws cloudformation describe-stacks \
    --region "$REGION" \
    --stack-name "$STACK_NAME" \
    --query 'Stacks[0].StackStatus' \
    --output text 2>/dev/null || echo "NOT_FOUND"
}

get_latest_events() {
  aws cloudformation describe-stack-events \
    --region "$REGION" \
    --stack-name "$STACK_NAME" \
    --max-items 5 \
    --query 'StackEvents[].{Time:Timestamp,Resource:LogicalResourceId,Status:ResourceStatus,Reason:ResourceStatusReason}' \
    --output table 2>/dev/null || echo "Error fetching events"
}

get_failed_resources() {
  aws cloudformation describe-stack-events \
    --region "$REGION" \
    --stack-name "$STACK_NAME" \
    --max-items 50 \
    --query 'StackEvents[?ResourceStatus==`CREATE_FAILED` || ResourceStatus==`UPDATE_FAILED`].{Time:Timestamp,Resource:LogicalResourceId,Type:ResourceType,Status:ResourceStatus,Reason:ResourceStatusReason}' \
    --output json 2>/dev/null || echo "[]"
}

get_nested_stack_failures() {
  local nested_stack="$1"
  aws cloudformation describe-stack-events \
    --region "$REGION" \
    --stack-name "$nested_stack" \
    --max-items 30 \
    --query 'StackEvents[?ResourceStatus==`CREATE_FAILED` || ResourceStatus==`UPDATE_FAILED`].{Resource:LogicalResourceId,Type:ResourceType,Reason:ResourceStatusReason}' \
    --output json 2>/dev/null || echo "[]"
}

LAST_STATUS=""

while true; do
  STATUS=$(check_status)
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  
  # Show status change
  if [ "$STATUS" != "$LAST_STATUS" ]; then
    echo "[$TIMESTAMP] Status: $STATUS"
    LAST_STATUS="$STATUS"
    
    # Show latest events on status change
    if [[ "$STATUS" == *"FAILED"* ]] || [[ "$STATUS" == *"ROLLBACK"* ]]; then
      echo ""
      echo "❌ Failure detected! Latest events:"
      get_latest_events
      echo ""
      
      # Get detailed failure information
      echo "Failed resources:"
      FAILED=$(get_failed_resources)
      echo "$FAILED" | jq -r '.[] | "  - \(.Resource) (\(.Type)): \(.Reason)"' 2>/dev/null || echo "$FAILED"
      
      # Check nested stacks
      NESTED_STACKS=$(aws cloudformation list-stacks \
        --region "$REGION" \
        --query "StackSummaries[?contains(StackName, '${STACK_NAME}') && (StackStatus=='CREATE_FAILED' || StackStatus=='UPDATE_FAILED' || StackStatus=='UPDATE_ROLLBACK_COMPLETE')].StackName" \
        --output text 2>/dev/null)
      
      if [ -n "$NESTED_STACKS" ]; then
        echo ""
        echo "Nested stack failures:"
        for nested_stack in $NESTED_STACKS; do
          echo "  📦 $nested_stack"
          NESTED_FAILURES=$(get_nested_stack_failures "$nested_stack")
          echo "$NESTED_FAILURES" | jq -r '.[] | "    - \(.Resource) (\(.Type)): \(.Reason)"' 2>/dev/null || echo "$NESTED_FAILURES"
        done
      fi
      
      echo ""
      echo "=========================================="
    elif [[ "$STATUS" == *"COMPLETE"* ]] && [[ "$STATUS" != *"ROLLBACK"* ]]; then
      echo ""
      echo "✅✅✅ DEPLOYMENT SUCCESSFUL! ✅✅✅"
      exit 0
    fi
  else
    # Show status every 5 checks if no change
    if [ $(( $(date +%s) % 100 )) -lt $CHECK_INTERVAL ]; then
      echo "[$TIMESTAMP] Status: $STATUS (monitoring...)"
    fi
  fi
  
  sleep $CHECK_INTERVAL
done

