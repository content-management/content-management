SELECT p.*, b.blog_name
FROM posts p
    JOIN blogs b ON p.blog_id = b.blog_id
where p.blog_id = $1
ORDER BY post_id DESC;