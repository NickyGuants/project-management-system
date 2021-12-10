CREATE OR ALTER PROCEDURE deleteProject(@id INT) AS
BEGIN
DELETE FROM projects WHERE project_id=@id
END
GO