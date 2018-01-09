/*

data = {
    event: {name, time},
    bookies: {
        bookie1: {
            ew: {fraction, places},
            runners: {
                runner1: {price},
                runner2: {price},
                ...
            }
        },
        bookie2: {...}
    }
}
*
* */


/**
 * Normalises price in Fractional or Decimal format to a decimal number with.
 * @param  {string|float} price Price from bookie, can be in Fractional or Decimal form
 * @return {float} Normalised price, float with 2 decimal places
 */
function normalizePrice(price) {
    var parts = ('' + price).split('/');
    var newPrice;
    if (parts.length === 2) {
        newPrice = (((+parts[0]) + (+parts[1])) / parts[1]);
    } else {
        newPrice = (1.0 * price);
    }
    return Math.round(newPrice * 100) / 100;
}



/**
 * Object describing an event like football match or horse race.
 * @constructor
 * @property {Object} event Event description
 * @property {Object} bookies Bookies price data
 * @param  {string} id Event unique id
 * @return {type}
 */
function BettingEvent(id) {
    this.id = id;
    this.event = {};
    this.bookies = {};
}


/**
 * Update bookies price data with data received from scrapers
 * @param {Object} data New bookies price data
 */
BettingEvent.prototype.updateData = function(data) {
    if (data.bookies) {
        var bookieKey;
        for (bookieKey in data.bookies) {
            if (data.bookies.hasOwnProperty(bookieKey)) {
                var bookie = this.bookies[bookieKey];
                if (!bookie) {
                    bookie = new Bookie(bookieKey);
                    this.bookies[bookieKey] = bookie;
                }
                bookie.updateData(data.bookies[bookieKey]);
            }
        }
    }
};


function Bookie(name) {
    this.name = name;
    this.runners = {};
    this.ew = {};
}

Bookie.prototype.updateData = function(data) {
    if (data.ew) {
        this.ew.fraction = data.ew.fraction || 100;
        this.ew.places = data.ew.places || 1;
    }
    if (data.runners) {
        var runnerKey;
        for (runnerKey in data.runners) {
            if (data.runners.hasOwnProperty(runnerKey)) {
                var runner = this.runners[runnerKey];
                if (!runner) {
                    runner = new Runner(runnerKey);
                    this.runners[runnerKey] = runner;
                }
                runner.updateData(data.runners[runnerKey]);
            }
        }
    }
};


function Runner(name) {
    this.name = name;
    this.price = 0;
    this.place = {price: 0};
}

Runner.prototype.updateData = function(data, ew){
    this.price = data.price || 0;
    this.place.price = ew && ((normalizePrice(this.price) * 1.0 - 1) / ew.fraction + 1);
};


function Matching() {
    this.events = {};
}

Matching.prototype.updateEventData = function(tabId, data) {
    // console.log('Matching.updateEventData', tabId, data);
    var id = '' + tabId;
    var event = this.events[id];
    if (!event) {
        event = new BettingEvent(id);
        this.events[id] = event;
    }
    event.updateData(data);
};
