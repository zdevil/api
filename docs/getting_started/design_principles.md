# Design principles

#### Profiles

Profiles are associative arrays that appear on objects (users and groups).  Profiles have both required and optional properties.  For users, the required properties are: firstName, lastName, email, login and mobilePhone.  For groups, the required properties are: name and description.

#### Create semantics

When creating an object, the profile of the object with all required properties should be provided in the POST body.  The request will echo back the profile, as well as an id uniquely identifying the object.

#### Update semantics

When updating an object, the profile of the object with all required properties should be provided in the PUT body.  The request will echo back the result of the update.  The id field is not required in the request.  All optional profile attributes not provided will be deleted.

#### Delete semantics

Deleting an object with the DELETE method will return a no response status code if successful.

#### URL space

All URLs listed in the documentation should be preceded with https://<yoursubdomain>.okta.com/api/<apiversion>

The apiversion is v1 for API version 1.

#### Response codes

All requests on success will return a 200 if there is content to return or a 204 if there is no content to return.

All requests on error will return the appropriate 4xx or 5xx error code.

#### Errors

All requests on error will return four fields:

- errorCode: A code that is associated with this error type
- errorLink: A link to documentation with a more detailed explanation of the error (note: this has yet to be implemented and for the time being is the same value as the errorCode)
- errorSummary: A natural language explanation of the error
- errorId: An id that identifies this request.  These ids are mapped to the internal error on the server side in order to assist in troubleshooting. 

#### Media types

The API currently only supports JSON as an exchange format.

#### 411 bug

There is a known problem with the API where any PUT or POST request with no Content-Length header nor a body will return a 411 error.  To get around this, either include a Content-Length: 0 header or some dummy data in the request body.

