CREATE TABLE [dbo].[tasks]
(
    [task_id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
    [task_name] [varchar](200) NOT NULL,
    [task_description] VARCHAR (500),
    [is_complete] [BIT] NOT NULL DEFAULT 0,
    [project_id] INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES dbo.projects (project_id),
);
