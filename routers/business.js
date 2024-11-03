const express = require("express")
const connection = require("../utils/sql/connection")
const router = express.Router()

router.get("/business-list",(req, res) => { 
  connection.query("SELECT * FROM business Limit 100", (err, rows) => {
    if (err){
      console.log(err)
    }
    res.json(rows)
  })
})

router.get("/category-list",(req, res) => { 
  connection.query("SELECT * FROM categories", (err, rows) => {
    if (err){
      console.log(err)
    }
    res.json(rows)
  })
})

module.exports = router