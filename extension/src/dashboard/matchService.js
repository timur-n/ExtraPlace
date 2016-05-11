function RunnerOdds() {
    this.back = 0;
    this.lay = 0;
}


// Runner class
function Runner(name) {
    this.name = name;
    this.win = new RunnerOdds();
    this.place = new RunnerOdds();
}
Runner.prototype.updateOdds = function(oddsObj, winOdds, placeOdds) {
    if (winOdds) {
        oddsObj.back = winOdds;
    }
    if (placeOdds) {
        oddsObj.back = placeOdds;
    }
};
Runner.prototype.updateBackOdds = function(winOdds, placeOdds) {
    this.updateOdds(this.win, winOdds, placeOdds);
};
Runner.prototype.updateLayOdds = function(winOdds, placeOdds) {
    this.updateOdds(this.place, winOdds, placeOdds);
};


// Data for single bookie
function BookieData(name, bbUtils) {
    this.name = name;
    this.runners = [];
    this.bbUtils = bbUtils;
}
BookieData.prototype.updateOdds = function(name, marketName, odds, isBackOdds) {
    var runner = bbUtils.objByStr(this.runners, 'name', name);
    if (!runner) {
        runner = new Runner(name);
        runner.marketName = marketName;
        this.runners.push(runner);
    }
    var winOdds, placeOdds;
    if (/WIN/i.match(marketName)) {
        winOdds = odds;
    } else if (/PLACE/i.match(marketName)) {
        placeOdds = odds;
    }
    if (isBackOdds) {
        runner.updateBackOdds(winOdds, placeOdds);
    } else {
        runner.updateLayOdds(winOdds, placeOdds);
    }
};
BookieData.prototype.updateBackOdds = function(name, marketName, odds) {
    this.updateOdds(name, marketName, odds, true);
};
BookieData.prototype.updateLayOdds = function(name, marketName, odds) {
    this.updateOdds(name, marketName, odds, false);
};


angular.module('match-service', [BBUtils])
    .factory('matchService', ['bbUtils', function(bbUtils) {
        var data, ms = {
            setBookieData: function(bookieData) {

            },
            setExchangeData: function(exchangeData) {

            },
            getData: function() {
                return data;
            }
        };

        return ms;
    }]);