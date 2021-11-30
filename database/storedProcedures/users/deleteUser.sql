CREATE PROCEDURE deleteUser(@id INT)
As
BEGIN

    delete from users where id =@id

END
GO
