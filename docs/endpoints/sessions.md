# Session endpoints

## Create sessions

#### POST /sessions

Create a new session.

Request

    curl -v -H "Content-type:application/json" -H "Authorization:SSWS 00AOUoIwLOmGwc9ky05iCPcp-BpTQL7C3oxfZyqElt_QA" -H "Accept:application/json" -X POST https://your-subdomain.okta.com/api/v1/sessions/ -d '{"username": "userld2NCKABLEUKRMOT@asdf.com", "password": "secretPass"}'

Response

    {"id": "000rWcxHV-lQUOzBhLJLYTl0Q", "mfaActive": False, "userId": "00uld5QRRGEMJSSQJCUB"}

## Validate sessions

#### GET /sessions/:id

Validate the session.

Request

    curl -v -H "Content-type:application/json" -H "Authorization:SSWS 00AOUoIwLOmGwc9ky05iCPcp-BpTQL7C3oxfZyqElt_QA" -H "Accept:application/json" -X GET https://your-subdomain.okta.com/api/v1/sessions/000rWcxHV-lQUOzBhLJLYTl0Q

Response

    {"id": "000rWcxHV-lQUOzBhLJLYTl0Q", "mfaActive": False, "userId": "00uld5QRRGEMJSSQJCUB"}

## Extend sessions

#### PUT /sessions/:id

Extend the session.

Request

    curl -v -H "Content-type:application/json" -H "Authorization:SSWS 00AOUoIwLOmGwc9ky05iCPcp-BpTQL7C3oxfZyqElt_QA" -H "Accept:application/json" -X PUT https://your-subdomain.okta.com/api/v1/sessions/000rWcxHV-lQUOzBhLJLYTl0Q

Response

    {"id": "000rWcxHV-lQUOzBhLJLYTl0Q", "mfaActive": False, "userId": "00uld5QRRGEMJSSQJCUB"}

## Clear sessions

#### DELETE /sessions/:id

Clear the session.

Request

    curl -v -H "Content-type:application/json" -H "Authorization:SSWS 00AOUoIwLOmGwc9ky05iCPcp-BpTQL7C3oxfZyqElt_QA" -H "Accept:application/json" -X DELETE https://your-subdomain.okta.com/api/v1/sessions/000rWcxHV-lQUOzBhLJLYTl0Q
