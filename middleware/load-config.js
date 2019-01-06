const createError = require('http-errors');
const yaml = require('js-yaml');
const fs   = require('fs');
const Rollbar = require("rollbar");

const rollbar = new Rollbar({
    accessToken: 'a0fdfec7c9c040ff8fd48c9fbcf15585',
    captureUncaught: true,
    captureUnhandledRejections: true
  });


const loadConfig = (req, res, next) => {
    try {
        const config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));
        res.locals.config = config;
    } catch (error) {
        rollbar.log(error);
        next(createError(500));
    }
    next()
}

module.exports = {
    loadConfig,
};