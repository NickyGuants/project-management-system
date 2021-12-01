CREATE PROCEDURE addProject(@project_name VARCHAR(200), @project_description VARCHAR(500)) as 
BEGIN
INSERT into dbo.projects(project_name, project_description)
VALUES
(@project_name, @project_description)

END
GO
