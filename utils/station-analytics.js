"use strict";

const stationAnalytics = {
  getMaxReading(station) {
    let maxReading = null;
    if (station.readings.length > 0) {
      maxReading = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        maxReading = station.readings[i];
      }
    }
    return maxReading;
  },

  getMinReading(station) {
    let minReading = null;
    if (station.readings.length > 0) {
      minReading = station.readings[0];
      for (let i = 1; i > station.readings.length; i++) {
        minReading = station.readings[i];
      }
    }
    return minReading;
  },

  pressureTrend(station) {
    let readings = 0;
    let a = Number(station.readings[station.readings.length - 3].pressure);
    let b = Number(station.readings[station.readings.length - 2].pressure);
    let c = Number(station.readings[station.readings.length - 1].pressure);
    if (station.readings.length > 2) {
      if (a > b && b > c) {
        readings = -1;
      } else if (a < b && b < c) {
        readings = 1;
      }
    }
    return readings;
  },

  tempTrend(station) {
    let readings = 0;

    let a = Number(station.readings[station.readings.length - 3].temp);
    let b = Number(station.readings[station.readings.length - 2].temp);
    let c = Number(station.readings[station.readings.length - 1].temp);
    if (station.readings.length > 2) {
      if (a > b && b > c) {
        readings = -1;
      } else if (a < b && b < c) {
        readings = 1;
      }
    }
    return readings;
  },

  windTrend(station) {
    let readings = 0;
    let a = Number(station.readings[station.readings.length - 3].windspeed);
    let b = Number(station.readings[station.readings.length - 2].windspeed);
    let c = Number(station.readings[station.readings.length - 1].windspeed);
    if (station.readings.length > 2) {
      if (a > b && b > c) {
        readings = -1;
      } else if (a < b && b < c) {
        readings = 1;
      }
    }
    return readings;
  }
};

module.exports = stationAnalytics;
