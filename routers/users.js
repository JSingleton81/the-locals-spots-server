const express = require("express");
const userController = require("../controllers/users");
const checkJwt = require("../utils/middleware/checkJwt");
const validateUser = require("../utils/middleware/validateUser");
const connection = require("../utils/sql/connection");


const router = express.Router();

router.get("/get-profile", checkJwt, userController.getProfile);
router.get("/revalidate-user", validateUser, userController.revalidateUser);

// New endpoint to fetch total users
router.get('/total-users', userController.getTotalUsers);

// New endpoint to fetch new signups in the last 72 hours
router.get('/new-signups', (req, res) => {
  const sql = `
    SELECT COUNT(*) AS newSignups FROM user
    WHERE created_at >= NOW() - INTERVAL 72 HOUR;
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ newSignups: results[0].newSignups });
  });
});

module.exports = router;


