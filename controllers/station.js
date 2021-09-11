"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const stationConversions = require("../utils/station-conversions");
const uuid = require("uuid");
const axios = require("axios");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = " + stationId);
    let lastReading;
    let tempF;
    let lastestWind;
    let windChill;
    let winddirectionCompass;
    let weatherCode;
    let weatherCodeIcons;
    let tempTrend;
    let pressureTrend;
    let windTrend;

    const station = stationStore.getStation(stationId);
    if (station.readings.length > 0) {
      lastReading = station.readings[station.readings.length - 1];
      tempF = stationConversions.gettempF(Number(lastReading.temp));
      lastestWind = stationConversions.beafourt(Number(lastReading));
      windChill = stationConversions.getwindChill(
        lastReading.temp,
        lastReading.windspeed
      );
      weatherCode = stationConversions.getcodeToText(Number(lastReading.code));
      weatherCodeIcons = stationConversions.weatherCodeIcons(
        Number(lastReading.code)
      );
      winddirectionCompass = stationConversions.degreesToCompass(
        Number(lastReading.winddirection)
      );
    }
    if (station.readings.length > 2) {
      tempTrend = stationAnalytics.tempTrend(station);
      pressureTrend = stationAnalytics.pressureTrend(station);
      windTrend = stationAnalytics.windTrend(station);
    }
    const trendCodeIcons = stationConversions.trendCodeIcons;

    const viewData = {
      title: "station",
      station: station,
      lastReading: lastReading,
      tempF: tempF,
      beafourt: lastestWind,
      maxReading: stationAnalytics.getMaxReading(station),
      minReading: stationAnalytics.getMinReading(station),
      windChill: windChill,
      winddirectionCompass: winddirectionCompass,
      weatherCode: weatherCode,
      weatherCodeIcons: weatherCodeIcons,
      tempTrend: trendCodeIcons(Number(tempTrend)),
      tempTrends: tempTrend,
      pressureTrend: trendCodeIcons(Number(pressureTrend)),
      windTrend: trendCodeIcons(Number(windTrend))
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
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windspeed: Number(request.body.windspeed),
      winddirection: Number(request.body.winddirection),
      pressure: Number(request.body.pressure)
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
