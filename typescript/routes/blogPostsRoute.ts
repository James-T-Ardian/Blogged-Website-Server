import express, {Router} from 'express'

import * as blogPostsController from '../controller/blogPostsController'

const router:Router = express.Router()

// Routes (See: https://expressjs.com/en/guide/routing.html)
router.get('/:username', blogPostsController.getBlogPostsTitleTime)
router.post('/:username', blogPostsController.createBlogPost)
router.put('/:username/:postId', blogPostsController.updateBlogPost)
router.delete('/:username/:postId', blogPostsController.deleteBlogPost)
router.get('/:username/:postId', blogPostsController.getSpecificPost)


export {router as blogPostsRoute}