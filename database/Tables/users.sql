
CREATE TABLE [dbo].[users](
	[id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[username] [varchar](200) NOT NULL,
    [name] VARCHAR (200) NOT NULL,
    [email] [varchar](200) NOT NULL,
	[password] [varchar](200) NOT NULL
)


