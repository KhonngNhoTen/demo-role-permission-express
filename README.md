Demo project task manager. 
In demo, there are entities:
- Tasks
- Projects 
- Users
- Managers


This followed diagrams is discribes database in systems:

[TASK]<-(n.n)--------------(n,n)->[USERS]
  |                                  |  
 (1,1)                             (1,1)
  |                                  |   
  |                                  |
  |                                  |
 (1,n)                              (1,n)
  |                                  |
[PROJECT]                        [MANAGER]



List urls:
- List user 
- Create user
- Update user
- Delete User
- Set User to Manager


- List Project
- Create project
- Update project
- remove project
- Assign User to Project

- List task in project
- Update task
- Delete task
- Assign user to task

- Health check
- Ping

- Login 
- Logout 
  
