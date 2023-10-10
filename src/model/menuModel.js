const pool = require('../config/db');

const postMenu = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('Model: add menu', data);
    const { title, ingredients, category_id, user_id, photo, photo_id } = data;
    pool.query(
      `INSERT INTO recipe (title, ingredients, category_id, user_id, photo, photo_id) VALUES ('${title}', '${ingredients}', ${category_id}, ${user_id}, '${photo}', '${photo_id}') RETURNING *`,
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

const getMenuAll = async () => {
  return new Promise((resolve, reject) => {
    console.log('Model: get recipe all');
    pool.query(
      `SELECT recipe.id, recipe.title, recipe.photo, recipe.ingredients, recipe.category_id, recipe.user_id, recipe.photo_id, recipe.created_at, COALESCE(COUNT(liked.id), 0) AS like_count
    FROM recipe
    LEFT JOIN liked ON recipe.id = liked.recipe_id
    GROUP BY recipe.id, recipe.title, recipe.photo, recipe.ingredients, recipe.category_id, recipe.user_id, recipe.photo_id, recipe.created_at`,
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

const getMenuById = async (id) => {
  return new Promise((resolve, reject) => {
    console.log('Model: get menu by id', id);
    pool.query(
      `SELECT recipe.id, recipe.title, recipe.photo_id, recipe.photo AS photo_menu, recipe.ingredients, recipe.user_id, recipe.category_id, category.name AS category, register_user.username, register_user.photo AS photo_user, recipe.created_at, COALESCE(COUNT(liked.id), 0) AS like_count FROM recipe JOIN category ON recipe.category_id = category.id JOIN register_user ON recipe.user_id = register_user.id LEFT JOIN liked ON recipe.id = liked.recipe_id WHERE recipe.id = ${id} GROUP BY recipe.id, recipe.title, recipe.photo_id, recipe.photo, recipe.ingredients, recipe.user_id, recipe.category_id, category.name, register_user.username, register_user.photo, recipe.created_at`,
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

const getSearchSortMenu = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('Model: search and sort menu', data);
    const { searchby, search, sortby, sort, offset, limit } = data;
    pool.query(
      `SELECT recipe.id, recipe.title, recipe.photo AS photo_menu, recipe.ingredients, category.name AS category, register_user.username, register_user.photo AS photo_user, recipe.created_at, COALESCE(COUNT(liked.id), 0) AS like_count FROM recipe JOIN category ON recipe.category_id = category.id JOIN register_user ON recipe.user_id = register_user.id LEFT JOIN liked ON recipe.id = liked.recipe_id WHERE ${searchby} ILIKE '%${search}%' GROUP BY recipe.id, recipe.title, recipe.photo, recipe.ingredients, category.name, register_user.username, register_user.photo, recipe.created_at ORDER BY ${sortby} ${sort} OFFSET ${offset} LIMIT ${limit}`,
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

const getMenuCount = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('Model: search and sort menu', data);
    const { searchby, search } = data;
    pool.query(
      `SELECT COUNT(*) FROM recipe JOIN category ON recipe.category_id = category.id JOIN register_user ON recipe.user_id = register_user.id WHERE ${searchby} ILIKE '%${search}%'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const putMenuById = async (post) => {
  return new Promise((resolve, reject) => {
    console.log('Model: edit menu', post);
    const { title, ingredients, category_id, photo, photo_id, id } = post;
    pool.query(
      `UPDATE recipe SET title = '${title}', ingredients = '${ingredients}', category_id = '${category_id}', photo = '${photo}', photo_id = '${photo_id}' WHERE id = ${id} RETURNING *`,
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

const getMenuByUser = async (user_id) => {
  return new Promise((resolve, reject) => {
    console.log('Model: get menu by user id', user_id);
    pool.query(
      `SELECT * FROM recipe WHERE user_id = ${user_id}`,
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

const getSearchSortMenuByUser = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('Model: search and sort menu by user', data);
    const { sortby, sort, offset, limit, user_id } = data;
    pool.query(
      `SELECT recipe.id, recipe.title, recipe.photo AS photo_menu, recipe.ingredients, category.name AS category, register_user.username, register_user.photo AS photo_user, recipe.created_at, COALESCE(COUNT(liked.id), 0) AS like_count FROM recipe JOIN category ON recipe.category_id = category.id JOIN register_user ON recipe.user_id = register_user.id LEFT JOIN liked ON recipe.id = liked.recipe_id WHERE recipe.user_id = ${user_id} GROUP BY recipe.id, recipe.title, recipe.photo, recipe.ingredients, category.name, register_user.username, register_user.photo, recipe.created_at ORDER BY ${sortby} ${sort} OFFSET ${offset} LIMIT ${limit}`,
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

const delMenuById = async (id) => {
  return new Promise((resolve, reject) => {
    console.log('Model: delete menu by id');
    pool.query(
      `DELETE FROM recipe WHERE id = ${id} RETURNING *`,
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

module.exports = {
  postMenu,
  getMenuAll,
  getMenuById,
  getSearchSortMenu,
  putMenuById,
  getMenuByUser,
  getSearchSortMenuByUser,
  delMenuById,
  getMenuCount,
};
