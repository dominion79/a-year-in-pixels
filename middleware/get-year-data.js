const yaml = require('js-yaml');
const fs   = require('fs');
const moment = require('moment');
const Rollbar = require("rollbar");
const year = 2019;

const rollbar = new Rollbar({
    accessToken: 'a0fdfec7c9c040ff8fd48c9fbcf15585',
    captureUncaught: true,
    captureUnhandledRejections: true
  });


const getYearData = (req, res, next) => {
    console.log('Getting a year of data...');
    try {
        const daysInAYear = getNumberOfDaysInAYear(year);
        const emptyYear = buildEmptyYear(daysInAYear, year);
        const dataYear = getYearDataFromYaml();
        rollbar.log(dataYear);
        res.locals.emptyYear = emptyYear;
    } catch (e) {
        rollbar.log(e);
    }
    next()
}

const getYearDataFromYaml = () => yaml.safeLoad(fs.readFileSync('./data/2019.yaml', 'utf8'));

const buildEmptyYear = (daysInAYear, year) => {
    return [...Array(daysInAYear).keys()].map(function (day) {
        return {
            id: day,
            date: moment(`01/01/${year}`, 'DD/MM/YYYY', true).add(day, 'days').format('DD-MM-YYYY'),
            rating: 0,
            note: ''
        }
    });
}

const getNumberOfDaysInAYear = year => moment([year]).isLeapYear() ? 366 : 365;

module.exports = {
    getYearData,
    getNumberOfDaysInAYear,
    buildEmptyYear,
};