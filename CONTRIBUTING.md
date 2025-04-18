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

When creating a bug report, please use our issue template and include as many details as possible:

```
Title: [BUG] Short description of the bug

## Description
A clear and detailed description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A description of what you expected to happen.

## Actual Behavior
A description of what actually happened, including any error messages.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome 91, Safari 14]
- FileSwift Version: [e.g. v1.0.0]
- Device: [e.g. Desktop, iPhone X]

## Additional Context
Add any other context about the problem here.
```

### Suggesting Enhancements

For feature requests, please use our feature request template:

```
Title: [FEATURE] Short description of the feature

## Feature Description
A clear and concise description of the feature you'd like to see implemented.

## Problem It Solves
Explain what problem this feature would solve or what benefit it would provide.

## Proposed Solution
If you have ideas about how this could be implemented, share them here.

## Alternative Solutions
Describe any alternative solutions or features you've considered.

## Additional Context
Add any other context, screenshots, or examples about the feature request here.
```

### Pull Requests

For pull requests, please use our pull request template:

```
Title: [PR] Short description of the changes

## Description
A clear and concise description of what changes your PR includes.

## Related Issue
Fixes #[issue_number]

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran to verify your changes.

## Screenshots (if applicable)

## Checklist
- [ ] My code follows the code style of this project
- [ ] I have updated the documentation accordingly
- [ ] I have added tests to cover my changes
- [ ] All new and existing tests passed
```

## Development Setup

To set up the development environment, follow these steps:

```bash
# Clone the repository
git clone https://github.com/imsurajj/FileSwift.git
cd FileSwift

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
FileSwift/
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

- Use conventional commits format: `type(scope): message`
  - Types: feat, fix, docs, style, refactor, test, chore
  - Example: `feat(upload): add drag and drop support`
- Limit the first line to 72 characters or less
- Reference issues in the commit body with `Fixes #123` or `Refs #123`

## Pull Request Process

1. Create a branch with a descriptive name (e.g., `feature/drag-drop-upload` or `fix/upload-error`)
2. Make your changes with clear, descriptive commit messages
3. Update the README.md and documentation if applicable
4. Ensure all tests pass and add new tests for your code
5. Submit a PR against the `main` branch with a clear title and description
6. The PR needs at least one approval from a maintainer
7. Once approved, a maintainer will merge your PR

## Branch Naming Convention

- `feature/short-description` - For new features
- `fix/short-description` - For bug fixes
- `docs/short-description` - For documentation changes
- `refactor/short-description` - For code refactoring
- `test/short-description` - For adding or updating tests

## Release Process

1. The changelog is maintained in the CHANGELOG.md file
2. Releases follow semantic versioning (MAJOR.MINOR.PATCH)
3. Releases are tagged and published through GitHub releases

## Where to Start?

If you're looking for something to work on:
- Check out issues labeled with `good first issue` for newcomers
- Look for `help wanted` tags for tasks that need assistance
- Read through our roadmap to understand future plans

## Questions?

If you have any questions or need help, feel free to:

1. Open an issue with your question
2. Join our discussions in the GitHub Discussions section
3. Contact the project maintainer: [Suraj](https://github.com/imsurajj)

Thank you for contributing to FileSwift! 🚀 