# Create a user

## POST /users

Create a user. 

Request
    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X POST https://your-domain.okta.com/api/v1/users -d '{ "profile" : { "firstName":"Harry","lastName": "Potter","email":"hpotter@4privetdrive.com","login":"hpotter@hogwarts.edu","mobilePhone":"555-555-5555"} }' 

Response
    { "id": "0uh4rryp0tt3r", "profile" : { "firstName": "Harry", "lastName": "Potter", "email": "hpotter@4privetdrive.com", "login": "hpotter@hogwarts.edu", "mobilePhone": "555-555-5555" } } 

# List users

Fetch a list of users.  Does not include users that have been deactivated.

Request
    curl -v -H "Authorization:SSWS yourtoken" -H "Accept:application/json" -H "Content-type:application/json" -X GET https://your-domain.okta.com/api/v1/users 

Response
    [ { "id": "0uh4rryp0tt3r", "profile" : { "firstName": "Harry", "lastName": "Potter", "email": "hpotter@4privetdrive.com", "login": "hpotter@hogwarts.edu", "mobilePhone": "555-555-5555" } } ] 
