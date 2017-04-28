git add .
git commit -m 'update source'
git push origin master:source

hexo generate
cp -R public/* .deploy/blog
cd public
git add .
git commit -m 'update gh-pages' -f
git push origin master:gh-pages
