"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const accounts = require("./accounts.js");
const station = require("./station.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const stations = stationStore.getUserStations(loggedInUser.id);
    stations.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1)
    //stations.sort(stations, (name));
    //console.log(stations);

    const viewData = {
      title: "Station Dashboard ",
      stations: stations,
    //  sortStations: sortStations,
    };

    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: []
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
