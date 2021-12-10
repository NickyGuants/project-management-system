CREATE OR ALTER PROCEDURE getAllUsers
As 
BEGIN
    SELECT *
    FROM dbo.users
    where is_deleted=0

END
GO


































