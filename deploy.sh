# hexo deploy
git add .
git commit -m 'update source'
git push origin master:source

hexo generate
cp -R public/* .deploy_git
cd .deploy_git
git push git@github.com:bluesh/blog.git HEAD:gh-pages
# cp -R public/* .deploy_git
# cd public
# git add .
# git commit -m 'update gh-pages'
# git push origin master:gh-pages

