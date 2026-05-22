# Jekyll Portfolio Website

A bilingual (English/Turkish), dark-themed static portfolio website built with Jekyll for embedded/computer engineers.

## Local Development

1. **Install Ruby and build tools**:
   ```bash
   sudo pacman -S ruby base-devel
   ```
2. **Install Bundler**:
   ```bash
   gem install bundler
   # Ensure gem bin directory is in your PATH
   export PATH=$PATH:$(ruby -e 'puts Gem.user_dir')/bin
   ```
3. **Install dependencies**:
   ```bash
   bundle config set --local path 'vendor/bundle'
   bundle install
   ```
4. **Start the local development server**:
   ```bash
   bundle exec jekyll serve
   ```
5. **Open `http://localhost:4000` in your browser.**

## How to Add Content

See `DOCUMENTATION.md` for a complete, step-by-step guide on how to add blog posts, devlogs, projects, and update your personal information.

## Deployment

This site is designed to be hosted on GitHub Pages. Push the `main` branch to your repository and configure GitHub Pages to build from the root of the `main` branch.
