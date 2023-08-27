const {addMenu, getMenu, getMenuId, searchSortMenu, editMenu, searchSortMenuUser, deleteMenu} = require('../controller/menuController')
const {protect} = require('../middleware/jwt')
const upload = require('../middleware/multer')

const app = require("express");
const router = app.Router()

router.post('/menu', protect, upload.single('photo'), addMenu)
router.get('/menu', getMenu)
router.get('/menu/:id', getMenuId)
router.get('/menu/page/sort', searchSortMenu)
router.put('/menu/:id', protect, upload.single('photo'), editMenu)
router.get('/user/page/sort', protect, searchSortMenuUser)
router.delete('/menu/:id', protect, deleteMenu)

module.exports = router