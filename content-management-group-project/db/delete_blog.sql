DELETE FROM posts WHERE blog_id = $1;
DELETE FROM blogs WHERE blog_id = $1;