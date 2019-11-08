#!/bin/bash

# abort on errors
set -e

# build
npm run build

# The purpose of this script is to do things with files generated by
# 'create-react-app' after 'build' is run.
# 1. Move files to a new directory called 'projects/markdown-editor'
#    The resulting structure is 'build/projects/markdown-editor/static/<etc>'
# 2. Update reference on generated files from
#    static/<etc>
#     to
#    projects/markdown-editor/static/<etc>
#
# More details on: https://github.com/facebook/create-react-app/issues/3824

# Browse into './build/' directory
cd build
# Create './projects/' directory
echo '1/4 Create "projects/markdown-editor" directory'
mkdir projects
mkdir projects/markdown-editor
# Find all files, excluding (through 'grep'):
# - '.',
# - the newly created directory './projects/markdown-editor/'
# - all content for the directory'./static/'
# Move all matches to the directory './projects/markdown-editor/'
echo '2/4 Move relevant files'
find . | grep -Ev '^.$|^.\/projects$|^.\/static\/.+' | xargs -I{} mv -v {} projects/markdown-editor
# Browse into './projects/markdown-editor/' directory
cd projects/markdown-editor
# Done