# Contributing to FileSwift

Thank you for considering contributing to FileSwift! This document outlines the process for contributing to the project and helps to make the development process smooth for everyone involved.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

- Be respectful and inclusive
- Exercise consideration and empathy
- Focus on what is best for the community
- Gracefully accept constructive criticism

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue tracker to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

When you are creating a bug report, please include as many details as possible:

1. **Use a clear and descriptive title**
2. **Describe the exact steps to reproduce the bug**
3. **Provide specific examples**
4. **Describe the behavior you observed and what you expected to see**
5. **Include screenshots if possible**
6. **Include details about your configuration and environment**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please provide:

1. **Use a clear and descriptive title**
2. **Provide a step-by-step description of the suggested enhancement**
3. **Explain why this enhancement would be useful to most FileSwift users**
4. **List some other applications where this enhancement exists, if applicable**

### Pull Requests

1. **Fork the repository**
2. **Clone your fork locally**
3. **Create a new branch for your feature or bugfix**
4. **Make your changes**
5. **Run tests to ensure your changes don't break existing functionality**
6. **Commit your changes with clear, descriptive commit messages**
7. **Push your branch to your fork on GitHub**
8. **Open a pull request against the `main` branch**

## Development Setup

To set up the development environment, follow these steps:

```bash
# Clone the repository
git clone https://github.com/yourusername/fileswift.git
cd fileswift

# Install dependencies
npm install

# Create a .env.local file
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local

# Start the development server
npm run dev
```

### Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` to check your code before submitting a PR
- Follow the TypeScript code style already present in the project

## Project Structure

```
fileswift/
├── public/           # Static assets
├── src/
│   ├── app/          # Next.js app directory
│   │   ├── api/      # API endpoints
│   │   ├── components/  # Reusable UI components
│   │   ├── download/ # File download routes
│   │   ├── upload/   # File upload routes
│   │   ├── help/     # Help documentation
│   │   └── changelog/ # Version changelog
│   └── utils/        # Utility functions
├── .env.local        # Environment variables
└── package.json      # Project dependencies
```

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG.md with details of changes
3. The PR needs to be approved by at least one reviewer
4. Once approved, the PR will be merged by a maintainer

## Release Process

1. The changelog is maintained in the CHANGELOG.md file
2. Releases are tagged and published through GitHub releases

## Where to Start?

If you're looking for something to work on, check out the issues labeled with "good first issue" which are perfect for newcomers.

## Questions?

If you have any questions or need help, feel free to:

1. Open an issue with your question
2. Contact the project maintainers
3. Ask questions in the discussions section

Thank you for contributing to FileSwift! 🚀 