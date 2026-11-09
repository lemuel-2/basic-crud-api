import "dotenv/config";

import App from "./src/app.js";
import db from "./src/config/init-database.js";
import { productRoutes } from "./src/config/container.js";

const PORT = Number(process.env.PORT) || 3000;

const application = new App(productRoutes);
const server = application.getApp().listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down...`);

  server.close((error) => {
    if (error) {
      console.error("Error closing server", error);
      process.exitCode = 1;
    }

    try {
      db.close();
      console.log("Database connection closed.");
    } catch (databaseError) {
      console.error("Error closing database:", databaseError);
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", () =>  shutdown("SIGINT"))
process.once("SIGTERM", () => shutdown("SIGTERM"))
