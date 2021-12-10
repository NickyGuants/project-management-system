CREATE OR ALTER PROCEDURE deleteUser(@id INT)
As
BEGIN

    Update users set is_deleted=1 where id=@id

END
GO
