const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Custom D&D 5e Items API",
    description:
      "This API allows for easy generation of custom adventuring gear and armor items for D&D 5e",
  },
  host: `cse341-lmc7.onrender.com`,
  schemes: ["https"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
