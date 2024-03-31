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

### Translate your changes

If you ever added some new changes to the site that used .po files for translations, learn from my mistakes and create new POT files automatically.

```bash
# create a new updated .pot file
wp i18n make-pot . languages/my-theme.pot #the dot is the source directory so remember to be in the right place
wp i18n make-pot . languages/my-theme.pot --slug="my-theme" #if you want to specify the slug

# update PO files using the new POT file
wp i18n update-po languages/my-theme.pot languages/my-theme-en_US.po #the first file is the source and the second is the target
```

### Don't like bash files?

Bash is really simple but not always easy to understand or get just right but you're already a PHP wizard, write a PHP script that does the same thing and make wp-cli execute it for you

```bash
wp eval-file my-amazing-script.php
wp eval-file my-amazing-script.php --skip-wordpress #if you don't want WordPress slowing you down or getting in your way
```

### Completion sake

This list will keep growing whenever I find something interesting or usefull to add to it.
There already exists a documentation for this so if you want the full list of commands, check it out [here](https://developer.wordpress.org/cli/commands/)
