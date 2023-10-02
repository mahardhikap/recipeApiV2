const {postCommentMenu, getCommentMenu, getCommentMenuEdit, editCommentMenu, deleteComment} = require('../controller/commentController')
const {protect} = require('../middleware/jwt')

const app = require("express");
const router = app.Router()

router.post('/comment/:id', protect, postCommentMenu)
router.get('/comment/:id', getCommentMenu)
router.get('/comment/id/:id', protect, getCommentMenuEdit)
router.put('/comment/:id', protect, editCommentMenu)
router.delete('/comment/:id', protect, deleteComment)

module.exports = router