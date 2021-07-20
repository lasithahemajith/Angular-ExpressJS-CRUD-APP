module.exports = (app) => {
  const employees = require("../controllers/controller.js");

  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/", employees.createEmployee);

  // Retrieve all employees
  router.get("/", employees.findAllEmployee);

  // Retrieve a single Tutorial with id
  router.get("/:id", employees.findOneEmployee);

  // Update a Tutorial with id
  router.put("/:id", employees.updateEmployee);

  // Delete a Tutorial with id
  router.delete("/:id", employees.deleteEmployee);

  // Delete all employees
  router.delete("/", employees.deleteAllEmployee);

  app.use("/api/employees", router);
};
