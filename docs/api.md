# API Documentation - blogs-api

Base URL: `http://localhost:3001`

## Posts

### Create Post

`POST /posts`

Create a new blog post.

**Request Body:**

```json
{
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "authorId": "user-uuid",
  "categoryIds": ["category-uuid"],
  "tagIds": ["tag-uuid"],
  "slug": "my-first-post",
  "excerpt": "A short summary",
  "coverImage": "http://example.com/image.jpg",
  "status": "DRAFT",
  "visibility": "PUBLIC"
}
```

**Response (201):**

```json
{
  "id": "post-uuid",
  "title": "My First Post",
  ...
}
```

### Get All Posts

`GET /posts`

Retrieve a list of all posts.

**Response (200):**

```json
[
  {
    "id": "post-uuid",
    "title": "My First Post",
    ...
  }
]
```

### Get Post by ID

`GET /posts/:id`

Retrieve a single post by its ID.

**Response (200):**

```json
{
  "id": "post-uuid",
  "title": "My First Post",
  ...
}
```

### Get Post by Slug

`GET /posts/slug/:slug`

Retrieve a single post by its slug.

**Response (200):**

```json
{
  "id": "post-uuid",
  "title": "My First Post",
  ...
}
```

### Update Post

`PUT /posts/:id`

Update an existing post.

**Request Body:**

```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

### Delete Post

`DELETE /posts/:id`

Delete a post.

**Response (204):** No Content

---

## Categories

### Create Category

`POST /categories`

**Request Body:**

```json
{
  "name": "Technology",
  "slug": "technology",
  "description": "All things tech"
}
```

### Get All Categories

`GET /categories`

### Get Category by ID

`GET /categories/:id`

### Get Category by Slug

`GET /categories/slug/:slug`

### Update Category

`PUT /categories/:id`

### Delete Category

`DELETE /categories/:id`

---

## Tags

### Create Tag

`POST /tags`

**Request Body:**

```json
{
  "name": "React",
  "slug": "react"
}
```

### Get All Tags

`GET /tags`

### Get Tag by ID

`GET /tags/:id`

### Get Tag by Slug

`GET /tags/slug/:slug`

### Delete Tag

`DELETE /tags/:id`

---

## Comments

### Create Comment

`POST /comments`

**Request Body:**

```json
{
  "postId": "post-uuid",
  "authorId": "user-uuid",
  "content": "Great post!",
  "parentId": "optional-parent-comment-uuid"
}
```

### Get Comments by Post ID

`GET /comments/post/:postId`

### Update Comment

`PUT /comments/:id`

**Request Body:**

```json
{
  "content": "Updated comment content"
}
```

### Delete Comment

`DELETE /comments/:id`

---

## Reactions

### Add Like

`POST /reactions/likes`

**Request Body:**

```json
{
  "userId": "user-uuid",
  "postId": "post-uuid"
}
```

### Remove Like

`DELETE /reactions/likes/:userId/:postId`

### Add Bookmark

`POST /reactions/bookmarks`

**Request Body:**

```json
{
  "userId": "user-uuid",
  "postId": "post-uuid"
}
```

### Remove Bookmark

`DELETE /reactions/bookmarks/:userId/:postId`
