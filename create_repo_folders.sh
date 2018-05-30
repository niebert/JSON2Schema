#!/bin/sh
echo "(1) DIST: create /dist"
mkdir dist
echo "(2) DOCS: create /docs"
mkdir docs
mkdir docs/css
mkdir docs/db
mkdir docs/fonts
mkdir docs/js
mkdir docs/tpl
mkdir docs/schema
# touch docs/index.html
echo "(3) SRC: create /src"
mkdir src
mkdir src/libs
# touch build.js
# touch update_libs.sh
echo "(4) folder generation DONE"
