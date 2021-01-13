# nodemongoEduOne

- This .gitignore file is created automatically from git.But need to select "node" in gitignore template.

- Software installations 
    - express,body-parser,mongodb(by default we get MQL- shortcut queries)
    - new software that we need to use is mongoose (same as sequlize.To do migration and maintain
    relationship between model we can use mongoose).
    - Because in node-sql we need to install mysql and sequlize (for shortcut queries).

- node modules
- npm init 
- app.js (entry point)
- migrations :
    - To make any changes into existing db then only create migration.Bydefault in mongodb everything will store without schema.up() in migration is responsible for that. and to rollback down() in migration need to run.
- .env 
    -  Try to access env variables within whole project using dotenv package.
- env.example

- mongoose vs mongodb
    - mongoose is used for migration .If you want to use migration then, mongoose
    - mongoose is db tool used for migrations,schema(model) relationship manage.
    - But mongodb is direct database,but programatically or codewise or folder structure wise     difference I have not seen.
    - 