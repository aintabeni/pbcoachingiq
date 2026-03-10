

## Problem

The booking widget (LeadConnector iframe) shows calendar links (Google, Outlook, iCloud) after booking. Currently:
1. The calendar links take users away from the page (to LeadConnector backend URLs)
2. After booking, users aren't redirected to `/thank-you`

Since the widget is in a **cross-origin iframe**, we cannot directly modify its DOM or intercept its links.

## Solution

Use the GHL redirect setting to load `/thank-you` **inside the iframe** after booking. Since the iframe will then be on **our domain**, the Thank You page can detect it's inside an iframe and tell the parent window to navigate.

### Step 1: ThankYou.tsx — detect iframe and notify parent

Add a `useEffect` at the top of the ThankYou component that checks `window.self !== window.top`. If it's inside an iframe, send a `postMessage` to the parent window and stop rendering the full page (the parent will navigate to `/thank-you` as the top-level page).

### Step 2: TallyEmbed.tsx — listen for the message

Add a `message` event listener in the BookingEmbed component. When it receives the navigation message from the iframe, use `window.location.href = '/thank-you'` to navigate the parent page.

### Step 3: GHL Configuration (user action)

You'll need to set the booking widget's **On Submit → Redirect to URL** to:
`https://pbcoachingiq.lovable.app/thank-you`

This ensures the iframe loads our thank-you page after booking, which triggers the parent navigation.

### About the calendar links

The calendar links (Google Calendar, Outlook, iCloud) open in new tabs (`target="_blank"`), so they'll continue to work — users can click them to add the event to their calendar, and the confirmation page will still redirect to `/thank-you` in the main window. No changes needed for the calendar links themselves.

### Files changed
- `src/pages/ThankYou.tsx` — add iframe detection + postMessage
- `src/components/TallyEmbed.tsx` — add message listener + navigation

