const pool = require('../config/db')

const postRegisterUser = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: register user', data)
        const {username, email, password, roles, photo, photo_id} = data
        pool.query(`INSERT INTO register_user (username, email, password, roles, photo, photo_id) VALUES ('${username}', '${email}', '${password}', '${roles}', '${photo}', '${photo_id}') RETURNING *`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const checkEmailUser = async (email) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: check email', email)
        pool.query(`SELECT * FROM register_user WHERE email = '${email}'`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getUserById = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get user by id', id)
        pool.query(`SELECT * FROM register_user WHERE id = ${id}`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getUserAll = async () => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get user all')
        pool.query(`SELECT * FROM register_user`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const putUserById = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: edit user')
        const {username, email, password, photo, photo_id, id} = post
        pool.query(`UPDATE register_user SET username = '${username}', email = '${email}', password = '${password}', photo = '${photo}', photo_id = '${photo_id}' WHERE id = ${id} RETURNING *`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const delUserById = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: delete user')
        pool.query(`DELETE FROM register_user WHERE id = ${id} RETURNING *`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    postRegisterUser,
    checkEmailUser,
    getUserById,
    getUserAll,
    putUserById,
    delUserById
}