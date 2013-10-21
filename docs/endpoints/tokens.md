---
layout: sdks
title: Tokens
category : Endpoints
tagline: "Endpoints - Tokens"
tags : [endpoints, tokens]
icon: "glyphicon glyphicon-tokens"
position: leftsidebar
priority: 1
---

# Tokens

### Create tokens

##### POST /tokens

Create a token.  This endpoint does not require any token-based authentication to access.

Request

```sh
curl -v -H "Content-type:application/json" \
-H "Accept:application/json" \
-X POST https://your-subdomain.okta.com/api/v1/tokens/ \
-d \
'{
  "username": "user8u3VOJBREVQHBTAS@asdf.com",
  "password": "SecretPass", 
  "clientAppId": "capalkhfadflkjh", 
  "deviceName": "Sample Device Name"
}'
```

Response

```json
{
  "token": "00F-MBcxD2SC8tzXDCDZm2a04qtXLcFqtlrrPu6eVtxRs"
}
```
### Revoke tokens

#### DELETE /tokens

Revoke the token that is being used to authenticate to the endpoint.

Request

```sh
curl -v -H "Content-type:application/json" \
-H "Authorization:SSWS 00F-MBcxD2SC8tzXDCDZm2a04qtXLcFqtlrrPu6eVtxRs" \
-H "Accept:application/json" \
-X DELETE https://your-subdomain.okta.com/api/v1/tokens/
```
