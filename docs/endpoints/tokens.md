# Token endpoints

## Create tokens

#### POST /tokens

Create a token.  This endpoint does not require any token-based authentication to access.

Request

    curl -v -H "Content-type:application/json" -H "Accept:application/json" -X POST https://your-subdomain.okta.com/api/v1/tokens/ -d '{"username": "user8u3VOJBREVQHBTAS@asdf.com", "deviceName": "Sample Device Name", "password": "SecretPass", "clientAppId": "capalkhfadflkjh"}'

Response

    {'token': '00F-MBcxD2SC8tzXDCDZm2a04qtXLcFqtlrrPu6eVtxRs'}

## Revoke tokens

#### DELETE /tokens

Revoke the token that is being used to authenticate to the endpoint.

Request

    curl -v -H "Content-type:application/json" -H "Authorization:SSWS 00F-MBcxD2SC8tzXDCDZm2a04qtXLcFqtlrrPu6eVtxRs" -H "Accept:application/json" -X DELETE https://your-subdomain.okta.com/api/v1/tokens/


