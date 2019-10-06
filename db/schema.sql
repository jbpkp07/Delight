DROP DATABASE IF EXISTS delightdb;

CREATE DATABASE delightdb;

USE delightdb;


CREATE TABLE lkp_category
(
id INT NOT NULL AUTO_INCREMENT,
category_name VARCHAR(255) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE lkp_interests
(
id INT NOT NULL AUTO_INCREMENT,
interest_name VARCHAR (255) NOT NULL,
category_id INT NOT NULL,
PRIMARY KEY(id),
constraint category_id foreign key (category_id) 
               references lkp_category(id)
);

CREATE TABLE user_info
(
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
fk_category_id INT NOT NULL,
PRIMARY KEY(id)
constraint fk_category_id foreign key (fk_category_id) 
               references lkp_category(id)
);

CREATE TABLE prompts 
(
    id INT NOT NULL AUTO_INCREMENT,
    prompt_string VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE chat 
(
    id INT NOT NULL AUTO_INCREMENT,
    message_string VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);