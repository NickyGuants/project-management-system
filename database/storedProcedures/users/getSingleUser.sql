CREATE OR ALTER PROCEDURE getSingleUser(@id INT) As 
BEGIN 
SELECT * FROM dbo.users where id=@id

END
GO

