---Create Tables

CREATE TABLE Users (
    id int identity NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
    PRIMARY KEY(username)
);

