---
layout: sdks
title: Events
category : Endpoints
tagline: "Endpoints - Events"
tags : [endpoints, events]
icon: "glyphicon glyphicon-events"
position: leftsidebar
priority: 3
---

# Events
### Overview

The Event API provides read access to your organization's system log. The API is intended to export event data as a batch job from your organization to another system for reporting or analysis.

- [Event Model](#event-model)
	- [Attributes](#attributes)
	- [Action Object](#action-object)
		- [Categories](#action-categories)
		- [Object Types](#action-objecttypes)
	- [Actor Object](#actor-object)
	- [Target Object](#target-object)
	- [Actor/Target Object Types](#actortarget-objecttypes)
- [List Events](#list-events)
	

### Event Model

Every organization has a system log that maintains a history of actions performed by users.  The Event model describes a single action that was performed by a set of actors for a set of targets.

### Example

```json
{
    "eventId": "tevIyAytNfpQo-rIZKhUDDRrg1365719153000",
    "published": "2013-04-11T22:25:53.000Z",
    "action": {
        "message": "User performed single sign on to app",
        "categories": [
            "Application Access"
        ],
        "objectType": "app.auth.sso"
    },
    "actors": [
        {
            "id": "00u3gjksoiRGRAZHLSYV",
            "displayName": "Samus Aran",
            "login": "samus.aran@example.com",
            "objectType": "User"
        }
    ],
    "targets": [
        {
            "id": "00u3gjksoiRGRAZHLSYV",
            "displayName": "Samus Aran",
            "login": "samus.aran@example.com",
            "objectType": "User"
        },
        {
            "id": "0oa3gjksodLJFLTUWWHC",
            "displayName": "Okta Administration",
            "objectType": "AppInstance"
        }
    ]
}
```

### Attributes
The Event model is a ***read-only*** object and has a fixed set of attributes:

Attribute | Description | DataType | Nullable
--- | --- | ---	| ---
eventId | Unique key for event | String | FALSE
published | Timestamp when event was published | Date | FALSE
action | Identifies the action that the event describes | [Action Object](#action-object) | FALSE
actors | Describes zero or more entities that performed the action | Array of [Actor Object](#actor-object) | TRUE
targets | Describes zero or more entities that the action was performed against | Array of [Target Object](#target-object) | TRUE

*Note: The actor and/or target of an event is dependant on the action performed. Not all events have an actor or target.*

### Action Object

Describes an activity that published an event

Attribute | Description | DataType | Nullable
--- | --- | ---	| ---
message | Description of an action | String | FALSE
categories | [Categories](#action-categories) for an action | Array of String | FALSE
objectType | Identifies the [unique type](#action-objecttypes) of an action | String | FALSE

*Note: Actions that do not define any categories will have an zero element array value.*

``` json
{
    "message": "User performed single sign on to app",
    "categories": [
        "Application Access"
    ],
    "objectType": "app.auth.sso"
}
```

#### Action Categories
Categories for an action:

* Application Assignment
* Application Access
* Active Directory Agent
* User Creation
* User Activation
* User Deactivation
* User Locked Out
* Sign-in Failure
* Sign-in Success
* Suspicious Activity
* Application Imports (Summary)
* Application Imports (Detailed)
* SMS Messages

*Note: Additional categories may be added in the future without versioning*

#### Action ObjectTypes

Action `objectType` identifies the unique action performed.


##### Application Authentication

ObjectType | Description 
--- | ---
app.auth.sso | Event occurred during single sign on
app.auth.delegated.outbound | Event occurred during outbound delegated authentication

##### Application User Management 

ObjectType | Description 
--- | ---
app.user_management.push_password_update | Update user's password in application
app.user_management.push_profile_success | Successfully created or updated user's profile in application
app.user_management.push_profile_failure | Failed to create or update user's profile in application
app.user_management.push_new_user | Create new user in application
app.user_management.push_pending_user`| Queue update of user for application
app.user_management.provision_user | Created or updated user from application
app.user_management.provision_user_failed | Failed to create or update user from application
app.user_management.importing_profile | Create or update user's profile from application
app.user_management.update_from_master_failed | Failed to master user's profile from application
app.user_management.verified_user_with_thirdparty | Verified user against application
app.user_management.updating_api_credentials_for_password_change | Updating API credentials due to  API admin user password change
app.user_management.activate_user | Activate user in application
app.user_management.deactivate_user | Deactivate user in application
app.user_management.reactivate_user | Reactivate user in application
app.user_management.provision_user.user_inactive | Attempt to provision a user to an inactive account, and cannot reactivate
app.user_management.deactivate_user.api_account | Deactivate API user in application
app.user_management.deprovision_task_complete | Deprovisioning task has been marked complete (automatically or manually)

##### Application Group Management

ObjectType | Description 
--- | ---
app.user_management.user_group_import.upsert_success | Successfully created or updated group from application
app.user_management.user_group_import.delete_success | Successfully removed imported group that was deleted from application
app.user_management.app_group_member_import.insert_success | Update group memmbership  an AppGroupUserMember from an import succeeded
app.user_management.app_group_member_import.delete_success | Deleting an AppGroupUserMember from an import succeeded
app.user_management.app_group_group_member_import.insert_success |  Upserting an ResolvedAppGroupMember from an import succeeded
app.user_management.app_group_group_member_import.delete_success | Deleting an ResolvedAppGroupMember from an import succeeded
app.user_management.grouppush.mapping.created.from.rule |  A new mapping has been created from a rule
app.user_management.grouppush.mapping.created.from.rule.error.duplicate | A new mapping from a rule was attempted to be created, but it turned out to be a dupe
app.user_management.grouppush.mapping.created.from.rule.warning.duplicate.name | A new mapping from a rule was not created due to a duplicate group name
app.user_management.grouppush.mapping.created.from.rule.warning.duplicate.name.tobecreated | A new mapping from a rule was not created due to another mapping will be created that has the same user group name
app.user_management.grouppush.mapping.created.from.rule.warning.upsertGroup.duplicate.name | Create or update of source group triggered mapping rule re-evaluation preventing a new application group mapping due to a duplicate group name
app.user_management.grouppush.mapping.created.from.rule.error.validation | Failed to create new application group mapping due to a validation error
app.user_management.grouppush.mapping.created.from.rule.errors | Failed to create new application group mapping due to an error
app.user_management.grouppush.mapping.deactivated.source.group.renamed | Successfully deactivate target application group when source group was renamed
app.user_management.grouppush.mapping.deactivated.source.group.renamed.failed | Failed to deactivate target application group when source group was renamed
app.user_management.grouppush.mapping.app.group.renamed | Successfully renamed target application group when source group was renamed
app.user_management.grouppush.mapping.app.group.renamed.failed | Failed to rename target application group when source group was renamed
app.user_management.grouppush.mapping.and.groups.deleted.rule.deleted | An existing mapping and its target groups have been deleted because a mapping rule was deleted

##### Delegated Authentication

ObjectType | Description 
--- | ---
app.inbound_del_auth.failure.not_supported" | application doesn't support delauth
app.inbound_del_auth.failure.instance_not_found | Couldn't find delauth app instance
app.inbound_del_auth.failure.invalid_request.could_not_parse_credentials | Couldn't parse credentials in del auth request
app.inbound_del_auth.failure.account_not_found | Inbound delauth account not found
app.inbound_del_auth.failure.invalid_login_credentials | Inbound delauth, invalid login credentials
app.inbound_del_auth.login_success | Successful delauth login
   
##### Rich Client Authentication   

ObjectType | Description 
--- | ---
app.rich_client.instance_not_found | 
app.rich_client.account_not_found |
app.rich_client.multiple_accounts_found |
app.rich_client.login_failure |
app.rich_client.login_success |

##### Admin Appplication  

ObjectType | Description 
--- | ---
app.admin.sso.no_response |
app.admin.sso.bad_response |
app.admin.sso.orgapp.notfound |

##### Applications

ObjectType | Description 
--- | ---
app.generic.provision.assign_user_to_app | Assign external user to internal Okta user
app.generic.provision.deactivate_user_from_app | Deactivate external user to internal Okta user
app.generic.config.app_activated | Application has been activated
app.generic.config.app_deactivated | Application has been deactivated
app.generic.import.provisioning_data | Imported data used for provisioning
app.generic.import.import_user | Started user import
app.generic.config.app_updated | Application config has been updated
app.generic.import.new_user | Application has imported a new user
app.generic.import.user_update | Application has updated an exsiting user
app.generic.config.app_username_update | User credentials for an application have been updated
app.generic.config.app_password_update | User credentials for an application have been updated
app.generic.import.user_delete | Application has deleted user
app.generic.import.started | 
app.generic.import.complete |
app.generic.import.user_match.complete |
app.generic.import.details.add_custom_object |
app.generic.import.details.update_custom_object |
app.generic.import.details.delete_custom_object |
app.generic.import.details.add_user |
app.generic.import.details.update_user |
app.generic.import.details.delete_user |
app.generic.import.details.add_group |
app.generic.import.details.update_group |
app.generic.import.details.delete_group |
app.generic.import.summary.custom_object |
app.generic.import.summary.user |
app.generic.import.summary.group |
app.generic.import.summary.group_membership |

##### Credential Recovery

ObjectType | Description 
--- | ---
app.generic.reversibility.credentials.recover | 
app.generic.reversibility.personal.app.recovery |
app.generic.reversibility.individual.app.recovery |

##### Application Instance

ObjectType | Description 
--- | ---
app.app_instance.change |
app.app_instance.logo_update |
app.app_instance.logo_reset |
app.app_instance.outbound_delauth_enabled |
app.app_instance.outbound_delauth_disabled |
app.app_instance.config-error |

##### User Authentication

ObjectType | Description 
--- | ---
core.user_auth.login_failed | 
core.user_auth.login_success |
core.user_auth.logout_success |
core.user_auth.account_locked |
core.user_auth.session_expired |
core.user_auth.mfa_bypass_attempted |

##### User MFA Authentication

ObjectType | Description 
--- | ---
core.user.sms.message_sent.factor |
core.user.sms.message_sent.verify |
core.user.sms.message_sent.forgotpw |


##### User RADIUS Authentication

ObjectType | Description 
--- | ---
core.user_auth.radius.login.succeeded |
core.user_auth.radius.login.failed |

##### User Status

ObjectType | Description 
--- | ---
core.user.config.password_update.success |
core.user.config.password_update.failure |
core.user.config.user_activated |
core.user.config.user_deactivated" |
core.user.config.user_status.password_reset |
core.user.config.user_creation.success |
core.user.config.user_creation.failure |

##### User Impersonation

ObjectType | Description 
--- | ---
core.user.impersonation.session.initiated |
core.user.impersonation.session.ended |
core.user.impersonation.grant.enabled |
core.user.impersonation.grant.extended |
core.user.impersonation.grant.revoked |

##### User Administrator Roles

ObjectType | Description 
--- | ---
core.user.admin_privilege.granted |
core.user.admin_privilege.revoked |


### Actor Object

Actor of an event

Attribute | Description | DataType | Nullable
--- | --- | ---	| ---
id | Unique key for actor| String | FALSE
displayName | Name of actor used for display purposes | String | FALSE
objectType | [User](#user-objecttype) | String | FALSE

*Note: The schema of an actor is dependant on the actor's `objectType`*

### Target Object

Target of an event

Attribute | Description | DataType | Nullable
--- | --- | ---	| ---
id | Unique key for target| String | FALSE
displayName | Name of target used for display purposes | String | FALSE
objectType | [User](#user-objecttype) or [AppInstance](#appinstance-objecttype) | String | FALSE

*Note: The schema of a target is dependant on the actor's `objectType`*

### Actor/Target ObjectTypes

#### User ObjectType

A denormalized reference to a [User](users.md#user-model).

Attribute | Description | DataType | Nullable
--- | --- | ---	| ---
id | Unique key for [user](users.md#user-model) | String | FALSE
objectType | User | String | FALSE
displayName | [User's](users.md#profile-object) first and last name | String | FALSE
login | Unique login for [user](users.md#user-model) | String | FALSE

```json
{
    "id": "00u3gjksoiRGRAZHLSYV",
    "displayName": "Jon Stewart",
    "login": "user@example.org",
    "objectType": "User"
}
```

#### AppInstance ObjectType

A denormalized reference to an application

Attribute | Description | DataType | Nullable
--- | --- | ---	| ---
id | Unique key for application | String | FALSE
objectType | AppInstance | String | FALSE
displayName | Label of application | String | FALSE

```json
{
    "id": "0oab5cZEHFHXHGRNRRNL",
    "displayName": "Zendesk",
    "objectType": "AppInstance"
}
```

## List Events

### GET /events

Fetch a list of events from your Okta organization system log

#### Request Parameters

Parameter | Description | Param Type | DataType | Required | Default
--- | --- | --- | --- | --- | ---
limit | Specifies the number of results to page | Query | Number | FALSE | 1000
startDate | Specifies the timestamp to list events after | Query | Date | FALSE |
after | Specifies the pagination cursor for the next page of events | Query | String | FALSE |

*Note: The cursor should treated as an opaque value and obtained through the next link relation. See [Pagination](../getting_started/design_principles.md#pagination)*

#### Response Parameters

Array of [Events](#event-model)

#### Example

##### Request

```sh
curl -v -H "Authorization:SSWS yourtoken" \
-H "Accept:application/json" \
-H "Content-type:application/json" \
-X GET https://your-domain.okta.com/api/v1/events?startDate=2013-07-15T16%3A00%3A00.000Z\&limit=3
```
##### Response

```
HTTP/1.1 200 OK
Link: <https://your-domain.okta.com/api/v1/events?startDate=2013-07-15T16%3A00%3A00.000Z&limit=3>; rel="self"
Link: <https://your-domain.okta.com/api/v1/events?after=tevZxTo4IyHR9yUHIFdU0-f0w1373905100000&limit=3>; rel="next"
```
```json
 [
    {
        "eventId": "tevYiodnDFOSrmv0TkiWsoxGg1373905156000",
        "published": "2013-07-15T16:19:16.000Z",
        "action": {
            "message": "User updated their Okta password",
            "categories": [],
            "objectType": "core.user.config.password_update.success"
        },
        "actors": [
            {
                "id": "00ub4tTFYKXCCZJSGFKM",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            }
        ],
        "targets": [
            {
                "id": "00ub4tTFYKXCCZJSGFKM",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            }
        ]
    },
    {
        "eventId": "tevfTQM_IWNQRaTIWa8GNG1OA1373905156000",
        "published": "2013-07-15T16:19:16.000Z",
        "action": {
            "message": "Sign-in successful",
            "categories": [
                "Sign-in Success"
            ],
            "objectType": "core.user_auth.login_success"
        },
        "actors": [
            {
                "id": "00ub4tTFYKXCCZJSGFKM",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            }
        ],
        "targets": [
            {
                "id": "00ub4tTFYKXCCZJSGFKM",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            }
        ]
    },
    {
        "eventId": "tevm1GHyjBeTqS1PXtzPhvpjA1373912507000",
        "published": "2013-07-15T18:21:47.000Z",
        "action": {
            "message": "Session has expired",
            "categories": [],
            "objectType": "core.user_auth.session_expired"
        },
        "actors": [
            {
                "id": "00ub4tTFYKXCCZJSGFKM",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            }
        ],
        "targets": [
            {
                "id": "00ub4tTFYKXCCZJSGFKM",
                "displayName": "Samus Aran",
                "login": "samus.aran@example.com",
                "objectType": "User"
            }
        ]
    }
]
```
