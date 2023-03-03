const express = require("express");
const getHealth = require("../controller/health.controller");
const {getRedditPosts} = require("../controller/reddit.controller");

/**
 * Express router is a pluggable app that can be registered to the express application
 * Enables us to create modular routes
 */

// eslint-disable-next-line new-cap
const router = express.Router();

// Just a simple route to test health of the server
router.get("/health", getHealth);

// All routes involving tasks
router.get("/tasks", getRedditPosts);

module.exports = router;
