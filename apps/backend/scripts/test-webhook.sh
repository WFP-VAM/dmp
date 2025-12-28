#!/bin/bash

# Test script to send a webhook request using curl
# 
# Usage (local):
#   WEBHOOK_TOKEN=your_token SERVER_PORT=8000 ./test-webhook.sh [FLOOD|DROUGHT|INCIDENT]
#
# Usage (live API):
#   WEBHOOK_TOKEN=your_token API_URL=https://staging-api.dmp.ovio.org ./test-webhook.sh [FLOOD|DROUGHT|INCIDENT]

set -e

DISASTER_TYPE=${1:-INCIDENT}
WEBHOOK_TOKEN=${WEBHOOK_TOKEN:-}
API_URL=${API_URL:-}
SERVER_PORT=${SERVER_PORT:-8000}
SERVER_HOST=${SERVER_HOST:-localhost}

if [ -z "$WEBHOOK_TOKEN" ]; then
  echo "Error: WEBHOOK_TOKEN environment variable is required"
  echo "Usage: WEBHOOK_TOKEN=your_token [API_URL=https://api.dmp.ovio.org] ./test-webhook.sh [FLOOD|DROUGHT|INCIDENT]"
  exit 1
fi

# Determine the base URL
if [ -n "$API_URL" ]; then
  BASE_URL="$API_URL"
else
  BASE_URL="http://${SERVER_HOST}:${SERVER_PORT}"
fi

# Create minimal test payload
NOW=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
UUID="test-$(date +%s)"

if [ "$DISASTER_TYPE" = "INCIDENT" ]; then
  PAYLOAD=$(cat <<EOF
{
  "_id": 999999,
  "formhub/uuid": "$UUID",
  "start": "$NOW",
  "end": "$NOW",
  "G1/q_Enum": "TEST_ENUMERATOR",
  "G1/Date_report": "$NOW",
  "G2/Date_Dis": "$NOW",
  "G2/DisTyp": "1",
  "G2/Province": "01",
  "G2/District": "0101",
  "G2/Commune": "010101",
  "G2/Village": "Test Village",
  "group_tc1fy38/group_pf1pd97/NumFamAff": "5",
  "group_tc1fy38/group_pf1pd97/NumPeoAff": "20",
  "__version__": "v1",
  "meta/instanceID": "$UUID",
  "_xform_id_string": "test-form-id",
  "_uuid": "$UUID",
  "_attachments": [],
  "_status": "submitted_via_web",
  "_geolocation": [null, null],
  "_submission_time": "$NOW",
  "_tags": [],
  "_notes": [],
  "_submitted_by": null,
  "_validation_status": {
    "uid": "validation_status_on_hold",
    "timestamp": $(date +%s),
    "by_whom": "test",
    "color": "#ff9800",
    "label": "On Hold"
  }
}
EOF
)
elif [ "$DISASTER_TYPE" = "FLOOD" ]; then
  PAYLOAD=$(cat <<EOF
{
  "_id": 999999,
  "formhub/uuid": "$UUID",
  "start": "$NOW",
  "end": "$NOW",
  "g1/q_Enum": "TEST_ENUMERATOR",
  "g1/Date_report": "$NOW",
  "g2/Province": "01",
  "g2/District": "0101",
  "g2/Commune": "010101",
  "g2/village": "Test Village",
  "g2/Date_Dis": "$NOW",
  "g2/DisTyp": "1",
  "g3/g3_1/g3_2/NumFamAff": "5",
  "g3/g3_1/g3_2/NumPeoAff": "20",
  "__version__": "v1",
  "meta/instanceID": "$UUID",
  "_xform_id_string": "test-form-id",
  "_uuid": "$UUID",
  "_attachments": [],
  "_status": "submitted_via_web",
  "_geolocation": [null, null],
  "_submission_time": "$NOW",
  "_tags": [],
  "_notes": [],
  "_submitted_by": null,
  "_validation_status": {
    "uid": "validation_status_on_hold",
    "timestamp": $(date +%s),
    "by_whom": "test",
    "color": "#ff9800",
    "label": "On Hold"
  }
}
EOF
)
elif [ "$DISASTER_TYPE" = "DROUGHT" ]; then
  PAYLOAD=$(cat <<EOF
{
  "_id": 999999,
  "formhub/uuid": "$UUID",
  "start": "$NOW",
  "end": "$NOW",
  "group_ve4vz14/q_Enum": "TEST_ENUMERATOR",
  "group_ve4vz14/Date_report": "$NOW",
  "group_yu9nq00/Province": "01",
  "group_yu9nq00/District": "0101",
  "group_yu9nq00/Commune": "010101",
  "group_yu9nq00/Village": "Test Village",
  "group_yu9nq00/Date_Dis": "$NOW",
  "group_yu9nq00/DisTyp": "1",
  "group_dg01m69/group_kx2wb92/NumFamAff": "5",
  "group_dg01m69/group_kx2wb92/NumPeoAff": "20",
  "__version__": "v1",
  "meta/instanceID": "$UUID",
  "_xform_id_string": "test-form-id",
  "_uuid": "$UUID",
  "_attachments": [],
  "_status": "submitted_via_web",
  "_geolocation": [null, null],
  "_submission_time": "$NOW",
  "_tags": [],
  "_notes": [],
  "_submitted_by": null,
  "_validation_status": {
    "uid": "validation_status_on_hold",
    "timestamp": $(date +%s),
    "by_whom": "test",
    "color": "#ff9800",
    "label": "On Hold"
  }
}
EOF
)
else
  echo "Error: Unknown disaster type: $DISASTER_TYPE"
  echo "Use FLOOD, DROUGHT, or INCIDENT"
  exit 1
fi

WEBHOOK_URL="${BASE_URL}/webhook/${DISASTER_TYPE}"
echo "Sending test webhook request to ${WEBHOOK_URL}"
echo "Payload:"
echo "$PAYLOAD" | jq '.' 2>/dev/null || echo "$PAYLOAD"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${WEBHOOK_TOKEN}" \
  -d "$PAYLOAD" \
  "${WEBHOOK_URL}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo ""
echo "Response HTTP Code: $HTTP_CODE"
echo "Response Body: $BODY"

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo ""
  echo "✅ Success! Check your Telegram chats for the message."
else
  echo ""
  echo "❌ Request failed. Check the error above."
fi

