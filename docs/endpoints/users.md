# User endpoints

## Create users

#### POST /users

Create a user. 

##### Parameters
**activate** (Optional) Activates user if true. Defaults to true.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X POST https://your-domain.okta.com/api/v1/users?activate=false -d '{ "profile" : { "firstName":"Harry","lastName": "Potter","email":"hpotter@4privetdrive.com","login":"hpotter@hogwarts.edu","mobilePhone":"555-555-5555"} }'

Response

    { "id": "0uh4rryp0tt3r", "profile" : { "firstName": "Harry", "lastName": "Potter", "email": "hpotter@4privetdrive.com", "login": "hpotter@hogwarts.edu", "mobilePhone": "555-555-5555" } }

## List users

#### GET /users

Fetch a list of users.  Does not include users that have been deactivated.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X GET https://your-domain.okta.com/api/v1/users 

Response

    [ { "id": "0uh4rryp0tt3r", "profile" : { "firstName": "Harry", "lastName": "Potter", "email": "hpotter@4privetdrive.com", "login": "hpotter@hogwarts.edu", "mobilePhone": "555-555-5555" } } ] 

#### GET /users/:id

Fetch a specific user.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X GET https://your-domain.okta.com/api/v1/users/0uh4rryp0tt3r 

Response

    { "id": "0uh4rryp0tt3r", "profile": { "firstName": "Harry", "lastName": "Potter", "email": "hpotter@4privetdrive.com", "login": "hpotter@hogwarts.edu", "mobilePhone": "555-555-5555" } }

## Update users

#### PUT /users/:id

Update a user's details.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X PUT https://your-domain.okta.com/api/v1/users/0uh4rryp0tt3r -d '{"profile" : {"firstName":"Ron","lastName":"Weasley","email": "hpotter@4privetdrive.com","login": "hpotter@hogwarts.edu","mobilePhone":"555-555-5555"}}'

Response

    { "id": "0uh4rryp0tt3r", "profile" : { "firstName": "Ron", "lastName": "Weasley", "email": "hpotter@4privetdrive.com", "login": "hpotter@hogwarts.edu", "mobilePhone": "555-555-5555" } }

## Delete users

#### DELETE /users/:id

Deactivates a user.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X DELETE https://your-domain.okta.com/api/v1/users/0uh4rryp0tt3r 

## List app links

#### GET /users/:id/appLinks

Fetch the user's app links.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X GET https://your-domain.okta.com/api/v1/users/0uh4rryp0tt3r/appLinks 

Response

    [ { "label": "Employee Box", "link": "/home/boxnet/0oaabcdefg/123" }, { "label": "Company ABIResearch", "link": "/home/0oahijklmnop/4567" } ] 

## List groups

#### GET /users/:id/groups

Fetch the groups of which the user is a member.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X GET https://your-domain.okta.com/api/v1/users/0uh4rryp0tt3r/groups 

Response

    [ { "id": "0gabcd1234", "profile" : { "name": "Gryffindor", "description": "Courageous and Bold" } }, { "id": "0gefgh5678", "profile" : { "name": "Hufflepuff", "description": "Everyday I'm Huffling" } } ]

## Activate user

#### POST /users/:id/lifecycle/activate

Activate a user. Returns empty response by default. When *sendEmail* is false, returns an activation link for the user
to set up their account.

#### Parameters
**sendEmail** (Optional) Sends welcome email if true. Defaults to true.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X POST https://your-domain.okta.com/api/v1/users/0uh4rryp0tt3r/lifecycle/activate?sendEmail=false
    
Response
    
	[ { "activationUrl": "https://your-domain.okta.com/welcome/XE6wE17zmphl3KqAPFxO" } ]
	
## Reset password

#### POST /users/:id/lifecycle/reset_password

Resets the password for a user. The user will not be able to log in until they complete the reset. 
Returns empty response by default. When *sendEmail* is false, returns a link for the user to reset their password.

#### Parameters
**sendEmail** (Optional) Sends reset password email if true. Defaults to true.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X POST https://your-domain.okta.com/api/v1/users/0uh4rryp0tt3r/lifecycle/reset_password?sendEmail=false
    
Response
	
	[ { "resetPasswordUrl": "https://your-domain.okta.com/reset_password/XE6wE17zmphl3KqAPFxO" } ]
	
## Forgot password

#### POST /users/:id/lifecycle/forgot_password

Returns empty response by default. When *sendEmail* is false, returns a link for the user to reset their password. 
The request does not affect the status of the user.

#### Parameters
**sendEmail** (Optional) Sends forgot password email if true. Defaults to true.

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X POST https://your-domain.okta.com/api/v1/users/0uh4rryp0tt3r/lifecycle/forgot_password?sendEmail=false
    
Response
	
	[ { "resetPasswordUrl": "https://your-domain.okta.com/reset_password/XE6wE17zmphl3KqAPFxO" } ]
