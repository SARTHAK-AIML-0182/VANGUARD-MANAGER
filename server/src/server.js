import app from './app.js';
import { config } from './config/index.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`[Vanguard Manager API] Listening on port ${PORT} in ${config.nodeEnv} mode`);
  console.log(`[Vanguard Manager API] Health check ready at http://localhost:${PORT}/api/v1/health`);
});
