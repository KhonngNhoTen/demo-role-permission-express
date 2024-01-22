List api:
**Auth:**
- login
- logout
  
**User:**
- list user
- detail user
- update user
- create user
  
**Project:**
- List project
- detail project
- update project
- member of project
- assign member to project
- list task of project

**Task:**
- list tasks
- create tasks
- upadte task
- detail task
- assign task to member
- list task of member


---------------

Role:
User:
  - Auth
  - Task:
    + List task of member
    + Detail task
  - User:
    + List
    + Detail
  - Project:
    + List task
    + Detail task
Leader:
  - User-Role
  - Project:
    + member of project
    + list task of project
  - Task:
    + assign task to member
    + create tasks
    + upadte task
Project manager:
  - Leader-Role
  - Project:
    + Create project
    + Update project
    + assign member to project
Admin:
  - Project manager-Role
  - User:
    + update user
    + create user