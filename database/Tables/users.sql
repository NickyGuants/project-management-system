CREATE TABLE [dbo].[users]
(
	[id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[username] [varchar](200) NOT NULL,
	[name] VARCHAR (200) NOT NULL,
	[email] [varchar](200) NOT NULL UNIQUE,
	[password] [varchar](200) NOT NULL,
	[is_deleted] BIT DEFAULT 0,
	[is_admin] BIT DEFAULT 0
)

