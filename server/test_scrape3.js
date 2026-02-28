const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://skillbloomer.com/events/', { waitUntil: 'domcontentloaded' });
    const events = await page.evaluate(() => {
        const cards = document.querySelectorAll('a[href*="/events/"]');
        const results = {};

        cards.forEach(card => {
            const href = card.getAttribute('href');
            if (!href || href === '/events/' || href === 'https://skillbloomer.com/events/') return;
            const urlParts = href.split('/').filter(Boolean);
            const slug = urlParts[urlParts.length - 1];
            if (!slug || slug === 'events') return;

            const textLines = card.innerText ? card.innerText.split('\n').map(l => l.trim()).filter(Boolean) : [];
            const fullDateLine = textLines.find(line => line.match(/\d{4}/) || line.includes('-') || line.match(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/i));

            let parsedDateShort = 'Upcoming';
            let parsedLoc = 'Online';

            if (textLines.length >= 5) {
                const dateIndex = textLines.findIndex(l => l === fullDateLine);
                if (dateIndex !== -1 && dateIndex + 1 < textLines.length) {
                    parsedLoc = textLines[dateIndex + 1];
                }
                if (dateIndex >= 2) {
                    parsedDateShort = textLines[2] + ' ' + textLines[3];
                }
            }
            results[slug] = { slug, parsedDateShort, fullDateLine, parsedLoc };
        });
        return Object.values(results);
    });
    console.log(JSON.stringify(events, null, 2));
    await browser.close();
})();
