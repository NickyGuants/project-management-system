CREATE OR ALTER PROC getSingleTask(@id INT) AS
BEGIN
SELECT * from dbo.tasks where task_id = @id;

END
