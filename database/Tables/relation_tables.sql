CREATE TABLE user_tasks (
    user_id INT NOT NULL,
    task_id INT NOT NULL 

    FOREIGN KEY (user_id) REFERENCES dbo.users (id),
    FOREIGN KEY (task_id) REFERENCES dbo.tasks (task_id)
)

CREATE TABLE project_users (
    user_id INT NOT NULL,
    project_id INT NOT NULL UNIQUE

    FOREIGN KEY (user_id) REFERENCES dbo.users (id),
    FOREIGN KEY (project_id) REFERENCES dbo.projects (project_id)
)
