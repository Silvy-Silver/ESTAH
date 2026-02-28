const puppeteer = require('puppeteer');
const cache = require('../utils/cache');

const scrapeEventList = async () => {
    const cacheKey = "events_list";
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        const page = await browser.newPage();
        await page.goto('https://skillbloomer.com/events/', { waitUntil: 'domcontentloaded' });

        // Wait until at least some elements with links to events show up
        await page.waitForSelector('a[href*="/events/"]', { timeout: 15000 }).catch(() => console.log('Timeout waiting for selector'));

        const events = await page.evaluate(() => {
            const cards = document.querySelectorAll('a[href*="/events/"]');
            const results = {};

            cards.forEach(card => {
                const href = card.getAttribute('href');
                if (!href || href === '/events/' || href === 'https://skillbloomer.com/events/') return;

                const urlParts = href.split('/').filter(Boolean);
                const slug = urlParts[urlParts.length - 1];

                // Skip basic navigation links that might also contain /events/
                if (!slug || slug === 'events') return;

                const textLines = card.innerText ? card.innerText.split('\n').map(l => l.trim()).filter(Boolean) : [];

                // Usually textLines looks like: ["22", "MAR", "Sun, 22 Mar - 22 Mar, 2026", "Hyderbad", "Run for Education", "Subtitle"]
                // Let's find the date line which usually contains a year or a dash
                const fullDateLine = textLines.find(line => line.match(/\d{4}/) || line.includes('-') || line.match(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/i));

                // Let's find the location line which should act as the location. Usually it's right before the title or after the date line.
                // It's the short text between date and title, typically textLines[3] if date is textLines[2]
                const titleEl = card.querySelector('h1, h2, h3, h4, .title') || card;
                const imgEl = card.querySelector('img');
                const dateEl = card.querySelector('[class*="date"]') || card.querySelector('div, span');
                const locationEl = card.querySelector('[class*="location"], [class*="venue"]') || card.querySelector('div, span');

                let parsedDate = fullDateLine || (dateEl?.innerText?.trim().substring(0, 30)) || 'Upcoming';
                let parsedLoc = 'Online';
                let parsedDateShort = 'Upcoming';

                if (textLines.length >= 5) {
                    const dateIndex = textLines.findIndex(l => l === fullDateLine);
                    if (dateIndex !== -1 && dateIndex + 1 < textLines.length) {
                        parsedLoc = textLines[dateIndex + 1];
                    }
                    if (dateIndex >= 2) {
                        parsedDateShort = textLines[dateIndex - 2] + ' ' + textLines[dateIndex - 1];
                    } else {
                        parsedDateShort = parsedDate.substring(0, 6);
                    }
                } else if (locationEl && locationEl.innerText) {
                    parsedLoc = locationEl.innerText.trim().substring(0, 30);
                }

                results[slug] = {
                    slug,
                    title: titleEl?.innerText?.trim() || slug.split('-').join(' '),
                    image: imgEl ? imgEl.src : 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60',
                    dateShort: parsedDateShort,
                    longDate: parsedDate.replace(/\n/g, ' '),
                    day: '',
                    location: parsedLoc, // Will be enriched shortly
                    category: 'Event',
                    interested: '50+',
                    time: '10:00 AM - 5:00 PM', // Fallback time
                    ticketsAvailable: true, // Mark tickets true by default
                    bookingUrl: `https://skillbloomer.com/events/${slug}`
                };
            });

            return Object.values(results);
        });

        // Enrich the base events with deep location/time scraped from their individual pages 
        // to satisfy users needing explicit venues (like Gachibowli Stadium) not found on the card surface
        const enrichedEvents = [];
        for (const evt of events) {
            try {
                // We use the existing detail scraper! Wait max 10s per page
                const detail = await module.exports.scrapeEventDetail(evt.slug);
                evt.location = detail.location && detail.location.length > 3 ? detail.location : evt.location;
                evt.time = detail.time && detail.time.length > 2 ? detail.time : evt.time;
            } catch (err) {
                console.error("Failed to enrich event: " + evt.slug, err);
            }
            enrichedEvents.push(evt);
        }

        // If scraping fails completely, return fallback data gracefully
        const finalEvents = enrichedEvents.length > 0 ? enrichedEvents : [
            {
                slug: 'sample-event-1',
                title: 'Annual Fundraiser 2026',
                image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=60',
                dateShort: '15 Mar',
                day: 'Sun',
                location: 'New York City',
                category: 'Community',
                interested: '120+',
                time: '09:00 AM',
                ticketsAvailable: true,
                bookingUrl: 'https://skillbloomer.com/events/sample-event-1'
            },
            {
                slug: 'sample-event-2',
                title: 'Beach Cleanup Drive',
                image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?w=800&auto=format&fit=crop&q=60',
                dateShort: '22 Apr',
                day: 'Wed',
                location: 'Miami Beach',
                category: 'Environment',
                interested: '85+',
                time: '08:00 AM - 1:00 PM',
                ticketsAvailable: false,
                bookingUrl: 'https://skillbloomer.com/events/sample-event-2'
            }
        ];

        cache.set(cacheKey, finalEvents);
        return finalEvents;
    } finally {
        await browser.close().catch(console.error);
    }
};

