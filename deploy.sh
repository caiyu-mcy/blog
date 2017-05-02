hexo deploy
git add .
git commit -m 'update source'
git push origin master:source

cd .deploy_git
git push git@github.com:bluesh/blog.git HEAD:gh-pages

# hexo generate
# cp -R public/* .deploy/blog
# cd public
# git add .
# git commit -m 'update gh-pages'
# git push origin master:gh-pages

