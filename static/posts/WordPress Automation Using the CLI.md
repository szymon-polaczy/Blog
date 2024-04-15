# WordPress Automation Using the CLI

Automate your tasks away - Do the easy tasks and the complex ones without leaving your beloved terminal.

-----

## Why would you use WP-CLI

It doesn't have the same restrictions as the website and the phpmyadmin. The memory and time restrictions don't apply to the CLI which allows you 
to run some bigger commands or automations like creating a user on 30 sites when you hire someone new.

-----

### Get some help

Remember that you don't have to always remember all of the commands or their specific option as the ```bash wp help``` command is there to help. 
If you want to do something and you can't remember or don't know if it's possible, start with this command as it will show you the options you have.

### Issues on the site?

Add the ```bash --skip-plugins --skip-themes``` options to any commands you run to make sure that the plugins and any active themes don't run and ruin your time.
This should allow you to deactivate a plugin that's throwing a fatal error or update the core when you have an issue in your theme.

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

# replace the domains
wp search-replace "https://production.com" "http://localhost:8888" --all-tables --network --verbose
```

**Make sure to flush the permalink structure just to be sure**

```bash
wp rewrite flush
```

### Never forget to do the easy stuff - Database Optimization

WP-CLI has an in built option to optimize the database without you having to lift a finger

```bash
wp db optimize #it runs mysqlcheck --optimize=true so you could also do that but it's less typing this way
```

### Regenerate Thumbnails is now obsolete

The core now has the option to regenerate thumbnails using the cli

```bash
wp media regenerate --yes #avoid confirmation
wp media regenerate --skip-delete #by the default it will remove the original thumbnails
wp media regenerate --only-missing #the same option as the plugin had to regenerate only the missing sizes
```

### PHPMyAdmin Sucks for big databases

If you need to find a string in your database and connecting to it in phpmyadmin takes ages, try using the CLI.
These are just the most usefull options so if you want more look through the [documentation][https://developer.wordpress.org/cli/commands/db/search/]

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

If you want to test out some code first before writing a full script you can use ```bash wp shell``` command to run and test PHP code.

### Remember to make your backups work

Remove any user interactions from the site and kick them off to make sure they don't screw with your backups.

```bash
wp maintenance-mode activate #deactivate to let them back in
```

### Cut your clients options

You don't want him to mess with the site while you're working on it

```php
# add these to wp-config.php
define('DISALLOW_FILE_MODS',true); #make sure they can't update anything

# also make sure WordPress doesn't take his place
define( 'AUTOMATIC_UPDATER_DISABLED', true );
define( 'WP_AUTO_UPDATE_CORE', false );

# these go into functions.php for a bit of overkill
add_filter( 'plugins_auto_update_enabled', '__return_false' );
add_filter( 'themes_auto_update_enabled', '__return_false' );
```

Now you can ssh into your site and manage the plugins, themes and core updates yourself without anyone being able to change things from the dashboard.

```bash
# manage plugins
wp plugin install hello --activate
wp plugin update --all #--dry-run if you want to preview which plugins will be updated

# manage core
wp core update
wp core update-db

# manage the themes
wp theme install twentysixteen --activate #go back to the year it all went wrong
wp theme activate twentysixteen
wp theme update --all
```

### Completion sake

This list will keep growing whenever I find something interesting or usefull to add to it.
There already exists a documentation for this so if you want the full list of commands, check it out [here](https://developer.wordpress.org/cli/commands/)
