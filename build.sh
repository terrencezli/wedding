#!/bin/bash
rm -rf dist/
mkdir dist
mkdir dist/css

html-minifier --input-dir ./public --output-dir ./dist --collapse-whitespace --remove-comments --minify-css --minify-js --file-ext html