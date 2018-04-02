CREATE TABLE users
(
    id serial primary key,
    authid varchar(40),
    name varchar(40)
)

CREATE TABLE posts (
post_id SERIAL ,
title varChar(30),
content varChar(120),
images text,
caption varChar(120),
blog_name varChar(60),
FOREIGN KEY (post_id) REFERENCES blogs (blog_id)
);


CREATE TABLE blogs (
user_id SERIAL ,
blog_id SERIAL primary key,
blog_name varChar(60),
FOREIGN KEY (user_id) REFERENCES users (id)
);