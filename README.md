# [brewerlogic.com](http://brewerlogic.com)

Web development portfolio of [Adam Brewer](http://adamcbrewer.com).

## Getting Started

Firstly, run the following:

```
$ chmod +x ./init.sh ./update-submodules.sh ./update-permissions.sh
$ ./init.sh
$ ./update-submodules.sh
$ ./update-permissions.sh
```

This should install all the required files (npm & bower) and copy any initial bower dependencies to get you started. 

Additionally, the `update-submodules.sh` and `update-permissions.sh` scripts are run as well to make sure you have everything CMS related and to set the correct file permissions to use the CMS.

You'll also want to grab a copy of `app/content/` from wherever they're edited – ask someone for the latest files.

## Gulp / Tasks

All the gulp tasks are imported as separate files which are organised within `/gulp/tasks/`. I based the setup on [gulp-starter](https://github.com/greypants/gulp-starter).

All task configuration options can be updated within `/gulp/config.js`.

Below are some familiar tasks for developing and building, but for more detail please have a look through the tasks themselves.

### `$ gulp`

Default task for building and watching development files for any changes made.

### `$ gulp sass`

Creates Autoprefixed stylesheets with source maps. Also creates a stats file in JSON format.

### `$ gulp js`

Uses Browserify and Babel(ify) to bundle all javascript files, which can be written in ES6 if you wish.

### `$ gulp images[:build|:vector|:raster]`

Image optimisation for rasters (jpg, png, gif) and vectors. 

Run on it's own will only copy the images to the build directory. Adding either the `[:raster]` or `[:vector]` flags will optimise just those files, whereas the `[:build]` flag will optimise everything.

### `$ gulp clean[:assets|:bower]`

Empty the relevant directories. `[:assets]` will remove all build assets.

### `$ gulp bower`

Any third-party or vendor files installed via Bower and added to the `/gulp/config.js` file will be copied to the specified location shown in the config settings.

### `$ gulp modernizr`

Generates and uglifies a new Modernizr build based on the files it's specified to scan and the forced options within the config settings.

### `$ gulp bump`

Bump, commit and tag the `package.json` version. The following arguments are supported:

```bash
$ gulp bump --patch # 0.0.X (default)
$ gulp bump --minor # 0.X.0
$ gulp bump --major # X.0.0
$ gulp bump --version=1.2.3
```

### `$ gulp build`

Empties and creates new, production-ready build files.
