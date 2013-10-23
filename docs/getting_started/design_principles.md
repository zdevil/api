---
layout: sdks
title: Getting Started - Design Principles
category : Getting Started
tagline: "Getting Started - Design Principles"
tags : [getting stated, design principles]
icon: "glyphicon glyphicon-design"
position: leftsidebar
priority: 1
---

# Design Principles

- [URL Namespace](#url-namespace)
- [Media Types](#media-types)
- [HTTP Verbs](#http-verbs)
- [Errors](#errors)
- [Authentication](#authentication)
- [Pagination](#pagination)
	- [Link Header](#link-header)

## URL Namespace

All URLs listed in the documentation should be preceded with your organization's subdomain (tenant) https://&lt;yoursubdomain&gt;.okta.com/api/&lt;apiversion&gt;

The apiversion is v1 for API version 1.

*Note: All API access is over HTTPS*

## Media Types

The API currently only supports JSON as an exchange format.  Be sure to set both the Content-Type and Accept headers for every request as `application/json`.

All Date objects are returned in ISO 8601 format:

    YYYY-MM-DDTHH:MM:SSZ
    
## HTTP Verbs

Where possible, the Okta API strives to use appropriate HTTP verbs for each
action.

GET
: Used for retrieving resources.

POST
: Used for creating resources, or performing custom actions (such as
user lifecycle operations).  POST requests
with no `body` param, be sure to set the `Content-Length` header to zero.

PUT
: Used for replacing resources or collections. For PUT requests
with no `body` param, be sure to set the `Content-Length` header to zero.

DELETE
: Used for deleting resources.

*Note: Any PUT or POST request with no Content-Length header nor a body will return a 411 error.  To get around this, either include a Content-Length: 0 header*

## Errors

All requests on success will return a 200 status if there is content to return or a 204 status if there is no content to return.

All requests that result in an error will return the appropriate 4xx or 5xx error code with a custom JSON error object:

- errorCode: A code that is associated with this error type
- errorLink: A link to documentation with a more detailed explanation of the error (note: this has yet to be implemented and for the time being is the same value as the errorCode)
- errorSummary: A natural language explanation of the error
- errorId: An id that identifies this request.  These ids are mapped to the internal error on the server side in order to assist in troubleshooting.

```json
{
    "errorCode": "E0000001",
    "errorSummary": "Api validation failed",
    "errorLink": "E0000001",
    "errorId": "oaeHfmOAx1iRLa0H10DeMz5fQ",
    "errorCauses": [
        {
            "errorSummary": "login: An object with this field already exists in the current organization"
        }
    ]
}
```

See [Error Codes](error_codes.md) for a list of API error codes.

*Note: Only the `errorCode` property is supported for runtime error flow control.  The `errorSummary` property is only to intended for troubleshooting and may change over time*

## Authentication

The API currently only supports API keys with a custom HTTP authentication scheme `SSWS` for API authentication. All requests must have a valid API key specified in the HTTP `Authorization` header with the `SSWS` scheme.

```Authorization: SSWS 00QCjAl4MlV-WPXM…0HmjFx-vbGua```

See [Obtaining a token](getting_a_token.md) for instructions on how to get an API key for your organization.


## Pagination

Requests that return a list of resources may support paging.  Pagination is based on
cursor and not on page number. The cursor is opaque to the client and specified in either the `?before` or `?after` query parameter.  For some resources, you can also set a custom page size with the `?limit` parameter.

Note that for technical reasons not all endpoints respect pagination or the `?limit` parameter,
see the [Events](../endpoints/events.md) API for example.


`before`
: This is the cursor that points to the start of the page of data that has been returned.

`after`
: This is the cursor that points to the end of the page of data that has been returned.

`limit`
: This is the number of individual objects that are returned in each page.

### Link Header

Pagination links are included in the [Link
header](http://tools.ietf.org/html/rfc5988). It is **important** to
follow these Link header values instead of constructing your own URLs.

    Link: 
    <https://yoursubdomain.okta.com/api/v1/users?after=00ubfjQEMYBLRUWIEDKK; rel="next",
      <https://yoursubdomain.okta.com/api/v1/users?after=00ub4tTFYKXCCZJSGFKM>; rel="self"

The possible `rel` values are:

`self`
: Specifies the URL of the current page of results

`next`
: Specifies the URL of the immediate next page of results.

`prev`
: Specifies the URL of the immediate previous page of results.

When you first make an API call and get a cursor-paged list of objects, the end of the list will be the point at which you do not receive another `next` link value with the response.