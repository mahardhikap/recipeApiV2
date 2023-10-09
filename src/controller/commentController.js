const {postComment, getComment, getCommentEdit, putComment, delComment} = require('../model/commentModel')

const commentController = {
    postCommentMenu: async (req, res) => {
        try {
            const {id} = req.params
            const user_id = req.payload.id
            const {text} = req.body
            // return console.log(id, user_id, text)

            if(!user_id){
                return res.status(404).json({status:404, message:'You need to be logged in to comment!'})
            }

            let post = {
                user_id: user_id,
                recipe_id: id,
                text: text
            }

            const result = await postComment(post)
            if(result.rows[0]){
                return res.status(200).json({status:200, message:'Post comment success!', data:result.rows[0]})
            } else {
                return res.status(404).json({status:404, message:'The comment field cannot be empty!'})
            }
        } catch (error) {
            console.error('Post comment failed!', error.message)
            return res.status(500).json({status:500, message:'Something is wrong, comment failed!'})
        }
    },
    getCommentMenu: async (req, res) => {
        //use id recipe
        try {
            const {id} = req.params
          const result = await getComment(id);
          if (result.rowCount > 0) {
            return res.status(200).json({
              status: 200,
              message: 'Get comment success!',
              data: result.rows,
            });
          } else {
            return res
              .status(404)
              .json({ status: 404, message: 'Comment not found!' });
          }
        } catch (error) {
          console.error('Error when get comment!', error.message);
          return res.status(500).json({ status: 500, message: 'Get comment failed!' });
        }
      },
    getCommentMenuEdit: async (req, res) => {
        //use id comment
        try {
            const {id} = req.params
          const result = await getCommentEdit(id);
          if (result.rowCount > 0) {
            return res.status(200).json({
              status: 200,
              message: 'Get comment success!',
              data: result.rows,
            });
          } else {
            return res
              .status(404)
              .json({ status: 404, message: 'Comment not found!' });
          }
        } catch (error) {
          console.error('Error when get comment!', error.message);
          return res.status(500).json({ status: 500, message: 'Get comment failed!' });
        }
      },
    editCommentMenu: async (req, res) => {
        try {
            const {id} = req.params
            const user_id = req.payload.id
            const {text} = req.body

            if(!user_id){
                return res.status(404).json({status:404, message:'You need to login to edit comment!'})
            }

            let post = {
                id: id,
                user_id: user_id,
                text: text
            }
            
            const result = await putComment(post)
            if(result.rows[0]){
                return res.status(200).json({status:200, message:'Edit comment success!', data:result.rows[0]})
            }else {
                return res.status(404).json({status:404, message:'The comment field cannot be empty!'})
            }
        } catch (error) {
            console.error('Edit comment failed!', error.message)
            return res.status(500).json({status:500, message:'Something is wrong, edit comment failed!'})
        }
    },
    deleteComment: async (req, res) => {
        try {
            const {id} = req.params
            const user_id = req.payload.id
            if(!user_id){
                return res.status(404).json({status:404, message:'You need to login to delete!'})
            }
            const result = await delComment(id, user_id)
            if(result.rows[0]){
                return res.status(200).json({status:200, message:'Delete comment success!', data:result.rows[0]})
            } else {
              return res.status(404).json({status:404, message:'Comment not found!'})
            }
        } catch (error) {
            console.error('Delete comment failed!', error.message)
            return res.status(500).json({status:500, message:'Something is wrong, delete comment failed!'})
        }
    }
}

module.exports = commentController