const scrapeEventDetail = async (slug) => {
    const cacheKey = "event_detail_" + slug;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        const page = await browser.newPage();
        const url = `https://skillbloomer.com/events/${slug}`;
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // We try to wait for h1, but it might not exist or the page might just be slow
        await page.waitForSelector('h1', { timeout: 15000 }).catch(() => console.log('Timeout waiting for h1'));

        const eventDetail = await page.evaluate((slugUrl) => {
            const titleEl = document.querySelector('h1') || document.querySelector('h2');
            const imgEl = document.querySelector('img.wp-post-image') || document.querySelector('.hero img') || document.querySelector('article img') || document.querySelector('img');

            // Extract text from the page elements using regex/keywords since generic themes vary
            const allText = document.body.innerText || '';

            // Look for common date formats or labels
            const lines = allText.split('\n').map(l => l.trim()).filter(Boolean);

            const dateLine = lines.find(l => l.match(/^(?:Date|When):/i));
            const timeLine = lines.find(l => l.match(/^(?:Time|Starts At):/i));
            const venueLine = lines.find(l => l.match(/^(?:Venue|Location):/i));

            const descEl = document.querySelector('.event-description') || document.querySelector('article') || document.querySelector('.content');

            return {
                title: titleEl?.innerText?.trim() || slugUrl.split('/').pop().replace(/-/g, ' ').toUpperCase(),
                image: imgEl ? imgEl.src : 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60',
                date: dateLine ? dateLine.replace(/^(?:Date|When):\s*/i, '').trim() : 'Check website for details',
                time: timeLine ? timeLine.replace(/^(?:Time|Starts At):\s*/i, '').trim() : 'Check website for time',
                location: venueLine ? venueLine.replace(/^(?:Venue|Location):\s*/i, '').trim() : 'Location details on website',
                description: descEl ? descEl.innerText.substring(0, 500) + '...' : 'Join us for this wonderful event. Visit the official page for full details.',
                ticketsAvailable: 'Available via Skillbloomer',
                ticketPrice: 'See Booking Page',
                organizer: {
                    name: 'Skillbloomer Organization',
                    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=60',
                    bio: 'Empowering communities through impactful events.'
                },
                tags: ['Education', 'Community', 'Empowerment'],
                bookingUrl: slugUrl
            };
        }, url);

        cache.set(cacheKey, eventDetail);
        return eventDetail;
    } catch (err) {
        console.error("Scrape detail error:", err);
        return {
            title: slug.replace(/-/g, ' ').toUpperCase(),
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
            date: 'See Website',
            time: 'See Website',
            location: 'Check Event Page',
            description: 'Details for this event could not be fully loaded. Please visit the event page directly to learn more and book your spot.',
            bookingUrl: `https://skillbloomer.com/events/${slug}`
        };
    } finally {
        await browser.close().catch(console.error);
    }
};

module.exports = {
    scrapeEventList,
    scrapeEventDetail
};
