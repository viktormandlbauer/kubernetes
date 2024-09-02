-- Create simple database for the todo app
CREATE DATABASE app_pingpong;

--- Use the database
\c app_pingpong;

--- Create the pingpongs table
CREATE TABLE pingpongs (
    count SERIAL PRIMARY KEY NOT NULL
);

--- Insert some initial data
INSERT INTO pingpongs (count) VALUES (0);