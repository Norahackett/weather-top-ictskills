"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");

const reading = {
  index(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Reading",
      station: stationStore.getStation(stationId),
      reading: stationStore.getReading(stationId, readingId)
    };
    response.render("reading", viewData);
  },

  update(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    const reading = stationStore.getReading(stationId, readingId);
    const newReading = {
      code: request.body.code,
      temp: request.body.temp,
      windspeed: request.body.windspeed,
      winddirection: request.body.winddirection,
      pressure: request.body.pressure
    };
    logger.debug(`Updating Reading ${readingId} from Station ${stationId}`);
    stationStore.updateReading(reading, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = reading;
