const pool = require('../config/db')

const postBookmark = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: bookmark menu', data)
        const {user_id, recipe_id} = data
        pool.query(`INSERT INTO bookmarked (user_id, recipe_id) VALUES (${user_id}, ${recipe_id}) RETURNING *`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}


const getBookmarkById = async (user_id, id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get bookmark by id', id)
        pool.query(`SELECT * FROM bookmarked WHERE user_id = ${user_id} AND recipe_id = ${id}`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getBookmarkByUser = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get bookmark by user', id)
        pool.query(`SELECT * FROM bookmarked WHERE user_id = ${id}`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getMyBookmarkMenu = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get my bookmark menu', id)
        pool.query(`SELECT recipe.id AS recipe_id, bookmarked.id AS bookmarked_id, recipe.title, recipe.photo_id, recipe.user_id, recipe.photo AS photo_menu, recipe.ingredients, category.name AS category, bookmarked.user_id AS bookmarked_by, register_user.username, register_user.photo AS photo_user, bookmarked.created_at FROM bookmarked JOIN recipe ON bookmarked.recipe_id = recipe.id JOIN register_user ON recipe.user_id = register_user.id JOIN category ON recipe.category_id = category.id WHERE bookmarked.user_id = ${id}`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const delMyBookmarkMenu = async (user_id, id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: delete my bookmark menu')
        pool.query(`DELETE FROM bookmarked WHERE user_id = ${user_id} AND recipe_id = ${id} RETURNING *`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    postBookmark,
    getBookmarkById,
    getBookmarkByUser,
    getMyBookmarkMenu,
    delMyBookmarkMenu
}