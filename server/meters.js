"use strict";
var request = require('superagent-promise')(require('superagent'), Promise);
var meters = {};

module.exports = function (req, res, next){
  res.meters = meters;
  next();
};

getMetersEvents();

function getMetersEvents(){
	console.log('Getting meter events...');
  request('GET', 'https://parking.api.smgov.net/meters/events')
  .end()
  .then( res => {
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
  .catch( err => {
    console.error('Error getting meters/events');
    console.error(err);
  })
  .then( () => {
  	console.log('Got meters.');
    setTimeout(getMetersEvents, 5 * 60 * 1000);
  });
}