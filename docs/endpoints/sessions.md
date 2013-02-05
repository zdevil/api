# Session endpoints

## Create sessions

#### POST /sessions

Create a new session.

#### Parameters
**additionalFields** (Optional) Additional fields to include in the response. Accepted fields:
- cookieTokenUrl: A URL which, when called, will set the session cookie in your browser for 
the session you've just created and render a transparent 1x1 pixel image. Contained within 
the URL is a one-time token which will expire after the first call, after which a GET on this 
URL will have no effect on your cookies. Example [here](/examples/session_cookie.md).

Request

    curl -v -H "Content-type:application/json" -H "Authorization:SSWS 00AOUoIwLOmGwc9ky05iCPcp-BpTQL7C3oxfZyqElt_QA" -H "Accept:application/json" -X POST https://your-subdomain.okta.com/api/v1/sessions?additionalFields=cookieTokenUrl -d '{"username": "userld2NCKABLEUKRMOT@asdf.com", "password": "secretPass"}'

Response

    {"id": "000rWcxHV-lQUOzBhLJLYTl0Q", "mfaActive": False, "userId": "00uld5QRRGEMJSSQJCUB", "cookieTokenUrl": "https://your-subdomain.okta.com/login/sessionCookie?token=00hbM-dbQNhKUtQY2lAl34Y0O9sHicFECHiTg3Ccv4" }

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
