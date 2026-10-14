# Ida Agyekum Portfolio

React and Vite portfolio for Ida Agyekum, focused on youth development and
mental wellbeing consultancy, signature programmes, coaching and speaking.
Includes the original photographs, client testimonials and scroll reveals.

The consultancy section presents programme design, delivery and partnerships,
and wellbeing advisory and training. Service links preselect the relevant
enquiry option. Engagement scope, timelines and fees are agreed individually.

## Run locally

Requires Node.js 20.19+ in the 20.x series, or Node.js 22.12+.

```sh
npm install
npm run dev
```

Open the URL printed by Vite, normally http://127.0.0.1:5173.

## Production build

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host.

## Browser checks

With Google Chrome installed and the dev server running:

```sh
npm run check:browser
```

Checks nine phone, tablet, and desktop sizes, original image loading, mobile
navigation, form validation, email draft content, and snackbar behavior.
Screenshots are written to `screenshots/`.

## Structure

- `src/components/PortfolioSections.jsx`: original portfolio sections as JSX.
- `src/components/Navigation.jsx`: desktop and mobile navigation.
- `src/components/Contact.jsx`: validated React contact form and email draft.
- `src/components/Snackbar.jsx`: dismissible notification, with a bottom position
  and safe-area spacing on mobile. It closes after 10 seconds and pauses while
  hovered or focused.
- `src/original.css`: styling extracted from the original HTML.
- `src/responsive.css`: layout, accessibility, and mobile adjustments.
- `src/professional.css`: visual refinements and consultancy section styling.
- `public/images/`: original embedded photographs extracted into image files.

The contact form opens an email draft addressed to `idasagyekum@gmail.com`.
It does not send email from a server. The snackbar explains that the draft must
be sent from the visitor's email app; the form also provides a fallback draft link.
Footer icons link directly to email and the podcast.

## Appointment bookings

The header, hero, EZRA programme, call-to-action section, contact section and
footer link to the public Microsoft Bookings page for 20-minute appointments.
Links open in a new tab. Update the shared URL in `src/booking.js` to change
the booking destination. The enquiry form remains available for project briefs.

`scripts/convert-source.mjs` is a one-time migration utility. Re-running it
overwrites `PortfolioSections.jsx`, `original.css`, and extracted images.
