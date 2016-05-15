function BettingEvent(id) {
    this.id = id;
    this.bookies = [];
}
BettingEvent.prototype.updateData = function(data) {

};

function Bookie() {

}

function Runner() {

}

function Matching() {
    this.events = {};
}
Matching.prototype.updateEventData = function(tabId, data) {
    console.log('Matching.updateEventData', tabId, data);
    var event = this.events[tabId];
    if (!event) {
        event = new BettingEvent(tabId);
        this.events[tabId] = event;
    }
    event.updateData(data);
};