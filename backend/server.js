require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("/", (req, res) => {
    res.send("Notes API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
