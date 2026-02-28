const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://skillbloomer.com/events/run-for-education', { waitUntil: 'domcontentloaded' });
    const meta = await page.evaluate(() => {
        const divs = Array.from(document.querySelectorAll('div, span, p'));
        return divs.map(d => d.innerText).filter(t => t && t.includes('Event Details'));
    });
    console.log(meta);
    await browser.close();
})();
