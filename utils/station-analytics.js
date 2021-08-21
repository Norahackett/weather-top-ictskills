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

  getReadings(station) {
    let readings = null;
    if (station.readings.length > 0) {
      readings = station.readings[station.readings.length - 1];
    }
    return readings;
  },

  getReadingscode(station) {
    let readings = null;
    if (station.readings.length > 0) {
      readings = station.readings[station.readings.length - 1].code;
    }
    return readings;
  },

  getReadingstemp(station) {
    let readings = null;
    if (station.readings.length > 0) {
      readings = station.readings[station.readings.length - 1].temp;
    }
    return readings;
  },
  getReadingsWinddirection(station) {
    let readings = null;
    if (station.readings.length > 0) {
      readings = station.readings[station.readings.length - 1].winddirection;
    }
    return readings;
  },

  getReadingsWindspeed(station) {
    let readings = null;
    if (station.readings.length > 0) {
      readings = station.readings[station.readings.length - 1].windspeed;
    }
    return readings;
  },

  getWindReadings(station) {
    let readings = null;
    if (station.readings.length > 0) {
      readings = station.readings[station.readings.length - 1].windspeed;
    }
    return readings;
  },

  
  timeTrend (station){
  let readings = 0;
    if (station.readings.length > 2) {
      if  ((station.readings[-1].temp > station.readings[-2].temp ) && (station.readings[-2].temp > station.readings[-1].temp)){ 
        readings = 1;
      } else if (( station.readings[-3].temp < station.readings[-2].temp) && (station.readings[-2].temp< station.readings[-1].temp)) {
        readings = -1;
      }
    }
    return readings;
  },
  
  
  pressureTrend (station){
  let readings = 0;
    if (station.readings.length > 2) {
      if  ((station.readings[2].pressure > station.readings[1].pressure ) && (station.readings[1].pressure > station.readings[0].pressure)){ 
        readings = 1;
      } else if (( station.readings[2].pressure < station.readings[1].pressure) && (station.readings[1].pressure< station.readings[0].pressure)) {
        readings = -1;
      }
    }
    return readings;
  }
};


module.exports = stationAnalytics;
