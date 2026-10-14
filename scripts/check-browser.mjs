import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { BOOKING_URL } from '../src/booking.js';

const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
});
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await mkdir('screenshots', { recursive: true });

try {
  for (const [width, height] of [[320, 568], [375, 667], [390, 844], [600, 800], [768, 1024], [900, 900], [1280, 800], [1440, 900], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode());
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    const layout = await page.evaluate(() => ({
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      images: [...document.images].map(image => ({ src: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0 })),
      overflow: [...document.querySelectorAll('main *, footer *')]
        .filter(element => {
          if (getComputedStyle(element).display === 'none') return false;
          const rect = element.getBoundingClientRect();
          return rect.width && (rect.right > innerWidth + 1 || rect.left < -1);
        }).map(element => `${element.tagName}.${element.className}`),
    }));
    assert.ok(layout.scrollWidth <= width, `Horizontal page overflow at ${width}px: ${JSON.stringify(layout)}`);
    assert.deepEqual(layout.overflow, [], `Element overflow at ${width}px`);
    const crampedText = await page.locator('.stat-num, .consultancy-offer h3, .hero-content h1, .hero-actions a, .section-title').evaluateAll(elements =>
      elements.filter(element => element.scrollWidth > element.clientWidth + 1).map(element => element.textContent.trim()));
    assert.deepEqual(crampedText, [], `Text should fit its container at ${width}px`);
    assert.ok(layout.images.every(image => image.loaded), `Image failed at ${width}px`);
    assert.equal(await page.locator('main section').count(), 9);
    assert.equal(await page.locator('.consultancy-offer').count(), 3);
    const bookingLinks = await page.locator('a').evaluateAll(elements => elements
      .filter(element => element.href.includes('bookings.cloud.microsoft'))
      .map(element => ({ href: element.getAttribute('href'), target: element.target, rel: element.rel })));
    assert.equal(bookingLinks.length, 6);
    assert.ok(bookingLinks.every(link => link.href === BOOKING_URL && link.target === '_blank' && link.rel.includes('noopener') && link.rel.includes('noreferrer')));
    const hero = await page.locator('#hero').boundingBox();
    assert.ok(hero.y + hero.height < height, `The next section should be visible at ${width}px`);
    if (width <= 900) {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      assert.equal(await page.getByRole('button', { name: 'Close navigation' }).getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page.locator('#navigation-links').getByRole('link', { name: 'Programmes', exact: true }).click();
      assert.equal(await page.locator('#navigation-links').isVisible(), false);
      assert.ok(await page.evaluate(() => location.hash === '#programmes'));
    } else {
      assert.equal(await page.locator('.menu-toggle').isVisible(), false);
      assert.equal(await page.locator('#navigation-links').isVisible(), true);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    if ([320, 390, 768, 1440].includes(width)) {
      await page.screenshot({ path: `screenshots/portfolio-${width}.png`, fullPage: true });
      await page.screenshot({ path: `screenshots/hero-${width}.png` });
      if (width === 1440) await page.locator('#consultancy').screenshot({ path: 'screenshots/consultancy-desktop.png' });
    }
    console.log(`PASS ${width}x${height}: layout, images and navigation`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await context.route(BOOKING_URL, route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Booking destination check</title>' }));
  const popupPromise = page.waitForEvent('popup');
  await page.locator('.hero-actions').getByRole('link', { name: 'Book a call', exact: true }).click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  assert.equal(popup.url(), BOOKING_URL);
  await popup.close();
  await page.locator('.consultancy-offer').first().getByRole('link', { name: 'Discuss this service' }).click();
  assert.equal(await page.getByLabel("I'm interested in").inputValue(), 'Programme design & strategy');
  assert.ok(await page.evaluate(() => Math.abs(document.getElementById('contact').getBoundingClientRect().top) < 160));
  await page.getByRole('button', { name: 'Send Message' }).click();
  assert.equal(await page.locator('.snackbar').count(), 0, 'Invalid form must not open an email draft');
  await page.getByLabel('Your Name', { exact: true }).fill('Mobile Visitor');
  await page.getByLabel('Email Address').fill('visitor@example.com');
  await page.getByLabel("I'm interested in").selectOption('ZION - School Wellbeing Programme');
  await page.getByLabel('Your Message', { exact: true }).fill('Please tell me more about the programme.');
  await page.getByRole('button', { name: 'Send Message' }).click();
  await page.locator('.snackbar').waitFor({ state: 'visible' });
  const draft = await page.getByRole('link', { name: 'Open your email draft' }).getAttribute('href');
  assert.ok(draft.startsWith('mailto:idasagyekum@gmail.com?subject='));
  const decoded = decodeURIComponent(draft);
  assert.ok(decoded.includes('Mobile Visitor') && decoded.includes('visitor@example.com') && decoded.includes('ZION - School Wellbeing Programme') && decoded.includes('Please tell me more'));
  const bounds = await page.locator('.snackbar').boundingBox();
  assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 390 && bounds.y + bounds.height <= 844);
  assert.equal(await page.getByRole('status').innerText(), 'Opening your email app. Send the draft there to complete your enquiry.');
  await page.screenshot({ path: 'screenshots/mobile-snackbar.png' });
  await page.getByRole('button', { name: 'Dismiss notification' }).click();
  assert.equal(await page.locator('.snackbar').count(), 0);

  await page.clock.install();
  await page.getByRole('button', { name: 'Send Message' }).click();
  await page.locator('.snackbar').waitFor({ state: 'visible' });
  await page.clock.fastForward(11000);
  assert.equal(await page.locator('.snackbar').count(), 0, 'Snackbar should dismiss automatically');
  assert.deepEqual(errors, [], 'React runtime errors');
  console.log('PASS mobile contact: validation, email draft, snackbar bounds, announcement, dismissal and timeout');
} finally {
  await browser.close();
}
