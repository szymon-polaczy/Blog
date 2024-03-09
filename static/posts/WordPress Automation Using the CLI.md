# WordPress Automation Using the CLI

Automate your tasks away - Do the easy tasks and the complex ones without leaving your beloved terminal.

-----

## Databases 

### Sync your database with production

Let's start with something obvious, keeping our project in sync with the production environment.

Here's how we can do that

```bash
# export the production database via ssh & download the file
wp db export "prod.sql"

# export your local environment in case you mess something up
wp db export "backup.sql"

# reset your local database
wp db reset --yes

# import the file from production
wp db import "prod.sql"

# check the status
wp db check
```

### Never forget to do the easy stuff - Database Optimization

WP-CLI has an in built option to optimize the database without you having to lift a finger

```bash
wp db optimize #it runs mysqlcheck --optimize=true so you could also do that but it's less typing this way
```

### PHPMyAdmin Sucks for big databases

If you need to find a string in your database and connecting to it in phpmyadmin takes ages, try using the CLI.
All options for this command can be found here but here are the most usefull ones

```bash
wp db search "string" --network --all-tables #search for the string everywhere
wp db search "string" --network --all-tables --regex #search for the string everywhere even inside other strings
```
