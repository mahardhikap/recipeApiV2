const pool = require('../config/db')

const postCategory = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: post category', data)
        const {name} = data
        pool.query(`INSERT INTO category (name) VALUES ('${name}') RETURNING *`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getCategoryAll = async () => {
    return new Promise((resolve, reject)=>{
        console.log('Model: get category all')
        pool.query(`SELECT * FROM category`, (err, results) => {
            if (!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const putCategoryById = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: update category', data)
        const {name, id} = data
        pool.query(`UPDATE category SET name = '${name}' WHERE id = ${id} RETURNING *`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    postCategory,
    getCategoryAll,
    putCategoryById
}
