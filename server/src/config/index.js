import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'vanguard_manager_super_secure_dev_jwt_secret_998811',
  sessionSecret: process.env.SESSION_SECRET || 'vanguard_session_secret_772211',
  databaseUrl: process.env.DATABASE_URL
};

export default config;
