CREATE OR ALTER PROC assignProject(@project_id INT, @user_id INT) AS 
BEGIN
INSERT INTO project_users(user_id,project_id) VALUES(@user_id, @project_id)

END
GO
EXEC assignProject 4, 23;

