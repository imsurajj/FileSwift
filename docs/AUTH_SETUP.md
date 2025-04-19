# Setting Up Authentication for FileSwift

This guide will help you set up production-ready authentication for FileSwift using NextAuth.js.

## Prerequisites

1. Node.js and npm/yarn installed
2. A GitHub account (for GitHub OAuth)
3. A Google account (for Google OAuth)

## Environment Variables

Copy the `.env.local.example` file to `.env.local` and fill in the following variables:

```
# NextAuth Secret - Used to encrypt cookies and tokens
# Generate a secure random string, at least 32 characters
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000" # For development
# Use your actual domain in production
# NEXTAUTH_URL="https://your-domain.com" 

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Database
DATABASE_URL="file:./prisma/database.db"
```

## Setting Up OAuth Providers

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "New OAuth App"
3. Fill in the application details:
   - Application name: FileSwift (or your custom name)
   - Homepage URL: `http://localhost:3000` (or your production URL)
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github` (for production, use your domain)
4. Click "Register application"
5. Copy the Client ID and generate a new Client Secret
6. Add these values to your `.env.local` file as `GITHUB_ID` and `GITHUB_SECRET`

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the consent screen if prompted
6. For Application Type, select "Web application"
7. Add Authorized JavaScript origins: `http://localhost:3000` (and your production URL)
8. Add Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google` (and your production URL)
9. Click "Create"
10. Copy the Client ID and Client Secret
11. Add these values to your `.env.local` file as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

## Database Setup

The application uses a SQLite database for development. In production, you may want to use a more robust database like PostgreSQL.

To initialize the database:

```bash
npx prisma migrate dev
```

This will create the database and run migrations to set up the required tables.

## Generating a Secure Secret

For `NEXTAUTH_SECRET`, you need a secure random string. You can generate one using:

```bash
openssl rand -base64 32
```

## Running the Application

After setting up all environment variables:

```bash
npm run dev
# or
yarn dev
```

Your application should now have working authentication with email/password, GitHub, and Google login options.

## Production Considerations

For a production deployment:

1. Use a more robust database like PostgreSQL
2. Set up a proper secret management system
3. Configure your production domain in the OAuth provider settings
4. Use HTTPS for all URLs
5. Consider adding more security features like rate limiting and CSRF protection

## Troubleshooting

- If authentication isn't working, check your browser console and server logs for errors
- Verify that your callback URLs are correctly configured in the OAuth provider settings
- Make sure your environment variables are properly set
- Check that your database is properly set up and migrations have been applied 