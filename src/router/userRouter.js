const {registerUser, loginUser, getUserId, allUser, editUser, deleteUser} = require('../controller/userController')
const {protect} = require('../middleware/jwt')
const upload = require('../middleware/multer')

const app = require("express");
const router = app.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserId)
router.get('/user', allUser)
router.put('/user', protect, upload.single('photo'), editUser)
router.delete('/user', protect, deleteUser)

module.exports = router