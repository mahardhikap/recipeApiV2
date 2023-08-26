CREATE DATABASE recipev2;

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR,
    roles VARCHAR,
    photo_id VARCHAR
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
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);