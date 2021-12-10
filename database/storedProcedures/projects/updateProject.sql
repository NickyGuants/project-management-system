CREATE OR ALTER PROCEDURE updateProject(@id INT, @project_name VARCHAR(200), @project_description VARCHAR(500), @due_date DATE) AS
BEGIN
UPDATE projects set project_name= @project_name, project_description=@project_description, due_date=@due_date 
WHERE project_id = @id;
END
GO