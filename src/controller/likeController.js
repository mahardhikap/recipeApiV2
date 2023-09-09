const {
  postLike,
  getMyLikeMenu,
  getLikeById,
  delMyLikeMenu,
} = require('../model/likeModel');

const likeController = {
  likeMenu: async (req, res) => {
    try {
      const { recipe_id } = req.body;
      const user_id = req.payload.id;
      let checkLiked = await getLikeById(recipe_id);
      //   return console.log(checkLiked.rows[0])
      if (checkLiked.rows[0]) {
        return res.status(404).json({ status: 404, message: 'Already liked!' });
      }
      let post = {
        recipe_id: recipe_id,
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
        .json({ status: 500, message: 'Like menu failed, login first!' });
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
  deleteLike: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await delMyLikeMenu(id);
      if (result.rows[0]) {
        return res
          .status(200)
          .json({
            status: 200,
            message: 'Delete like success!',
            data: result.rows[0],
          });
      } else {
        return res.status(404).json({ status: 404, message: 'Like not found' });
      }
    } catch (error) {
      console.log('Error when delete user', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Delete like failed!' });
    }
  },
};

module.exports = likeController;
