const express = require("express");
const mongoose = require("mongoose");
const serviceHandler = require("./routeHandler/serviceHandler");
const userHandler = require("./routeHandler/userHandler");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9krdwpd.mongodb.net/uni_insurance?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);
mongoose
  .connect(url || "mongodb://127.0.0.1:27017/uni_insurance", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log("listening to the app", port));
app.get("/", async (req, res) => res.json({ hello: "test" }));

app.use("/service", serviceHandler);
app.use("/user", userHandler);
