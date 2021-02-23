const puppeteer = require('puppeteer');
const assert = require('assert');
const { BeforeAll, Given, When, Then, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');

var browser, page;

setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 800
    });
});

Given('I am in the avianca website', async () => {    
    await page.goto('https://www.avianca.com/co/es/', {timeout: 0, waitUntil: 'networkidle2'});
    await page.evaluate("window.scrollBy(0, 100)");
});

When('I select the origin city', async () => {
    await page.evaluate("$('form[data-widget=form-booking-box] input.form-control.pbOrigen.airport.airport_ida[data-name=pbOrigen]')[0].value = ''");
    let txOrigen = await page.$("form[data-widget=form-booking-box] input.form-control.pbOrigen.airport.airport_ida[data-name=pbOrigen]");
    await txOrigen.type("Bogota", {delay: 100});
    await txOrigen.press("ArrowDown");
    await txOrigen.press("Enter");
    await page.waitForTimeout(1 * 1000);
});

When('I select the destination city', async () => {
    let txDestino = await page.$("form[data-widget=form-booking-box] input.form-control.pbDestino.airport.airport_regreso[data-name=pbDestino]");
    await txDestino.type("Miami", {delay: 100});
    await txDestino.press("ArrowDown");
    await txDestino.press("Enter");
    await page.waitForTimeout(1 * 1000);
});

When('I select my departure date', async () => {
    let txDestino = await page.$("form[data-widget=form-booking-box] input.form-control.pbDestino.airport.airport_regreso[data-name=pbDestino]");
    txDestino.press("Tab");
    await page.waitForSelector("form[data-widget=form-booking-box] div.calendar-container.hidden-xs.new-calendar-pos.calendar-home", {visible: true});
    await page.waitForTimeout(1 * 1000);
    await page.click("form[data-widget=form-booking-box] td.cal1 div.number-days td > div.intern-day")[1];
    await page.waitForTimeout(1 * 1000);
});

When('I select my return date', async () => {
    await page.click("form[data-widget=form-booking-box] td.cal2 div.number-days td > div.intern-day")[1];
    await page.waitForTimeout(1 * 1000);
});

When('I click on search for flights', async () => {
    let btSearch = await page.$("form[data-widget=form-booking-box] button[title~=Buscar]");
    btSearch.click();
});

When('I accept the notification pop-up', async () => {
    await page.waitForSelector("div.modal-dialog.modal-lg", {visible: true});
    await page.click("div.modal-dialog.modal-lg button.btn.primary.continue.pull-right");
    await page.waitForNavigation({timeout: 0, waitUntil: 'networkidle2'});
});

When('I click on the menu button', async () => {
    await page.click("div.nav.navbar-nav.menu-hamb > a.menuGlobal");
    await page.waitForSelector("div.container-links-menu-desktop.visible-lg.visible-md", {visible: true});
});

When("Select Horarios de vuelo", async () => {
    await page.click("a[href*='/consulta-itinerarios/']");
    await page.waitForTimeout(5 * 1000); // waitForNavigation no funciona en este paso. Al parecer la página tiene problemas de latencia
});

When("Select origin Bogota", async () => {
    let txOrigen = await page.$("input#origenIter");
    await txOrigen.type("Bogota", {delay: 100});
    await txOrigen.press("ArrowDown");
    await txOrigen.press("Enter");
    await page.waitForTimeout(1 * 1000);
});

When("Select destination Cartagena", async () => {
    let txDestino = await page.$("input#destinoIter");
    await txDestino.type("Cartagena", {delay: 100});
    await txDestino.press("ArrowDown");
    await txDestino.press("Enter");
    await page.waitForTimeout(1 * 1000);
});

When("Select a departure date", async () => {
    await page.click("input#fechaIdaIter");
    await page.waitForTimeout(2 * 1000);
    let fechaIda = await page.$$("div.calendar-container.hidden-xs td.number");
    await fechaIda[1].click();
    await page.waitForTimeout(2 * 1000);
});

When("Select a return date", async () => {
    await page.click("input#fechaRegresoIter");
    await page.waitForTimeout(2 * 1000);
    let fechaRegreso = await page.$$("div.calendar-container.left.hidden-xs td.number");
    await fechaRegreso[5].click();
    await page.waitForTimeout(2 * 1000);
});

When("Click on Search button", async () => {
    await page.click("input[title='Consultar']");
    await page.waitForTimeout(5 * 1000); // waitForNavigation no funciona en este paso. Al parecer la página tiene problemas de latencia
});

Then("I should be able to sort the flights from latest to earliest", async () => {
    let tabs = await browser.pages();
    let newTab = tabs.pop();
    await newTab.click("input[value='Ordenar por Hora de salida']");
    await newTab.waitForTimeout(1 * 1000);
});

Then('I see a list of available flights', async () => {
    await page.waitForSelector("div.step-label.passed.ng-star-inserted", {visible: true});
    let divStpOne = await page.$('div.step-label.passed.ng-star-inserted');
    let stpTitle = await page.evaluate(el => el.textContent, divStpOne);
    assert.strictEqual(stpTitle, " Selección de vuelos ");
});

AfterAll(async () => {
    await page.waitForTimeout(5 * 1000);
    await page.close();
    await browser.close();
});