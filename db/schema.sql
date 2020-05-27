drop database if exists passport_demo;
CREATE DATABASE passport_demo;

USE passport_demo;

CREATE TABLE histoy (
id INT AUTO_INCREMENT NOT NULL,
site_name VARCHAR(255) NOT NULL,
site_code VARCHAR(255) NOT NULL,
nps_url TEXT NOT NULL,
nws_url TEXT NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fk_emailid FOREIGN KEY (id) REFERENCES Users (email)
);
CREATE TABLE blog (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(255) NULL,
review TEXT NOT NULL,
score INT NOT NULL,
PRIMARY KEY (id),
CONSTRAINT fk_userid FOREIGN KEY (id) REFERENCES Users (email)
);