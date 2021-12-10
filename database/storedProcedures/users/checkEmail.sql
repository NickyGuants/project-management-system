CREATE OR ALTER PROCEDURE checkEmail(@email VARCHAR(200)) As 
BEGIN 
SELECT * FROM dbo.users where email=@email AND is_deleted=0
END
GO