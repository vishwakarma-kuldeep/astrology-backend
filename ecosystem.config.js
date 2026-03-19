module.exports = {
  apps: [
    {
      name: "astrology-backend",
      script: "./index.js",
      instances: "max", // CPU cores ke hisab se automatically scale karega
      exec_mode: "cluster", // Production ke liye cluster mode best hai
      watch: false, // Production mein watch false rakhte hain
      max_memory_restart: "1G", // Agar memory 1GB se upar jaye toh auto-restart
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    },
  ],
};
