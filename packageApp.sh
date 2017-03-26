mkdir app
cp -R apis app/
cp -R bin app/
cp -R client/ app/
cp -R models app/
cp -R public app/
cp -R routes app/
cp -R views app/

cp app.js app/
cp package.json app/

cd app
zip -r ../enrich-package.zip *

rm -rf ../app