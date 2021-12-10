CREATE OR ALTER PROCEDURE getSingleProject(@id INT) As 
BEGIN
    SELECT *
    FROM dbo.projects
    WHERE project_id=@id
END
GO
