/**
 * Controller to handle GET /health which tests if the server is running.
 * @param {*} req the request body from the client
 * @param {*} res the response body that will be sent to the client
 * @see routes/routes.js#getHealth
 */
function getHealth(req, res) {
  res.json({health: 'I am a healthy server!'});
}

module.exports = getHealth;
