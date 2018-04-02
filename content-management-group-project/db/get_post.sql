SELECT p.*, b.blog_name
FROM posts p
    JOIN blogs b ON p.blog_id = b.blog_id
Where post_id = $1;