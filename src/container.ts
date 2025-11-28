import { PostRepository } from "./infrastructure/repositories/post.repository";
import { PostService } from "./application/services/post.service";
import { PostController } from "./presentation/controllers/post.controller";
import { CategoryRepository } from "./infrastructure/repositories/category.repository";
import { CategoryService } from "./application/services/category.service";
import { CategoryController } from "./presentation/controllers/category.controller";
import { TagRepository } from "./infrastructure/repositories/tag.repository";
import { TagService } from "./application/services/tag.service";
import { TagController } from "./presentation/controllers/tag.controller";
import { CommentRepository } from "./infrastructure/repositories/comment.repository";
import { CommentService } from "./application/services/comment.service";
import { CommentController } from "./presentation/controllers/comment.controller";
import { ReactionRepository } from "./infrastructure/repositories/reaction.repository";
import { ReactionService } from "./application/services/reaction.service";
import { ReactionController } from "./presentation/controllers/reaction.controller";

// Repositories
const postRepository = new PostRepository();
const categoryRepository = new CategoryRepository();
const tagRepository = new TagRepository();
const commentRepository = new CommentRepository();
const reactionRepository = new ReactionRepository();

// Services
const postService = new PostService(postRepository);
const categoryService = new CategoryService(categoryRepository);
const tagService = new TagService(tagRepository);
const commentService = new CommentService(commentRepository);
const reactionService = new ReactionService(reactionRepository);

// Controllers
const postController = new PostController(postService);
const categoryController = new CategoryController(categoryService);
const tagController = new TagController(tagService);
const commentController = new CommentController(commentService);
const reactionController = new ReactionController(reactionService);

export {
  postController,
  categoryController,
  tagController,
  commentController,
  reactionController,
};
