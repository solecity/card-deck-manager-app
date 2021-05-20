// libraries
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// routes
import routes from "./routes/index.js";

// config
import { URI } from "./config/database.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/token", routes.token);
app.use("/users", routes.user);
app.use("/cards", routes.card);
app.use("/collections", routes.collection);

const PORT = process.env.PORT || 5000;

// connect database
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

if (process.env.NODE_ENV === "dev") {
  mongoose.set("debug", true);
}

const db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// build
if (process.env.NODE_ENV === "prod") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
