# !/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.QAPartCar.com' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:piyanatnine/QAPartCar.git master:gh-pages
cd -