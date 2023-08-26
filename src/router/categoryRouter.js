const {addCategory, getCategory, editCategory} = require('../controller/categoryController')

const app = require("express");
const router = app.Router()

router.post('/category', addCategory)
router.get('/category', getCategory)
router.put('/category/:id', editCategory)

module.exports = router