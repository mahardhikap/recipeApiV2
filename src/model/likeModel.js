const pool = require('../config/db')

const postLike = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: like menu', data)
        const {user_id, recipe_id} = data
        pool.query(`INSERT INTO liked (user_id, recipe_id) VALUES (${user_id}, ${recipe_id}) RETURNING *`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}


const getLikeById = async (user_id, id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get like by id', id)
        pool.query(`SELECT * FROM liked WHERE user_id = ${user_id} AND recipe_id = ${id}`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getLikeByUser = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get like by user', id)
        pool.query(`SELECT * FROM liked WHERE user_id = ${id}`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getMyLikeMenu = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get my like menu', id)
        pool.query(`SELECT recipe.id AS recipe_id, liked.id AS liked_id, recipe.title, recipe.photo_id, recipe.user_id, recipe.photo AS photo_menu, recipe.ingredients, category.name AS category, liked.user_id AS liked_by, register_user.username, register_user.photo AS photo_user, liked.created_at FROM liked JOIN recipe ON liked.recipe_id = recipe.id JOIN register_user ON recipe.user_id = register_user.id JOIN category ON recipe.category_id = category.id WHERE liked.user_id = ${id}`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const delMyLikeMenu = async (user_id, id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: delete my like menu')
        pool.query(`DELETE FROM liked WHERE user_id = ${user_id} AND recipe_id = ${id} RETURNING *`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const countLike = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: count like menu', id)
        pool.query(`SELECT recipe.id AS recipe_id, recipe.title AS recipe_title, COUNT(liked.id) AS like_count FROM recipe LEFT JOIN liked ON recipe.id = liked.recipe_id WHERE recipe.id = ${id} GROUP BY recipe.id, recipe.title`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    postLike,
    getLikeById,
    getLikeByUser,
    getMyLikeMenu,
    delMyLikeMenu,
    countLike
}