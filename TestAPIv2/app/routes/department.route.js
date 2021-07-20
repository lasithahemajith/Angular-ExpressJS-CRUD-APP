module.exports = (app) => {
  const department = require("../controllers/controller.js");
  const employees = require("../controllers/controller.js");

  let router = require("express").Router();

  // Create a new department
  router.post("/", department.createDepartment);

  // Retrieve all departments
  router.get("/", department.findAllDepartment);

  // Retrieve a single department with id
  router.get("/:id", department.findOneDepartment);

  // Retrieve all employees for a single department with id
  router.get("/:id/employees", department.findEmployeeForDepartment);

  // Update a department with id
  router.put("/:id", department.updateDepartment);

  // Delete a department with id
  router.delete("/:id", department.deleteDepartment);

  // Delete all departments
  router.delete("/", department.deleteAllDepartment);

  app.use("/api/department", router);
};
