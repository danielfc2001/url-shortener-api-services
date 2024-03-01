module.exports = {
  apps: [
    {
      name: "api",
      script: "./services/api/src/app.js",
      watch: ".",
    },
    {
      name: "microservice_1",
      script: "./services/microservice_1/src/app.js",
      watch: ".",
    },

    {
      name: "microservice_2",
      script: "./services/microservice_2/src/app.js",
      watch: ".",
    },
  ],
};
