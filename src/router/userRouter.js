const {registerUser, loginUser, getUserId, getUserPayloadId, allUser, editUser, deleteUser, verify} = require('../controller/userController')
const {protect} = require('../middleware/jwt')
const upload = require('../middleware/multer')

const app = require("express");
const router = app.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:id', getUserId)
router.get('/get-user', protect, getUserPayloadId)
router.get('/user', allUser)
router.put('/user', protect, upload.single('photo'), editUser)
router.delete('/user', protect, deleteUser)
router.get('/verify/:id', verify)

module.exports = router