const express = require("express");
const connection = require("../utils/sql/connection");
const checkJwt = require("../utils/middleware/checkJwt");
const validateUser = require("../utils/middleware/validateUser");
const router = express.Router();

router.get("/business-list", (req, res) => {
  connection.query("SELECT * FROM business Limit 100", (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  });
});

router.get("/category-list", (req, res) => {
  connection.query("SELECT * FROM categories", (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  });
});

router.post("/add-business", validateUser, (req, res) => {
  console.log(req.user);
  console.log(req.body);
  const { id } = req.user;
  const body = {
    user_id: id,
    ...req.body,
  };
  const sql = "INSERT INTO my_business SET ?";
  connection.query(sql, [body], (err, results) => {
    if (err) {
      console.log(err);
      return res.json();
    }
    res.status(201).json({
      message: "business added",
      business_id: results.insertId,
      data: {
        id: results.insertId,
        user_id: id,
        ...req.body,
      },
    });
  });
});

router.get("/get-business-list", (req, res) => {
  const sql = `
    SELECT mb.id, u.id, u.username, business_name, address, city, state, zip, phone_number, mb.email, description, c.category, facebook, instagram, snapchat, x
    FROM my_business mb
    LEFT JOIN user u
    ON u.id= mb.user_id
    LEFT JOIN categories c
    ON c.id= mb.category;
  `
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.json();
    }
    res.status(200).json(results)
  })
})

router.get("/get-user-business-list", validateUser, (req, res) => {
  const sql = `
    SELECT mb.id, u.id, u.username, business_name, address, city, state, zip, phone_number, mb.email, description, c.category, facebook, instagram, snapchat, x
    FROM my_business mb
    LEFT JOIN user u
    ON u.id= mb.user_id
    LEFT JOIN categories c
    ON c.id= mb.category
    WHERE mb.user_id= ?
  `

  connection.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.json();
    }
    res.status(200).json(results)
  })
})

module.exports = router;
