var request = require('superagent');
var meters = {};

module.exports = function (req, res, next) {
  res.meters = meters;
  next();
})

getMetersEvents();

function getMetersEvents() {
  request('GET', 'https://parking.api.smgov.net/meters/events')
  .end()
  .then( (res) => {
    let events = res.body;
    for(let i=0; i < events.length; ++i) {
      let event = events[i];
      if (meters[event.meter_id] === undefined || 
        meters[event.meter_id].ordinal < event.ordinal) {
        meters[event.meter_id] = {
          event_time: new Date(event.event_time),
          isAvailable: event.event_type === 'SE',
          ordinal: event.ordinal
        };
      }
    }
  })
  .catch( (err) => {
    console.error('Error getting meters/events');
    console.error(err);
  })
  .then( () => {
    setTimeout(getMetersEvents, 5 * 60 * 1000);
  });
}