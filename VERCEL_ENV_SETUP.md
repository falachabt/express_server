# Vercel Environment Variables Setup

## Required Environment Variables

Set these in your Vercel project settings (Project → Settings → Environment Variables):

### 1. NODE_ENV
- **Value**: `production`
- **Description**: Sets the application environment mode
- **Required**: Yes (auto-configured in vercel.json)

### 2. CORS_ORIGIN
- **Value**: Your frontend URL or `*` for development
- **Examples**: 
  - `https://your-frontend-app.vercel.app`
  - `https://yourdomain.com`
  - `*` (allows all origins - use only for testing)
- **Required**: Yes
- **Important**: Without this, your API will reject cross-origin requests

### 3. COMMON_RATE_LIMIT_WINDOW_MS (Optional)
- **Value**: `1000` (recommended)
- **Description**: Time window in milliseconds for rate limiting
- **Required**: No (defaults to 1000 if not set)

### 4. COMMON_RATE_LIMIT_MAX_REQUESTS (Optional)
- **Value**: `20` (recommended)
- **Description**: Maximum number of requests allowed per IP within the time window
- **Required**: No (defaults to 1000 if not set)

## Quick Setup for Testing

For initial testing on Vercel, you can set just this one required variable:

```
CORS_ORIGIN=*
```

This will allow requests from any origin. **Important**: Change this to your actual frontend URL for production!

## Setting Environment Variables in Vercel

### Via Vercel Dashboard:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Variable name: `CORS_ORIGIN`
   - Value: `*` (or your frontend URL)
   - Environment: Select all (Production, Preview, Development)
5. Click **Save**
6. Repeat for optional variables if needed
7. **Redeploy** your application for changes to take effect

### Via Vercel CLI:

```bash
vercel env add CORS_ORIGIN
# Enter the value when prompted: *

# For production only
vercel env add CORS_ORIGIN production
```

## Testing Your Deployment

After setting environment variables and deploying, test these endpoints:

### Health Check
```
GET https://your-app.vercel.app/health-check
```

Expected response:
```json
{
  "success": true,
  "message": "Service is healthy",
  "responseObject": null,
  "statusCode": 200
}
```

### API Documentation (Swagger UI)
```
GET https://your-app.vercel.app/
```

This will show the interactive API documentation.

### Users API Example
```
GET https://your-app.vercel.app/users
```

Expected response:
```json
{
  "success": true,
  "message": "Users found",
  "responseObject": [...],
  "statusCode": 200
}
```

## Common Issues

### Issue: CORS errors
**Solution**: Make sure `CORS_ORIGIN` is set correctly. For testing, set it to `*`. For production, set it to your exact frontend URL.

### Issue: Environment variables not working
**Solution**: After adding environment variables, you must redeploy your application. Go to Deployments → Select latest → Click "..." → Redeploy.

### Issue: "Invalid environment variables" error
**Solution**: Check the Vercel function logs. Go to your deployment → Functions tab to see detailed error messages.
