const {postRegisterUser, checkEmailUser, getUserById, getUserAll, putUserById, delUserById, activatedAccount, forgetPassword} = require('../model/userModel')
const {getMenuByUser} = require('../model/menuModel')
const { hashPassword, verifyPassword } = require('../middleware/bcrypt')
const {generateToken} = require('../middleware/jwt')
const cloudinary = require('../config/cloudinary')
const { v4: uuidv4 } = require("uuid");
const sendEmail = require('../middleware/verifEmail')
const sendOTP = require('../middleware/forgetPass')
require('dotenv').config()

const userController = {
    registerUser: async (req, res) => {
        try {
            const {username, email, password, roles} = req.body
            if (!username || !email || !password) {
                return res.status(404).json({status:404, message:"All field must be filled!"})
            }
            let user = await checkEmailUser(email)
            if(user.rows[0]){
                return res.status(404).json({statuts:404, message:"Email has been registered!"})
            }

            let uuid = uuidv4()

            let post = {
                username: username,
                email:email,
                password:await hashPassword(password),
                roles:roles || 'member',
                validate: uuid
            }

            if (req.file) {
                const result_up = await cloudinary.uploader.upload(req.file.path, { folder: "recipev2" });
                post.photo = result_up.secure_url;
                post.photo_id = result_up.public_id;
              } else {
                // Jika tidak ada gambar baru diupload, ambil gambar yang masih ada
                post.photo = "https://i.ibb.co/M2JSRmW/noimage.png";
                post.photo_id = "no_id";
              }

              const result = await postRegisterUser(post)
              if(result.rows[0]){
                let resultSend = await sendEmail(email, username, `https://recipe.project13.my.id/direct/${uuid}`, uuid);
                console.log('Send email verification', resultSend)
                return res.status(200).json({status:200, message:"Registration success, check email for verification!", data: result.rows[0]})
              }
        } catch (error) {
            console.error("Error when register", error.message)
            return res.status(500).json({status:500, message:"Registration failed!"})
        }
    },
    loginUser: async (req, res) => {
        try {
            let {email, password} = req.body
            console.log('login', email, password)
  
            if(!email || !password){
                return res.status(404).json({status:404, message:"Email and password must be filled!"})
            }
  
            let data = await checkEmailUser(email)
  
            if(!data.rows[0]){
                return res.status(404).json({status:404, message:"Email not registered!"})
            }
  
            let user = data.rows[0]

            const isPasswordMatch = await verifyPassword(password, user.password)
            if(isPasswordMatch){
              delete user.password
              const token = generateToken(user)
              user.token = token
              if (!user.is_active) {
                return res.status(404).json({ status: 404, message: "Email has not been activated" });
              }
              return res.status(200).json({status:200, message:"Login success!", data:user})
            } else {
              return res.status(404).json({status:404, message:"Data login is wrong!"})
            }
        } catch (error) {
            console.error('Error when login', error.message)
            return res.status(500).json({status:500, message:"Login failed!"})
        }
    },
    getUserId: async (req, res) => {
        try {
            const {id} = req.params
            const result = await getUserById(id)

            if (result.rowCount > 0) {
                return res.status(200).json({status:200, message:"Get user success!", data:result.rows[0]})
            } else {
                return res.status(404).json({status:404, message:"Data not found!"})
            }
        } catch (error) {
            console.error('Error when get user by id', error.message)
            return res.status(500).json({status:500, message:"Get user failed!"})
        }
    },
    getUserPayloadId: async (req, res) => {
        try {
            const id = req.payload.id
            const result = await getUserById(id)

            if (result.rowCount > 0) {
                return res.status(200).json({status:200, message:"Get user success!", data:result.rows[0]})
            } else {
                return res.status(404).json({status:404, message:"Data not found!"})
            }
        } catch (error) {
            console.error('Error when get user by payload id', error.message)
            return res.status(500).json({status:500, message:"Get user by payload id failed!"})
        }
    },
    allUser: async (req, res) => {
        try {
            const result = await getUserAll()

            if (result.rowCount > 0) {
                return res.status(200).json({status:200, message:"Get user success!", data:result.rows})
            } else {
                return res.status(404).json({status:404, message:"Data not found!"})
            }
        } catch (error) {
            console.error('Error when get all user', error.message)
            return res.status(500).json({status:500, message:"Get user failed!"})
        }
    },
    editUser: async (req, res) => {
        try {
            const {id} = req.payload
            const {username, email, password} = req.body
        
            let data = await getUserById(id);
            let result_up = null;
        
            if (req.file) {
                // Jika req.file ada, upload gambar baru dan delete gambar lama
                result_up = await cloudinary.uploader.upload(req.file.path, { folder: 'recipev2' });
                await cloudinary.uploader.destroy(data.rows[0].photo_id);
            }
        
            let post = {
              id: id,
              username: username || data.rows[0].username,
              email: email || data.rows[0].email,
              password: password || data.rows[0].password
            }

            if(password){
                post.password = await hashPassword(password)
            }
        
            if (result_up) {
              // Jika gambar baru diupload, update properti image
                post.photo = result_up.secure_url;
                post.photo_id = result_up.public_id;
            } else {
                // Jika tidak ada gambar baru diupload, ambil gambar yang masih ada
                post.photo = data.rows[0].photo;
                post.photo_id = data.rows[0].photo_id;
            }
              
            if(id != data.rows[0].id){
                return res.status(404).json({status:404, message:"This is not your profile!"})
            }
        
            const result = await putUserById(post);
              if (result.rows[0]) {
                const updatedUserData = { ...data.rows[0], ...post };
                const token = generateToken(updatedUserData);
                updatedUserData.token = token;
                return res.status(200).json({status:200, message:"Update profile success!", data:updatedUserData});
              } else {
                  return res.status(404).json({status:404, message:"Data not found!"});
              }
        } catch (error) {
            console.error('Error when edit user', error.message);
            return res.status(500).json({status:500, message:"Edit user failed!"});
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {id} = req.payload
            const data = await getUserById(id)
            const menu = await getMenuByUser(id)
            const photo_menu_delete = menu.rows.map((item) => item.photo_id)

            if(data){
                await cloudinary.uploader.destroy(data.rows[0].photo_id);
                for (const photo_delete of photo_menu_delete){
                    await cloudinary.uploader.destroy(photo_delete)
                }
            }
            const result = await delUserById(id)
            if(result.rows[0]){
                return res.status(200).json({status:200, message:"Delete account success!", data:result.rows[0]})
            } else {
                return res.status(404).json({status:404, message:"Account id not found!"})
            }
        } catch (error) {
            console.error('Error when delete user', error.message)
            return res.status(500).json({status:500, message:"Delete account failed!"})
        }
    },
    verify: async (req, res) => {
        const { id } = req.params;
        let result = await activatedAccount(id);
        console.log('Running verif account', result.rowCount)
        if (result.rowCount !== 0) {
          return res.status(200).json({ status: 200, message: "Verify success you can login now" });
        }
        return res.status(404).json({ status: 404, message: "Verify failed try again" });
    },
    sendForgetOTP:async (req, res) => {
        try {
            const {email} = req.params
            let checkUser = await checkEmailUser(email)
            // return(console.log(checkUser))
            if(checkUser.rowCount < 1){
                return res.status(404).json({status:404, message:'Email not found!'})
            }
            let resultSend = await sendOTP(email, checkUser.rows[0].username, checkUser.rows[0].validate);
            console.log('Send OTP', resultSend)
            return res.status(200).json({status:200, message:'Send OTP success, check email!'})
        } catch (error) {
            console.error('error when send OTP', error.message)
            return res.status(500).json({status:500, message:'Send OTP failed!'})
        }
    },
    forgetPass: async (req, res) => {
        try {
            const {password, email, validate} = req.body
            if(!password || !email || !validate){
                return res.status(404).json({status:404, message:'Fill all field!'})
            }
            let checkUser = await checkEmailUser(email)
            // return(console.log(checkUser))
            if(checkUser.rowCount < 1){
                return res.status(404).json({status:404, message:'This email not registered!'})
            }
            let post = {
                password: await hashPassword(password),
                email: email,
                validate: validate
            }

            const result = await forgetPassword(post)
            // return console.log(result)
            if(result.rows[0]){
                return res.status(200).json({status:200, message:'Change password success!', data:result.rows[0]})
            } else {
                return res.status(404).json({status:404, message:'Some credential not valid!'})
            }
        } catch (error) {
            console.error('Error when update password', error.message)
            return res.status(500).json({status:500, message:'Change password failed!', error:error.message})
        }
    }
}

module.exports = userController