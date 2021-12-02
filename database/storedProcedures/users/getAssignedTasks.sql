CREATE PROCEDURE getAssignedTasks (@user_id INT) As 
BEGIN
select * from user_tasks where user_id=@user_id;

END
GO

EXEC getAssignedTasks 23;