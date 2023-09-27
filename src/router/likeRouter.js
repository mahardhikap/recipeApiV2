const {likeMenu, getMyLike, countMenuLike} = require('../controller/likeController')
const {protect} = require('../middleware/jwt')

const app = require("express");
const router = app.Router()

router.post('/like/:id', protect, likeMenu)
router.get('/like', protect, getMyLike)
router.get('/like/:id', countMenuLike)
// router.delete('/like/:id', protect, deleteLike)

module.exports = router