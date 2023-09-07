const {
  postMenu,
  getMenuAll,
  getMenuById,
  getSearchSortMenu,
  putMenuById,
  getMenuByUser,
  getSearchSortMenuByUser,
  delMenuById,
} = require('../model/menuModel');

const {
  getUserById
} = require('../model/userModel')
const cloudinary = require('../config/cloudinary');

const menuController = {
  addMenu: async (req, res) => {
    try {
      const { title, ingredients, category_id } = req.body;
      const user_id = req.payload.id;

      const userExist = await getUserById(user_id)

      if(!userExist.rows[0]){
        return res.status(404).json({status:404, message:'ID Token invalid or missing! Not match any user in database.'})
      }

      let post = {
        title: title,
        ingredients: ingredients,
        category_id: category_id,
        user_id,
      };

      if (req.file) {
        const result_up = await cloudinary.uploader.upload(req.file.path, {
          folder: 'recipev2',
        });
        post.photo = result_up.secure_url;
        post.photo_id = result_up.public_id;
      } else {
        post.photo = 'https://i.ibb.co/M2JSRmW/noimage.png';
        post.photo_id = 'no_image';
      }

      const result = await postMenu(post);
      if (result.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: 'Post menu success!',
          data: result.rows[0],
        });
      }
    } catch (error) {
      console.error('Post menu error', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Post menu failed!' });
    }
  },
  getMenu: async (req, res) => {
    try {
      const result = await getMenuAll();
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Get menu success!',
          data: result.rows,
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get menu all', error.message);
      return res.status(500).json({ status: 500, message: 'Get menu failed!' });
    }
  },
  getMenuId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getMenuById(id);
      if (result.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: 'Get menu by id success!',
          data: result.rows[0],
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get menu by id', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Get menu by id failed!' });
    }
  },
  searchSortMenu: async (req, res) => {
    try {
      const { searchby, search, sortby, sort, limit } = req.query;
      let page = parseInt(req.query.page) || 1;
      let limiter = limit || 5;

      const post = {
        sortby: sortby || 'created_at',
        sort: sort || 'ASC',
        limit: limit || 5,
        offset: (page - 1) * limiter,
        searchby: searchby || 'title',
        search: search,
      };
      const resultTotal = await getMenuAll();
      const result = await getSearchSortMenu(post);
      let pagination = {
        totalPage: Math.ceil(resultTotal.rowCount / limiter),
        totalData: parseInt(result.count),
        pageNow: page,
      };

      if (result.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Get data success!',
          data: { rows: result.rows, pages: pagination },
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get data sort & search', error.message);
      return res.status(500).json({ status: 500, message: 'Get data failed!' });
    }
  },
  editMenu: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, ingredients, category_id } = req.body;

      const data = await getMenuById(id);
      if (data.rowCount === 0) {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
      let result_up = null;

      if (req.file) {
        result_up = await cloudinary.uploader.upload(req.file.path, {
          folder: 'recipev2',
        });
        await cloudinary.uploader.destroy(data.rows[0].photo_id);
      }

      let post = {
        id: id,
        title: title || data.rows[0].title,
        ingredients: ingredients || data.rows[0].ingredients,
        category_id: category_id || data.rows[0].category_id,
      };

      if (result_up) {
        // Jika gambar baru diupload, update properti photo
        post.photo = result_up.secure_url;
        post.photo_id = result_up.public_id;
      } else {
        // Jika tidak ada gambar baru diupload, ambil gambar yang masih ada
        post.photo = data.rows[0].photo;
        post.photo_id = data.rows[0].photo_id;
      }

      let user_id = req.payload.id;

      if (user_id !== data.rows[0].user_id) {
        return res
          .status(404)
          .json({ status: 404, message: 'This is not your post!' });
      }

      const result = await putMenuById(post);
      if (result.rows[0]) {
        return res
          .status(200)
          .json({
            status: 200,
            message: 'Edit menu success!',
            data: result.rows[0],
          });
      }
    } catch (error) {
      console.error('Error when update menu', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Update menu failed!' });
    }
  },
  searchSortMenuUser: async (req, res) => {
    try {
      const { sortby, sort, limit } = req.query;
      const user_id = req.payload.id;
      let page = parseInt(req.query.page) || 1;
      let limiter = limit || 5;

      const post = {
        sortby: sortby || 'created_at',
        sort: sort || 'ASC',
        limit: limit || 5,
        offset: (page - 1) * limiter,
        user_id: user_id,
      };
      const resultTotal = await getMenuByUser(user_id);
      const result = await getSearchSortMenuByUser(post);

      let pagination = {
        totalPage: Math.ceil(resultTotal.rowCount / limiter),
        totalData: parseInt(result.count),
        pageNow: page,
      };

      if (result.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Get data success!',
          data: { rows: result.rows, pages: pagination },
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get data search & sort by user', error.message);
      return res.status(500).json({ status: 500, message: 'Get data failed!' });
    }
  },
  deleteMenu: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await getMenuById(id);
      if (data) {
        await cloudinary.uploader.destroy(data.rows[0].photo_id);
      }

      if (data.rows[0].user_id !== req.payload.id) {
        return res
          .status(404)
          .json({ status: 404, message: 'This is not your post!' });
      }

      const result = await delMenuById(id);
      if (result.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: 'Delete menu success!',
          data: result.rows[0],
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when delete menu', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Delete menu failed!' });
    }
  },
};

module.exports = menuController;
