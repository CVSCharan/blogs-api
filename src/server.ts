import { app } from "./app";
import { env } from "./config/env.config";
// import { logger } from "./common/logger"; // Assuming logger will be created

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${env.NODE_ENV} mode`);
  // logger.info(`Server running on port ${PORT} in ${env.NODE_ENV} mode`);
});
