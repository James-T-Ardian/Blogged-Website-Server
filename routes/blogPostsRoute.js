const express = require('express')

const router = express.Router()

const controller = require('../controller/blogPostsController')

router.get('/:username', controller.getBlogPostsTitleTime)

router.post('/:username', controller.createBlogPost)

router.put('/:username/:postId', controller.updateBlogPost)

router.delete('/:username/:postId', controller.deleteBlogPost)

router.get('/:username/:postId', controller.getSpecificPost)


module.exports = router