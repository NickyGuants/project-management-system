CREATE PROCEDURE getSingleUser(@id INT) As 
BEGIN 
SELECT * FROM dbo.users where id=@id

END
GO

EXECUTE dbo.getSingleUser 1;