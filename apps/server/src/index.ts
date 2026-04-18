import express from "express";
import cors from "cors";
import { config } from "@/config";

import applicationRoutes from "@/routes/application.routes";

const app = express();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

app.use("/api/v1/applications", applicationRoutes);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
