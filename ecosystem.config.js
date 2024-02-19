module.exports = {
  apps: [
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
