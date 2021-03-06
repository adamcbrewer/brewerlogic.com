/**
 * index.js
 *
 * Auto-loads all gulp tasks within ./tasks
 * Also handles arguments and environment settings which can be
 * accessed throughout each of the tasks.
 *
 */
'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import requireDir from 'require-dir';

requireDir('./tasks', { recurse: true });

// Specify arguments by double-dashing eg:
// --production
// --type=<type>
gulp.args = gutil.env;
