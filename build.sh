
# set up env vars
TMP=dist/$1.tmp.js
TMP2=$TMP.tmp.js
OUT=dist/$1.js

# clear files that are to be generated
rm -rf $OUT
rm -rf $TMP
rm -rf $TMP2
rm -rf ./dist
mkdir ./dist


# load src
for file in $(find ./src/**\.js -type f);
do  
    echo $file
    cat $file>>$TMP
done

# babel to transpile to es5
npx babel $TMP>>$TMP2

# load header info for TIC80
echo "// title:  game title
// author: game developer
// desc:   short description
// script: js">>$OUT

# format code for easy debugging
# js-beautify $TMP2>>$1
cat $TMP2>>$OUT
# remove temp files
rm -rf $TMP
rm -rf $TMP2

cp src/static/game.tic ./dist/

