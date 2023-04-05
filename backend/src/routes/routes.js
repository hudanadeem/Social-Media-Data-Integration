const express = require("express");
const getHealth = require("../controller/health.controller");
const getRedditPosts = require("../controller/reddit.controller");
const getNewsApiResults = require("../controller/newsapi.controller")

/**
 * Express router is a pluggable app that can be registered to the express application
 * Enables us to create modular routes
 */

// eslint-disable-next-line new-cap
const router = express.Router();

// Just a simple route to test health of the server
router.get("/health", getHealth);

// All routes involving reddit posts
router.get("/posts", getRedditPosts);

// All routes involving newsapi results
router.get("/results", getNewsApiResults);

module.exports = router;
