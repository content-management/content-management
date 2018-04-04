UPDATE posts
SET title = $2, content = $3
WHERE post_id = $1;