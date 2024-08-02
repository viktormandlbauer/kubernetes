-- Create simple database for the todo app
CREATE DATABASE todo_app;

--- Use the database
\c todo_app

--- Create the task_status enum
CREATE TYPE task_status AS ENUM ('todo', 'done');

--- Create the tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status task_status NOT NULL DEFAULT 'todo'
);