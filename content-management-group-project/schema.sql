CREATE TABLE users
(
    id serial primary key,
    authid varchar(40),
    name varchar(40)
)

CREATE TABLE item (
item_id SERIAL ,
title varChar(30),
description varChar(120),
images text,
caption varChar(120),
bin_name varChar(60),
FOREIGN KEY (item_id) REFERENCES bin (bin_id)
);


CREATE TABLE bin (
user_id SERIAL ,
bin_id SERIAL primary key,
bin_name varChar(60),
FOREIGN KEY (user_id) REFERENCES users (id)
);