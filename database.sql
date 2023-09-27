CREATE DATABASE recipev2;

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE register_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    roles VARCHAR,
    photo_id VARCHAR,
    validate VARCHAR,
    is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    photo VARCHAR,
    ingredients TEXT NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    photo_id VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (user_id) REFERENCES register_user(id) ON DELETE CASCADE
);

ALTER TABLE recipe
ADD COLUMN like_count INT DEFAULT 0;

CREATE TABLE liked (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES register_user(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);
CREATE TABLE bookmarked (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES register_user(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES register_user(id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

--CHECK AMOUNT LIKE--
SELECT recipe.id AS recipe_id, 
       recipe.title AS recipe_title, 
       COUNT(liked.id) AS like_count
FROM recipe
LEFT JOIN liked ON recipe.id = liked.recipe_id
WHERE recipe.id = 4
GROUP BY recipe.id, recipe.title;