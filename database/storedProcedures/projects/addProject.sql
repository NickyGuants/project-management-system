CREATE OR ALTER PROCEDURE addProject(@project_name VARCHAR(200), @project_description VARCHAR(500), @due_date DATE) as 
BEGIN
INSERT into dbo.projects(project_name, project_description, due_date)
VALUES
(@project_name, @project_description, @due_date)

END
GO
