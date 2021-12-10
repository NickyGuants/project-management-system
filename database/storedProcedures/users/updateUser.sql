CREATE OR ALTER PROCEDURE updateUser(@id INT, @email VARCHAR(200), @username VARCHAR(200), @name VARCHAR(200)) As 
BEGIN 
Update users set username=@username, email=@email, name=@name where id=@id AND is_deleted=0

END
GO

