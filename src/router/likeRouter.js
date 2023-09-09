const {likeMenu, getMyLike, deleteLike} = require('../controller/likeController')
const {protect} = require('../middleware/jwt')

const app = require("express");
const router = app.Router()

router.post('/like/:id', protect, likeMenu)
router.get('/like', protect, getMyLike)
router.delete('/like/:id', protect, deleteLike)

module.exports = router