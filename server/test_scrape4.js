const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://skillbloomer.com/events/run-for-education', { waitUntil: 'domcontentloaded' });
    const eventDetail = await page.evaluate(() => {
        const text = document.body.innerText;
        return text.substring(0, 3000);
    });
    console.log(eventDetail);
    await browser.close();
})();
