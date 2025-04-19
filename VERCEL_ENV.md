# Vercel Environment Variables for FileSwift

The following environment variables should be set in your Vercel project settings to ensure proper authentication and database functionality:

## Authentication Variables

```
# Required: Secret for securing auth tokens (generate a strong one with `openssl rand -base64 32`)
NEXTAUTH_SECRET=your_generated_secret_here

# Optional: URL will be set by Vercel automatically
# NEXTAUTH_URL=${VERCEL_URL}

# GitHub OAuth credentials (for social login)
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Google OAuth credentials (for social login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Database Variables

```
# Prisma database URL (Use your production database URL)
DATABASE_URL=your_database_connection_string

# For development use with SQLite: 
# DATABASE_URL="file:./prisma/database.db"

# For production, consider using PostgreSQL:
# DATABASE_URL="postgresql://username:password@host:port/database"
```

## Build Environment Variables

These are automatically set by our configuration, but you may need to adjust them:

```
# Skip database connection during build to avoid issues
SKIP_DB_CONNECT=true

# Disable Prisma schema validation during build
PRISMA_CLIENT_NO_SCHEMA_VALIDATION=true
```

## Application Settings

```
# Set to true to enable authentication in production
ENABLE_AUTH=true

# Support email address shown on the website
SUPPORT_EMAIL=support@yourdomain.com
```

## Setting Up Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with its corresponding value
4. Make sure to toggle "Production" for all variables

Remember to redeploy your application after adding new environment variables. 