const {bookmarkMenu, getMyBookmark} = require('../controller/bookmarkedController')
const {protect} = require('../middleware/jwt')

const app = require("express");
const router = app.Router()

router.post('/bookmark/:id', protect, bookmarkMenu)
router.get('/bookmark', protect, getMyBookmark)

module.exports = router