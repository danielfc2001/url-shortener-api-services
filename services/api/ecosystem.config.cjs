module.exports = {
  apps: [
    {
      name: "app",
      script: "./src/app.js",
      watch: ".",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
