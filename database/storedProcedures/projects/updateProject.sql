CREATE PROCEDURE updateProject(@id INT, @project_name VARCHAR(200), @project_description VARCHAR(500)) AS
BEGIN
UPDATE projects set project_name= @project_name, project_description=@project_description 
WHERE project_id = @id;
END
GO