const pool = require('../config/db')

const postMenu = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: add menu', data)
        const {title, ingredients, category_id, user_id, photo, photo_id} = data
        pool.query(`INSERT INTO recipe (title, ingredients, category_id, user_id, photo, photo_id) VALUES ('${title}', '${ingredients}', ${category_id}, ${user_id}, '${photo}', '${photo_id}') RETURNING *`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getMenuAll = async () => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get recipe all')
        pool.query(`SELECT * FROM recipe`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getMenuById = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get menu by id', id)
        pool.query(`SELECT * FROM recipe WHERE id = ${id}`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}


const getSearchSortMenu = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: search and sort menu', data)
        const {searchby, search, sortby, sort, offset, limit} = data
        pool.query(`SELECT recipe.id, recipe.title, recipe.photo AS photo_menu, recipe.ingredients, category.name AS category, register_user.username, register_user.photo AS photo_user, recipe.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN register_user ON recipe.user_id = register_user.id WHERE ${searchby} ILIKE '%${search}%' ORDER BY ${sortby} ${sort} OFFSET ${offset} LIMIT ${limit}`, (err, results) => {
            if (!err) {
                const data = {
                  count: results.rowCount, // Jumlah total data (total row count)
                  rows: results.rows, // Data hasil query
                };
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}

const putMenuById = async (post) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: edit menu')
        const {title, ingredients, category_id, photo, photo_id, id} = post
        pool.query(`UPDATE recipe SET title = '${title}', ingredients = '${ingredients}', category_id = '${category_id}', photo = '${photo}', photo_id = '${photo_id}' WHERE id = ${id} RETURNING *`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getMenuByUser = async (user_id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get menu by user id', user_id)
        pool.query(`SELECT * FROM recipe WHERE user_id = ${user_id}`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getSearchSortMenuByUser = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: search and sort menu by user', data)
        const {sortby, sort, offset, limit, user_id} = data
        pool.query(`SELECT recipe.id, recipe.title, recipe.photo AS photo_menu, recipe.ingredients, category.name AS category, register_user.username, register_user.photo AS photo_user, recipe.created_at FROM recipe JOIN category ON recipe.category_id = category.id JOIN register_user ON recipe.user_id = register_user.id WHERE user_id = ${user_id} ORDER BY ${sortby} ${sort} OFFSET ${offset} LIMIT ${limit}`, (err, results) => {
            if (!err) {
                const data = {
                  count: results.rowCount, // Jumlah total data (total row count)
                  rows: results.rows, // Data hasil query
                };
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}

const delMenuById = async (id) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: delete menu by id')
        pool.query(`DELETE FROM recipe WHERE id = ${id} RETURNING *`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}


module.exports = {
    postMenu,
    getMenuAll,
    getMenuById,
    getSearchSortMenu,
    putMenuById,
    getMenuByUser,
    getSearchSortMenuByUser,
    delMenuById
}
