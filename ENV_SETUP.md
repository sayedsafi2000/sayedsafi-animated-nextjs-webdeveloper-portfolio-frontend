# 🔒 Environment Variables Setup

## ✅ Backend URL is Now Hidden!

The backend URL is no longer exposed in the client-side code. Instead, Next.js API routes act as a proxy.

## 📋 Required Environment Variables

### Server-Side Only (Not Exposed to Client)

Add this to your `.env.local` file (for local development) and your hosting platform's environment variables (for production):

```bash
# Backend URL (server-side only - NOT exposed to client)
BACKEND_URL=https://backend.sayedsafi.me/api

# OR use API_URL (both work)
# API_URL=https://backend.sayedsafi.me/api
```

**Important:** 
- ❌ Do NOT use `NEXT_PUBLIC_` prefix (that would expose it to the client)
- ✅ Use `BACKEND_URL` or `API_URL` (server-side only)

---

## 🏠 Local Development

Create/update `frontend/.env.local`:

```bash
BACKEND_URL=http://localhost:5000/api
```

---

## 🚀 Production (Vercel/Netlify/etc.)

### Vercel:
1. Go to your project dashboard
2. Settings → Environment Variables
3. Add:
   - **Name:** `BACKEND_URL`
   - **Value:** `https://backend.sayedsafi.me/api`
   - **Environment:** Production, Preview, Development (all)

### Netlify:
1. Site settings → Environment variables
2. Add:
   - **Key:** `BACKEND_URL`
   - **Value:** `https://backend.sayedsafi.me/api`

### Other Platforms:
Add `BACKEND_URL=https://backend.sayedsafi.me/api` to your environment variables.

---

## 🔍 How It Works

1. **Frontend** calls `/api/track/visit` (relative URL - no backend URL exposed)
2. **Next.js API Route** (`app/api/track/visit/route.ts`) receives the request
3. **API Route** reads `BACKEND_URL` from server-side environment variable
4. **API Route** forwards request to backend (server-to-server)
5. **Backend** processes and returns response
6. **API Route** returns response to frontend

**Result:** Backend URL is never exposed to the client! 🎉

---

## ✅ Verification

After setting up:

1. **Check that backend URL is NOT in client bundle:**
   - Build your app: `npm run build`
   - Search for "backend.sayedsafi.me" in `.next` folder
   - Should NOT find it in client-side code

2. **Test tracking:**
   - Visit your website
   - Open DevTools → Network tab
   - Navigate to a page
   - Should see request to `/api/track/visit` (relative URL)
   - Should NOT see any requests to `backend.sayedsafi.me` from client

3. **Check server logs:**
   - API route should successfully proxy to backend
   - No CORS errors (server-to-server communication)

---

## 🐛 Troubleshooting

### If tracking doesn't work:

1. **Check environment variable is set:**
   ```bash
   # In your hosting platform, verify BACKEND_URL is set
   ```

2. **Check API route logs:**
   - Look for errors in server logs
   - API route should log errors if backend is unreachable

3. **Test API route directly:**
   ```bash
   curl -X POST https://sayedsafi.me/api/track/visit \
     -H "Content-Type: application/json" \
     -d '{"page":"test","path":"/test"}'
   ```

4. **Verify backend is accessible:**
   ```bash
   curl https://backend.sayedsafi.me/api/track/test
   ```

---

## 📝 Summary

- ✅ Backend URL is now hidden from client
- ✅ Uses Next.js API routes as proxy
- ✅ Server-side environment variable only
- ✅ No `NEXT_PUBLIC_` prefix needed
- ✅ More secure architecture

