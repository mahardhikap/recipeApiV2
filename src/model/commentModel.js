const pool = require('../config/db')

const postComment = async (data) => {
    return new Promise((resolve, reject)=>{
        console.log('Model: comment menu', data)
        const {user_id, recipe_id, text} = data
        pool.query(`INSERT INTO comment (user_id, recipe_id, text) VALUES (${user_id}, ${recipe_id}, '${text}') RETURNING *`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getComment = async (id) => {
    //use id recipe
    return new Promise((resolve, reject)=>{
        console.log('Model: get comment menu', id)
        pool.query(`SELECT comment.id, comment.user_id, register_user.username, register_user.photo, register_user.roles, comment.text FROM comment JOIN register_user ON comment.user_id = register_user.id JOIN recipe ON comment.recipe_id = recipe.id WHERE comment.recipe_id=${id} ORDER BY comment.created_at DESC`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const getCommentEdit = async (id) => {
    //use id comment
    return new Promise((resolve, reject)=>{
        console.log('Model: get comment menu for edit', id)
        pool.query(`SELECT comment.id, comment.user_id, register_user.username, register_user.photo, register_user.roles, comment.text FROM comment JOIN register_user ON comment.user_id = register_user.id JOIN recipe ON comment.recipe_id = recipe.id WHERE comment.id=${id}`, (err, results) => {
            if (!err){
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const putComment = async (post) => {
    return new Promise((resolve, reject) => {
      console.log('Model: edit comment');
      const {text, id, user_id} = post
      pool.query(
        `UPDATE comment SET text = '${text}' WHERE id = ${id} AND user_id = ${user_id} RETURNING *`,
        (err, results) => {
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    });
  };

  const delComment = async (id, user_id) => {
    return new Promise((resolve, reject) => {
      console.log('Model: delete comment');
      pool.query(
        `DELETE FROM comment WHERE id = ${id} AND user_id = ${user_id} RETURNING *`,
        (err, results) => {
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    });
  };

module.exports ={
    postComment,
    getComment,
    getCommentEdit,
    putComment,
    delComment
}