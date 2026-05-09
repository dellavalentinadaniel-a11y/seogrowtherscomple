
# Performance & Health Monitoring Setup

## 1. Google Search Console (GSC)
- **Verification**: Use the HTML tag method (add to `index.html` via Helmet) or DNS record.
- **Sitemap**: Submit `https://seogrowthers.com/sitemap.xml`.
- **Review Frequency**: Weekly. Check for "Page Indexing" errors and "Core Web Vitals" report.

## 2. Google Analytics 4 (GA4)
- **Setup**: Create a property for `seogrowthers.com`.
- **Integration**: Add the Measurement ID (G-XXXXXXXX) to `src/main.jsx` or a dedicated analytics component.
- **Goals**: Track form submissions (`/contact`) and affiliate link clicks.

## 3. Uptime Monitoring (Uptime Robot)
- **Service**: [UptimeRobot](https://uptimerobot.com) (Free tier is sufficient).
- **Monitor Type**: HTTP(s).
- **URL**: `https://seogrowthers.com`.
- **Interval**: 5 minutes.
- **Alerts**: Email notification on downtime.

## 4. Performance Monitoring
- **Pingdom / GTmetrix**: Set up monthly automated tests to track page load speed trends.
- **Lighthouse CI**: Optional integration if using GitHub Actions to prevent performance regression on PRs.

## 5. Server & Error Logs
- **Hostinger Access Logs**: Check periodically in hPanel -> Access Logs for suspicious traffic patterns or 403/500 errors.
- **React Error Boundary**: Ensure the app has a `componentDidCatch` or generic Error Boundary to catch runtime UI crashes (already implemented).

## 6. Monthly Checklist
- [ ] Check GSC for new indexing errors.
- [ ] Review organic traffic trends in GA4.
- [ ] Test contact forms to ensure Supabase integration is active.
- [ ] Verify `ads.txt` and `robots.txt` are still accessible.
- [ ] Purge LiteSpeed cache if major content updates occurred.
