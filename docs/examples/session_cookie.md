---
layout: sdks
title: Session Cookie
category : Examples
tagline: "Session Cookie"
tags : [Session, Cookie, examples]
icon: "glyphicon glyphicon-user"
priority: 3
---

# Retrieving a session cookie with a hidden image

The session creation endpoint allows you to create a session and optionally include a 
one-time token URL in the response which will allow you to get a cookie for that session
 in the browser. (See the [Sessions documentation](/docs/endpoints/sessions.md) for more 
 information on this endpoint.)

Request:
POST https://your-subdomain.okta.com/api/v1/sessions?additionalFields=cookieTokenUrl

```json
{
	"username" : "jsmith@mycompany.com",
 	"password" : "mypassword"
}
``` 
Response:

```json
{
    "id": "000kYk6cDF7R02z4PxV5mhL4g",
    "userId": "00u9apFCRAIKHVPZLGXT",
    "mfaActive": false,
    "cookieTokenUrl": "https://your-subdomain.okta.com/login/sessionCookie?token=009Db9G6Sc8o8VfE__SlGj4FPxaG63Wm89TpJnaDF6"
} 
```

This URL can then be embedded in an image tag:

```html
<img src="https://your-subdomain.okta.com/login/sessionCookie?token=009Db9G6Sc8o8VfE__SlGj4FPxaG63Wm89TpJnaDF6">
```

When the page containing the tag is loaded, the token in the request will be used to 
initiate the user's session, and a session cookie will be set in the browser. The image 
that renders is a 1x1 transparent image. After the page has loaded the user will have an 
active session with Okta and will be able to SSO into their applications. The token is a
one-time token, so successive page loads will have no impact on the user's session. If
the user logs out of Okta after using the token, they will not be able to reuse that same 
token to get a session cookie.