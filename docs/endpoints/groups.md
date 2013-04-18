# Group endpoints

## Create groups

#### POST /groups

Create a group.

Request
```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X POST https://your-domain.okta.com/api/v1/groups \
-d \
'{
  "profile": {
    "name": "Slytherin",
    "description": "Cold and slimy" 
  }
}' 
```

Response
```json
{
  "id": "00gevhYMOEIQMDAPUQGQ", 
  "profile": {
    "name": "Slytherin",
    "description": "Cold and slimy" 
  }
}
```
## List groups

#### GET /groups

##### Parameters
**q** (Optional) Search by all or part of the group name. E.G. /groups?q=every

Fetch a list of groups.

Request
```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X GET https://your-domain.okta.com/api/v1/groups 
```

Response
```json
[
  {
    "id": "0g12345678", 
    "profile": {
      "name": "Everyone",
      "description": "Everyone group" 
    }
  }, 
  {
    "id": "0g12345679", 
    "profile": {
      "name": "Gryffindor",
      "description": "Courageous and Bold"
    }
  }
]
```
#### GET /groups/:id

Fetch a specific group.

Request
```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X GET https://your-domain.okta.com/api/v1/groups/0g12345679 
```

Response
```json
{
  "id": "0g12345679", 
  "profile": {
    "name": "Gryffindor",
    "description": "Courageous and Bold" 
  }
}
```
## Update groups

#### PUT /users/:id

Update a group.

Request
```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X PUT https://your-domain.okta.com/api/v1/groups/0g12345679 \
-d \
'{
  "profile": {
    "name": "Hufflepuff"
  }
}' 
```

Response
```json
{
  "id": "0g12345679", 
  "profile": {
    "name": "Hufflepuff",
    "description": "Cold and slimy" 
  }
}
```
## Delete groups

#### DELETE /groups/:id

Deactivate a group.

Request
```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X DELETE https://your-domain.okta.com/api/v1/groups/0g12345679 
```
## Group membership operations

#### GET groups/:id/users

Fetch users that are members of the group. 

Request
```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X GET https://your-domain.okta.com/api/v1/groups/0g12345679/users 
```

Response
```json
[
  {
    "profile": {
      "firstName": "Harry", 
      "lastName": "Potter",
      "email": "hpotter@4privetdrive.com",  
      "login": "hpotter@hogwarts.edu", 
      "mobilePhone": "555-555-5555"
    }
  }, 
  {
    "profile": {
      "firstName": "Hermione", 
      "lastName": "Granger", 
      "email": "hgranger@gryffindor.hogwarts.edu", 
      "login": "hgranger@hogwarts.edu", 
      "mobilePhone": "555-555-5555"
    }
  }
]
```
#### PUT /groups/:id/users/:userId

Add a user to the group.

Request
```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X PUT https://your-domain.okta.com/api/v1/groups/0g12345679/users/0uh4rryp0tter
```
#### DELETE /groups/:id/users/:userId

Remove a user from the group.

Request 
```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X DELETE https://your-domain.okta.com/api/v1/groups/0g12345679/users/0uh4rryp0tt3r
```