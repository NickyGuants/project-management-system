CREATE OR ALTER PROC assignTask(@task_id INT, @user_id INT) AS 
BEGIN
INSERT INTO user_tasks(user_id,task_id) VALUES(@user_id, @task_id)

END
GO
