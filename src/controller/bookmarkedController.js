const {
    postBookmark,
    getBookmarkById,
    getBookmarkByUser,
    getMyBookmarkMenu,
    delMyBookmarkMenu,
  } = require('../model/bookmarkedModel');

const {
    getMenuById
} = require('../model/menuModel')
  
  const bookmarkController = {
    bookmarkMenu: async (req, res) => {
      try {
        const {id} = req.params;
        // let id = recipe_id
        // return console.log('cek recipe id', id)
  
        if (!id) {
          return res.status(400).json({ status: 400, message: 'recipe_id is required!' });
        }
  
        const user_id = req.payload.id;
        let checkMenu = await getMenuById(id)
        let checkUserBookmarked = await getBookmarkByUser(user_id);
        let checkMenuBookmarked = await getBookmarkById(user_id, id)
        // return console.log('bookmarked', chekUserBookmarked)
  
        if(!checkMenu.rows[0]){
          return res.status(404).json({status:404, message:'menu not found!'})
        }
    
        if (checkMenuBookmarked.rows[0]) {
          await delMyBookmarkMenu(user_id, id)
          return res.status(200).json({
            status: 200,
            message: 'Delete bookmark menu success!',
          });
        }
        
        let post = {
          recipe_id: id,
          user_id
        };
  
        const result = await postBookmark(post);
        if (result.rows[0]) {
          return res.status(200).json({
            status: 200,
            message: 'Bookmark menu success!',
            data: result.rows[0],
          });
        }
      } catch (error) {
        console.error('Bookmark menu error', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Bookmark menu error, something happens!' });
      }
    },
    getMyBookmark: async (req, res) => {
      try {
        const { id } = req.payload;
        const result = await getMyBookmarkMenu(id);
        if (result.rows.length > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Get my bookmark menu success!',
            data: result.rows,
          });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: 'Data not found!' });
        }
      } catch (error) {
        console.error('Error when get my bookmark menu', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Get my bookmark menu failed!' });
      }
    }
  };
  
  module.exports = bookmarkController;
  