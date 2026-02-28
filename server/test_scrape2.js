const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://skillbloomer.com/events/', { waitUntil: 'domcontentloaded' });
    const eventsHtml = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('div'));
        const target = links.find(div => div.innerText && div.innerText.includes('Run for Education'));
        if (target) {
            return {
                text: target.innerText,
                html: target.innerHTML.substring(0, 1000)
            };
        }
        return null;
    });
    console.log(JSON.stringify(eventsHtml, null, 2));
    await browser.close();
})();
