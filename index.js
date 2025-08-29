const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const FULL_NAME = "ga_hruthik";
const DOB = "08072005";
const EMAIL = "gahruthik2005@gmail.com";
const ROLL_NUMBER = "22BCE9999";
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];
    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    data.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });
    let alphaStr = alphabets.join("");
    let reversed = alphaStr.split("").reverse().join("");
    let concat_string = "";
    for (let i = 0; i < reversed.length; i++) {
      concat_string += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
    }
    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("BFHL API running...");
});

module.exports = app;
