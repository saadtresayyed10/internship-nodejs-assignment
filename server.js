import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/connectToMongo.js";
import servicesRoutes from "./routes/services.route.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = 5000 || process.env.PORT;

app.use("/api/services", servicesRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server running on PORT:", PORT);
});
