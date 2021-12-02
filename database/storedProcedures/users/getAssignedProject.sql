CREATE PROCEDURE getAssignedProject (@user_id INT) As 
BEGIN
select project_id from project_users where user_id=@user_id;

END
GO

EXEC getAssignedProject 23;

