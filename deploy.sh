hexo generate
hexo deploy

git add .
git commit -m 'update source'
git push origin master:source

cd public
git add .
git commit -m 'update gh-pages'
git push origin master:gh-pages -f


