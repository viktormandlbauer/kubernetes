-- Create simple database for the todo app
CREATE DATABASE app_todo;

--- Use the database
\c app_todo

--- Create the task_status enum
CREATE TYPE todo_status AS ENUM ('open', 'done');

--- Create the tasks table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status todo_status NOT NULL DEFAULT 'open'
);