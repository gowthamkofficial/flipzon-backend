const express = require('express')
const app = express()
const { connection } = require("./src/configs/database");
require('dotenv').config()


app.use(express.json());
connection()

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})
