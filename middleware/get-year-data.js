yaml = require('js-yaml');
fs   = require('fs');

const getYearData = (req, res, next) => {
    console.log('Getting a year of data...')
    try {
        const year = yaml.safeLoad(fs.readFileSync('./data/2019.yaml', 'utf8'));
        console.log(year);
    } catch (e) {
        console.log(e);
    }
    next()
}

module.exports = getYearData;