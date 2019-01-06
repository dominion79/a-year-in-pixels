const createError = require('http-errors');
const yaml = require('js-yaml');
const fs   = require('fs');
const moment = require('moment');
const Rollbar = require("rollbar");

const year = 2019;
const filename = './data/2019.yaml';
const classmap = {
    1: 'very-bad',
    2: 'bad',
    3: 'good',
    4: 'very-good',
    5: 'amazing'
}

const rollbar = new Rollbar({
    accessToken: 'a0fdfec7c9c040ff8fd48c9fbcf15585',
    captureUncaught: true,
    captureUnhandledRejections: true
  });


const getYearData = (req, res, next) => {
    try {
        const yearData = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
        mapRatingsToClasses(yearData.year);
        res.locals.emptyYear = yearData.year;
    } catch (error) {
        rollbar.log(error);
        next(createError(500));
    }
    next()
}

const mapRatingsToClasses = data => {
    Object.keys(data).map(function(item) {
        data[item].class = classmap[data[item].rating]
    });
}

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