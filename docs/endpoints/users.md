# User endpoints

## Create users

#### POST /users

Create a user. 

Request

    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X POST https://your-domain.okta.com/api/v1/users -d '{ "profile" : { "firstName":"Harry","lastName": "Potter","email":"hpotter@4privetdrive.com","login":"hpotter@hogwarts.edu","mobilePhone":"555-555-5555"} }'

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
