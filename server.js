import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/connectToMongo.js";
import servicesRoutes from "./routes/services.route.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/services", servicesRoutes);

app.listen(8080, () => {
  connectToMongoDB();
  console.log("Server running");
});
