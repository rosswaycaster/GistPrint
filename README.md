# GistPrint

GistPrint is a clean, distraction-free tool designed to pretty-print Markdown content from GitHub Gists.

## Why this was created

This tool was built specifically to solve the problem of printing technical documentation and notes from GitHub Gists. While Gists are excellent for sharing code and markdown, the default GitHub web interface includes headers, sidebars, and navigation elements that clutter the page when printed. 

GistPrint strips away the noise, focusing entirely on the content, making it perfect for:
- Creating physical archives of code snippets.
- Reading documentation offline.
- Saving clean, professional-looking PDFs of your markdown notes.

## Features

- **Distraction-Free Reading**: Removes all browser and GitHub UI clutter.
- **Print-Optimized**: Custom CSS `@media print` rules ensure that margins, fonts, and spacing are optimized for paper and PDF export.
- **Syntax Highlighting**: Includes beautiful, GitHub-style syntax highlighting for code blocks (JavaScript, TypeScript, HTML, CSS, JSON, etc.) via `rehype-highlight`.
- **Markdown Support**: Full support for GitHub Flavored Markdown (GFM) including tables, lists, and task lists.
- **Fast & Responsive**: Built with React and Tailwind CSS for immediate feedback and a great mobile experience.

## Usage

1. **Copy URL**: Copy the URL of any public GitHub Gist (e.g., `https://gist.github.com/username/12345...`).
2. **Paste**: Paste it into the input field on GistPrint.
3. **Load**: Click "Load" to fetch and render the content.
4. **Print**: Click the "Print" button. Your browser's print dialog will open with a clean version of the document ready for printing or saving as PDF.

## Tech Stack

- **React 19**: Modern UI library.
- **TypeScript**: For type-safe code.
- **Tailwind CSS + Typography**: For beautiful, prose-optimized styling.
- **React Markdown**: To render the Gist content securely.
- **Rehype Highlight**: For server-side compatible syntax highlighting.
- **GitHub API**: To fetch public Gist data.
