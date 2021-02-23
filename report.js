var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'report/cucumber_report.json',
        output: 'report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "Challenge by":"Alexander Prada",
            "Implemented on": "NodeJS / Cucumber / Puppeteer",
            "Reprot from": "Cucumber HTML Reporter",
        }
    };

    reporter.generate(options);