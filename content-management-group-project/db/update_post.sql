UPDATE posts
SET title = $2, content = $3, favorites = $4
WHERE post_id = $1;