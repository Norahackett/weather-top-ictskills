"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const stationConversions = require("../utils/station-conversions");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = " + stationId);
    const station = stationStore.getStation(stationId);
    const lastestReading = stationAnalytics.getReadings(station);
    const lastestTemp = stationAnalytics.getReadingstemp(station);
    const lastestCode = stationAnalytics.getReadingscode(station);
    const lastestWindSpeed = stationAnalytics.getReadingsWindspeed(station);
    const lastestWindDirection = stationAnalytics.getReadingsWinddirection(
      station
    );
    const lastestWind = stationConversions.beafourt(Number(lastestReading));
    //const calcTrend = stationAnalytics.calcTrend(station);
    const tempTrend = stationAnalytics.timeTrend(station);
    const pressureTrend = stationAnalytics.pressureTrend(station);
    //const Trend= stationAnalytics.calcTrend(station);
    const tempTrendIcons = stationConversions.trendCodeIcons(station);

    const viewData = {
      name: "Station",
      station: station,
      stationSummary: {
        maxReading: stationAnalytics.getMaxReading(station),
        minReading: stationAnalytics.getMinReading(station),
        lastestReading: lastestReading,
        weatherCode: stationConversions.getcodeToText(Number(lastestCode)),
        beafourt: lastestWind,
        winddirectionCompass: stationConversions.degreesToCompass(
          Number(lastestWindDirection)
        ),
        tempF: stationConversions.gettempF(Number(lastestTemp)),
        weatherCodeIcons: stationConversions.weatherCodeIcons(
          Number(lastestCode)
        ),
        windChill: stationConversions.getwindChill(
          lastestTemp,
          lastestWindSpeed
        ),
        tempTrendIcons: stationConversions.trendCodeIcons(tempTrend),
        tempTrend: tempTrend,
        pressureTrend:  pressureTrend
      }
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const today = new Date();
    const newReading = {
      id: uuid.v1(),
      date:
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        (today.getHours() + 1) +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds(),
      code: request.body.code,
      temp: request.body.temp,
      windspeed: request.body.windspeed,
      winddirection: request.body.winddirection,
      pressure: request.body.pressure
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
