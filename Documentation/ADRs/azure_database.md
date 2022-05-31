# Azure data storing database 

Date: 2022-05-25

## Status

Accepted

## Context

* Wordle++ application is to be available online for any user who has access to the internet. 
A user should be abe able to signup or signin to play Worddle++. On signup, the user's data (email and password) is stored in a organised relational database which is easily accessible through querying.  

## Decision

* User data is to be hosted on the Microsoft SQL Azure cloud server to ensure that user data is persistently and remotely accessible.
* The user data is to be stored in a relational database (liked tables) that can be queried to aid application functionality.

## Consequences

* Developers can now run database queries on the same database remotely and at anytime to develop and integrate their user-stories while remaining in sync.
* Referencing is to be employed using keys to reduce the number of columns per table and to avoid duplication of data.
* A standard database setup is to be implimented. 
* Internet connection will be required in order to access the database and this my pose a challenge. 
* There is a complexity added by the use of the database. That is, the local program runs faster than the querying of the relational DatabaseDatabase quering speed is slower than the speed of the local program execution. 
