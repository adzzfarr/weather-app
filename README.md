- Install dependencies using 'npm install' in the project directory
- App can be run in development mode using 'npm run dev'
- Can run ESLint to check for errors using 'npm run lint'
- Can format all source code using 'npm run format'

To deploy the app:

1. Make a new branch to deploy from by running 'git branch gh-pages'. You only need to do this the first time you deploy. The rest of the steps should be done every time you deploy or redeploy your project.
2. Make sure you have all your work committed. You can use 'git status' to see if there’s anything that needs committing.
3. Run 'git checkout gh-pages && git merge main --no-edit' to change branch and sync your changes from main so that you’re ready to deploy.
4. Bundle the application into dist with 'npm run build'
5. Run each of these in order:

- 'git add dist -f && git commit -m "Deployment commit"'
- 'npm run deploy'
- 'git checkout main'

6. Change the source branch for GitHub Pages to the gh-pages branch set in your repository’s settings.
