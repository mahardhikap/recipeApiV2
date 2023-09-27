const {
  postLike,
  getMyLikeMenu,
  getLikeById,
  getLikeByUser,
  delMyLikeMenu,
  countLike
} = require('../model/likeModel');
const {
  getMenuById
} = require('../model/menuModel')

const likeController = {
  likeMenu: async (req, res) => {
    try {
      const {id} = req.params;
      // let id = recipe_id
      // return console.log('cek recipe id', id)

      if (!id) {
        return res.status(400).json({ status: 400, message: 'recipe_id is required!' });
      }

      const user_id = req.payload.id;
      let checkMenu = await getMenuById(id)
      let checkUserLiked = await getLikeByUser(user_id);
      let checkMenuLiked = await getLikeById(id)
      // return console.log('checliked', checkLiked)

      if(!checkMenu.rows[0]){
        return res.status(404).json({status:404, message:'menu not found!'})
      }
  
      if (checkUserLiked.rows[0] && checkMenuLiked.rows[0]) {
        const result = await delMyLikeMenu(user_id, id)
        return res.status(200).json({
          status: 200,
          message: 'Delete like menu success!',
          data: result.rows[0],
        });
      }
      
      let post = {
        recipe_id: id,
        user_id
      };

      const result = await postLike(post);
      if (result.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: 'Like menu success!',
          data: result.rows[0],
        });
      }
    } catch (error) {
      console.error('Like menu error', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Like menu error, something happens!' });
    }
  },
  getMyLike: async (req, res) => {
    try {
      const { id } = req.payload;
      const result = await getMyLikeMenu(id);
      if (result.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Get my like menu success!',
          data: result.rows,
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get my like menu', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Get my like menu failed!' });
    }
  },
  countMenuLike: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await countLike(id);
      if (result.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: 'Count like success!',
          data: result.rows[0],
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Like is zero!' });
      }
    } catch (error) {
      console.error('Error when count liked menu by id', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Count liked menu by id failed!' });
    }
  },
//   deleteLike: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const result = await delMyLikeMenu(id);
//       if (result.rows[0]) {
//         return res
//           .status(200)
//           .json({
//             status: 200,
//             message: 'Delete like success!',
//             data: result.rows[0],
//           });
//       } else {
//         return res.status(404).json({ status: 404, message: 'Like not found' });
//       }
//     } catch (error) {
//       console.log('Error when delete user', error.message);
//       return res
//         .status(500)
//         .json({ status: 500, message: 'Delete like failed!' });
//     }
//   },
};

module.exports = likeController;
