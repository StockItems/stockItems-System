import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import toolsRoutes from "./routes/tools.route."

import { sequelize } from "./config/database";

dotenv.config()
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello")
})


app.use("/tools", toolsRoutes)
// app.use("/users", userRoutes);
// app.use("/fireExtinguisher", fireRoutes)
// app.use("/transection",transectionRoutes)

app.listen(process.env.PORT!, async () => {
  await sequelize.sync();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
