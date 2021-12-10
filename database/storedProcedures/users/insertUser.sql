CREATE OR ALTER PROCEDURE insertUser (@username VARCHAR(200),@name VARCHAR(200), @email VARCHAR(200), @password VARCHAR(500))
As 
BEGIN 
INSERT INTO users (username,name,email,password) 
VALUES(@username, @name, @email, @password)
END