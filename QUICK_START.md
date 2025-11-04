# Quick Start: Deploy to Vercel

## Step 1: Set Environment Variables in Vercel

Go to your Vercel project settings and add:

**Minimum Required:**
```
CORS_ORIGIN = *
```
(Use `*` for testing, or your frontend URL for production)

**Optional but Recommended:**
```
COMMON_RATE_LIMIT_WINDOW_MS = 1000
COMMON_RATE_LIMIT_MAX_REQUESTS = 20
```

## Step 2: Deploy

Push to your Git repository, and Vercel will auto-deploy.

Or use CLI:
```bash
vercel --prod
```

## Step 3: Test Your Deployment

Replace `your-app.vercel.app` with your actual Vercel URL:

### Test URLs:

1. **Health Check**: `https://your-app.vercel.app/health-check`
   - Should return: `{"success":true,"message":"Service is healthy",...}`

2. **API Docs**: `https://your-app.vercel.app/`
   - Shows Swagger UI with all endpoints

3. **Users API**: `https://your-app.vercel.app/users`
   - Should return: `{"success":true,"message":"Users found",...}`

### Using Test Script:

```bash
./test-vercel-deployment.sh https://your-app.vercel.app
```

## Troubleshooting

- **CORS errors?** → Set `CORS_ORIGIN` in Vercel environment variables
- **Environment variable errors?** → Redeploy after setting variables
- **500 errors?** → Check Function logs in Vercel dashboard

## Detailed Guides

- Environment variables: See `VERCEL_ENV_SETUP.md`
- Full deployment guide: See `VERCEL_DEPLOYMENT.md`
