CREATE OR ALTER PROC deleteTask(@id INT) AS
BEGIN
delete from tasks where task_id=@id

END
GO
