# Deploying to Vercel

This guide explains how to deploy this Express.js application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for local testing)

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your Git repository
5. Vercel will automatically detect the configuration from `vercel.json`
6. Configure environment variables:
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: Your frontend URL (e.g., `https://your-domain.com`)
   - `COMMON_RATE_LIMIT_WINDOW_MS`: `1000` (optional)
   - `COMMON_RATE_LIMIT_MAX_REQUESTS`: `20` (optional)
7. Click "Deploy"

### Method 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from the project directory:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Configuration Files

### vercel.json
- Configures how Vercel builds and routes your application
- Specifies the entry point (`api/index.ts`) for the serverless function
- Sets default environment variables

### api/index.ts
- Entry point for Vercel serverless functions
- Exports the Express app from `src/server.ts`

### .vercelignore
- Specifies files and directories to exclude from deployment
- Similar to `.gitignore` but for Vercel

## Environment Variables

Make sure to set these environment variables in your Vercel project settings:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `production` | Yes |
| `CORS_ORIGIN` | Allowed CORS origin | - | Yes |
| `COMMON_RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | `1000` | No |
| `COMMON_RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `20` | No |

**Note:** `HOST` and `PORT` are not required for Vercel deployment as Vercel automatically handles host binding and port assignment for serverless functions.

## Testing Locally with Vercel CLI

To test your Vercel deployment locally:

```bash
vercel dev
```

This will start a local development server that simulates the Vercel environment.

## Accessing Your Deployed Application

After deployment, your application will be available at:
- Health check: `https://your-app.vercel.app/health-check`
- API documentation: `https://your-app.vercel.app/`
- Users API: `https://your-app.vercel.app/users`

## Troubleshooting

### Build Errors
- Ensure all dependencies are listed in `package.json`
- Check that TypeScript compiles without errors: `pnpm build`

### Runtime Errors
- Check environment variables are properly set in Vercel dashboard
- Review logs in Vercel dashboard under "Deployments" → Select deployment → "Functions"

### CORS Issues
- Make sure `CORS_ORIGIN` environment variable is set correctly
- Update it to match your frontend URL

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Node.js Apps](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
