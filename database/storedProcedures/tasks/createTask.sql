CREATE OR ALTER PROCEDURE createTask(@task_name VARCHAR(200), @task_description VARCHAR(200), @is_complete BIT, @project_id INT) AS
BEGIN
INSERT INTO dbo.tasks (task_name, task_description, is_complete, project_id) 
VALUES (@task_name, @task_description, @is_complete, @project_id)

END
GO
EXEC createTask 'database design', 'Design the database', 0, 1;