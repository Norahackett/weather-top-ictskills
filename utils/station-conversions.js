"use strict";

const stationConversions = {
  beafourt(windspeed) {
    if (windspeed == 0) {
      return 0;
    } else if (windspeed >= 1 && windspeed <= 5) {
      return 1;
    } else if (windspeed >= 6 && windspeed <= 11) {
      return 2;
    } else if (windspeed >= 12 && windspeed <= 19) {
      return 3;
    } else if (windspeed >= 20 && windspeed <= 28) {
      return 4;
    } else if (windspeed >= 29 && windspeed <= 38) {
      return 5;
    } else if (windspeed >= 39 && windspeed <= 49) {
      return 6;
    } else if (windspeed >= 50 && windspeed <= 61) {
      return 7;
    } else if (windspeed >= 62 && windspeed <= 74) {
      return 8;
    } else if (windspeed >= 75 && windspeed <= 88) {
      return 9;
    } else if (windspeed >= 89 && windspeed <= 102) {
      return 10;
    } else if (windspeed >= 103 && windspeed <= 117) {
      return 11;
    } else if (windspeed >= 117) {
      return 12;
    }
    return -1;
  },

  degreesToCompass(winddirection) {
    if (winddirection > 11.25 && winddirection <= 33.75) {
      return "North North East";
    } else if (winddirection > 33.75 && winddirection <= 56.25) {
      return "East North East";
    } else if (winddirection > 56.25 && winddirection <= 78.75) {
      return "East";
    } else if (winddirection > 78.75 && winddirection <= 101.25) {
      return "East South East";
    } else if (winddirection > 101.25 && winddirection <= 123.75) {
      return "East South East";
    } else if (winddirection > 123.75 && winddirection <= 146.25) {
      return "South East";
    } else if (winddirection > 146.25 && winddirection <= 168.75) {
      return "South South East";
    } else if (winddirection > 168.75 && winddirection <= 191.25) {
      return "South";
    } else if (winddirection > 191.25 && winddirection <= 213.75) {
      return "South South West";
    } else if (winddirection > 213.75 && winddirection <= 236.25) {
      return "South West";
    } else if (winddirection > 236.25 && winddirection <= 258.75) {
      return "West South West";
    } else if (winddirection > 258.75 && winddirection <= 281.25) {
      return "West";
    } else if (winddirection > 281.25 && winddirection <= 303.75) {
      return "West North West";
    } else if (winddirection > 303.75 && winddirection <= 326.25) {
      return "North West";
    } else if (winddirection > 326.25 && winddirection <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },

  getcodeToText(code) {
    switch (code) {
      case 100:
        return "Clear";
      case 200:
        return "Partial Clouds";
      case 300:
        return "Cloudy";
      case 400:
        return "Light Showers";
      case 500:
        return "Heavy Showers";
      case 600:
        return "Rain";
      case 700:
        return "Snow";
      case 800:
        return "Thunder";
      default:
        return "error";
    }
  },

  weatherCodeIcons(code) {
    switch (code) {
      case 100:
        return "sun icon";
      case 200:
        return "cloud sun icon";
      case 300:
        return "cloud icon";
      case 400:
        return "cloud sun rain icon";
      case 500:
        return "cloud showers heavy icon";
      case 600:
        return "cloud sun rain icon";
      case 700:
        return "snowflake icon";
      case 800:
        return "bolt icon";
    }
  },

  gettempF(temp) {
    return temp * 1.8 + 32;
  },

  getwindChill(temp, windspeed) {
    return (
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(windspeed, 0.16) +
      0.3965 * temp * Math.pow(windspeed, 0.16)
    ).toFixed(2);
  },

  trendCodeIcons(station) {
    switch (station) {
      case 1:
        return "arrow up icon";
      case -1:
        return "arrow down icon";
    }
  }
};

module.exports = stationConversions;
