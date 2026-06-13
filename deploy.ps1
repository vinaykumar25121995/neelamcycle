# Initialize Git, Commit, and Push
git init
git add .
git commit -m "Initial commit for Neelam Cycle"
git branch -M main
git remote add origin https://github.com/vinaykumar25121995/neelamcycle.git
# We'll use --force just in case the repository already exists and has a README
git push -u origin main --force
