CREATE OR ALTER PROC updateTask (@id INT, @task_description VARCHAR(200), @task_name VARCHAR(200), @is_complete BIT) AS
BEGIN
Update tasks 
set task_description=@task_description, task_name=@task_name, is_complete=@is_complete where task_id=@id

END
