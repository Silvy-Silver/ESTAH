const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://skillbloomer.com/events/', { waitUntil: 'domcontentloaded' });
    const eventsHtml = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        const target = links.find(a => a.href && a.href.includes('/events/run-for-education'));
        if (target) {
            return {
                html: target.outerHTML,
                text: target.innerText,
                parentHtml: target.parentElement.outerHTML,
                parentParentHtml: target.parentElement.parentElement.outerHTML
            };
        }
        return null;
    });
    console.log(JSON.stringify(eventsHtml, null, 2));
    await browser.close();
})();
