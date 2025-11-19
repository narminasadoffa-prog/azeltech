module.exports = {
  apps: [
    {
      name: 'azeltech-backend',
      script: './server/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        DATABASE_URL: 'postgresql://azeltech_db:5Fx25jp6Xp5z4ckORjwNxKRH@127.0.0.1:5432/azeltech_midiya',
        JWT_SECRET: 'change-this-to-a-secure-random-string',
        FRONTEND_URL: 'https://azeltech.midiya.az'
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};

