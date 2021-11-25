CREATE TABLE [dbo].[projects](
	[project_id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[project_name] [varchar](200) NOT NULL,
    [project_description] VARCHAR (500),

);