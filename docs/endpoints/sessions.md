---
layout: sdks
title: Sessions
category : Endpoints
tagline: "Endpoints - Sessions"
tags : [endpoints, sessions]
icon: "glyphicon glyphicon-sessions"
position: leftsidebar
priority: 2
---
# Sessions
## Overview

Okta uses a cookie-based authentication mechanism to maintain a user's authentication session across web requests.  The Session API provides operations to create and manage authentication sessions with your Okta organization.

*Note:  The Session API currently does not support multi-factor authentication (MFA).  Sessions created for users with an assigned MFA policy will have a significantly constrained session and will not be able to access their applications.*

- [Session Operations](#session-operations)
  - [Create Session](#create-session)
    - [Create Session with One-Time Token](#create-session-with-one-time-token)
    - [Create Session with Embed Image URL](#create-session-with-embed-image-url)
  - [Validate Session](#validate-session)
  - [Extend Session](#extend-session)
  - [Close Session](#close-session)

### Session Cookie

Okta utilizes a non-persistent HTTP session cookie to provide access to your Okta organization and applications across web requests for an interactive user-agents such as a browser.  Session cookies have an  expiration configurable by an administrator for the organization and are valid until the cookie expires or the user closes the session (logout) or browser application.

### One-Time Token

Okta provides a mechanism to validate a user's credentials via the Session API and obtain a one-time token that can be later exchanged for a session cookie using flows detailed [here](/docs/examples/session_cookie.md) for specific deployment scenarios. 

A one-time token may only be used **once** to establish a session for a user.  If the session expires or the user logs out of Okta after using the token, they will not be able to reuse the same one-time token to get a new session cookie.

*Note: One-time tokens are secrets and should be protected at rest as well as during transit. A one-time token for a user is equivalent to having the user's actual credentials*

## Session Operations

### Create Session

##### POST /sessions

Creates a new session for a user.

##### Request Parameters

Parameter | Description | Param Type | DataType | Required | Default
--- | --- | --- | --- | --- | ---
additionalFields | Additional fields to include in the response | Query | comma separated list of String values | FALSE |

###### Field Values

Field | Description
--- | ---
cookieToken | One-time token which can be used to obtain a session cookie for your organization by visiting either an application's embed link or a session redirect URL.<br><br>See [retrieving a session cookie by visiting a session redirect link](/docs/examples/session_cookie.md#retrieving-a-session-cookie-by-visiting-a-session-redirect-link) or [retrieving a session cookie by visiting an application embed link](/docs/examples/session_cookie.md#retrieving-a-session-cookie-by-visiting-an-application-embed-link) for more info.
cookieTokenUrl | URL for a a transparent 1x1 pixel image which contains a one-time token which when visited  sets the session cookie in your browser for your organization.<br><br>See [retrieving a session cookie by visiting a session redirect link](/docs/examples/session_cookie.md#retrieving-a-session-cookie-with-a-hidden-image) for more info.


#### Create Session with One-Time Token 

Validates a user's credentials and returns a one-time token that can be used to set a session cookie in the user's browser.

##### Request

```sh
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-subdomain.okta.com/api/v1/sessions?additionalFields=cookieToken" \
-d \
'{
  "username": "art.vandelay@example.com",
  "password": "correct horse battery staple" 
}'
```

##### Response

```json
{
  "id": "000rWcxHV-lQUOzBhLJLYTl0Q", 
  "userId": "00uld5QRRGEMJSSQJCUB",
  "mfaActive": false,
  "cookieToken": "00hbM-dbQNhKUtQY2lAl34Y0O9sHicFECHiTg3Ccv4"
}
```

Invalid credentials will return a `401 Unauthorized` status code.

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "errorCode": "E0000004",
    "errorSummary": "Authentication failed",
    "errorLink": "E0000004",
    "errorId": "oaeVCVElsluRpii8PP4GeLYxA",
    "errorCauses": []
}
```

#### Create Session with Embed Image URL

Validates a user's credentials and returns a URL with a one-time token for 1x1 transparent image that can be used to set a session cookie in the user's browser

##### Request

```sh
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X POST "https://your-subdomain.okta.com/api/v1/sessions?additionalFields=cookieTokenUrl" \
-d \
'{
  "username": "art.vandelay@example.com",
  "password": "correct horse battery staple" 
}'
```

##### Response

```json
{
  "id": "000rWcxHV-lQUOzBhLJLYTl0Q", 
  "userId": "00uld5QRRGEMJSSQJCUB",
  "mfaActive": false,
  "cookieTokenUrl": "https://your-subdomain.okta.com/login/sessionCookie?token=00hbM-dbQNhKUtQY2lAl34Y0O9sHicFECHiTg3Ccv4"
}
```

Invalid credentials will return a `401 Unauthorized` status code.

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "errorCode": "E0000004",
    "errorSummary": "Authentication failed",
    "errorLink": "E0000004",
    "errorId": "oaeVCVElsluRpii8PP4GeLYxA",
    "errorCauses": []
}
```

### Validate Session

##### GET /sessions/:id

Validate a user's session.

##### Request Parameters

Parameter | Description | Param Type | DataType | Required | Default
--- | --- | --- | --- | --- | ---
id | id of user's session | URL | String | TRUE |

##### Request

```sh
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X GET "https://your-subdomain.okta.com/api/v1/sessions/000rWcxHV-lQUOzBhLJLYTl0Q"
```

##### Response

```json
{
  "id": "000rWcxHV-lQUOzBhLJLYTl0Q", 
  "userId": "00uld5QRRGEMJSSQJCUB",
  "mfaActive": false
}
```

Invalid sessions will return a `403 Forbidden` status code.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000005",
    "errorSummary": "Invalid session",
    "errorLink": "E0000005",
    "errorId": "oaeweHTU2w9QlC7ySKNEASqhA",
    "errorCauses": []
} 
```

### Extend Session

##### PUT /sessions/:id

Extends the lifetime of a session for a user.

#### Request Parameters

Parameter | Description | Param Type | DataType | Required | Default
--- | --- | --- | --- | --- | ---
id | id of user's session | URL | String | TRUE |


##### Request

```sh
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X PUT "https://your-subdomain.okta.com/api/v1/sessions/000rWcxHV-lQUOzBhLJLYTl0Q"
```

##### Response


```json
{
  "id": "000rWcxHV-lQUOzBhLJLYTl0Q", 
  "userId": "00uld5QRRGEMJSSQJCUB",
  "mfaActive": false
}
```

Invalid sessions will return a `403 Forbidden` status code.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000005",
    "errorSummary": "Invalid session",
    "errorLink": "E0000005",
    "errorId": "oaeweHTU2w9QlC7ySKNEASqhA",
    "errorCauses": []
} 
```

### Close Session

##### DELETE /sessions/:id

Closes a session for a user (logout).

##### Request Parameters

Parameter | Description | Param Type | DataType | Required | Default
--- | --- | --- | --- | --- | ---
id | id of user's session | URL | String | TRUE |

##### Request

```sh
curl -v -H "Authorization: SSWS yourtoken" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-X DELETE "https://your-subdomain.okta.com/api/v1/sessions/000rWcxHV-lQUOzBhLJLYTl0Q"
```

##### Response

```http
HTTP/1.1 204 No Content
```

Invalid sessions will return a `403 Forbidden` status code.

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    "errorCode": "E0000005",
    "errorSummary": "Invalid session",
    "errorLink": "E0000005",
    "errorId": "oaeweHTU2w9QlC7ySKNEASqhA",
    "errorCauses": []
} 
```