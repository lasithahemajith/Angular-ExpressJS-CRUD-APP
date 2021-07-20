const Sequelize = require("sequelize");
let validate = require("validate.js");

const db = require("../config/db.config");
const Employee = db.employees;
const Department = db.departments;

const Op = Sequelize.Op;

exports.createEmployee = (req, res) => {
  // Validate request
  /*
  if (
    validate.isEmpty(req.body.name) ||
    validate.isEmpty(req.body.department_id) ||
    validate.isEmpty(req.body.nic)
  ) {
    res.status(400).send({
      message: "One or more field/fields is/are missing!",
    });
    return;
  }*/

  //Register an Employee
  if (
    validate.isString(req.body.name) &&
    validate.isInteger(req.body.department_id) &&
    validate.isString(req.body.nic) //&&
    //req.body.nic.slice(-1).toLowerCase() === "v"
  ) {
    const employee = {
      employees_id: req.body.employees_id,
      name: req.body.name,
      department_id: req.body.department_id,
      nic: req.body.nic,
    };

    // Save Employee in the database
    Employee.create(employee)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while registering the employee.",
        });
      });
  } else {
    res.status(400).send({
      message: "Input String values only",
    });
    return;
  }
};

exports.createDepartment = (req, res) => {
  // Validate request
  if (validate.isEmpty(req.body.department_name)) {
    res.status(400).send({
      message: "One or more field/fields is/are missing!",
    });
    return;
  }

  //Register an Department
  if (validate.isString(req.body.department_name)) {
    const department = {
      department_name: req.body.department_name,
    };

    // Save Department in the database
    Department.create(department)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while registering the department.",
        });
      });
  } else {
    res.status(400).send({
      message: "Input String values only",
    });
    return;
  }
};

exports.findAllEmployee = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Employee.findAll({
    include: [{ model: Department, attributes: ["department_name"] }],
    // include:[{model: Department}], //Gives all the details about the department of that employee
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees.",
      });
    });
};

exports.findAllDepartment = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Department.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees.",
      });
    });
};

exports.findOneEmployee = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;

    Employee.findByPk(id)
      .then((data) => {
        if (data === null) {
          res.status(500).send({
            message: "No Employee with id=" + id + " yet.",
          });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Employee with id=" + id,
        });
      });
  } else {
    res.send({ message: "Enter a numerical value as the ID" });
  }
};

exports.findOneDepartment = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;

    Department.findByPk(id)
      .then((data) => {
        if (data === null) {
          res.status(500).send({
            message: "No Department with id=" + id + " yet.",
          });
        }
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Department with id=" + id,
        });
      });
  } else {
    res.send({ message: "Enter a numerical value as the ID" });
  }
};

exports.updateEmployee = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    Employee.update(req.body, {
      where: { employees_id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Employee details were updated successfully.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Employee with id=" + id + " " + err,
        });
      });
  } else {
    res.send({ message: "ID should be a Number!" });
  }
};

exports.updateDepartment = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    if (validate.isEmpty(req.body.department_name)) {
      res.status(400).send({
        message: "Enter the new Department name",
      });
      return;
    }
    /*if (validate.isString(req.body.department)) {*/
    Department.update(req.body, {
      where: { department_id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Department details were updated successfully.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Department with id=" + id,
        });
      });
    /*} else {
      res.send({ message: "Update body is empty" });
    }*/
  } else {
    res.send({ message: "ID should be a Number!" });
  }
};

exports.deleteEmployee = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    Employee.destroy({
      where: { employees_id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Employee was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Employee with id=" + id,
        });
      });
  } else {
    res.send({ message: "ID should be a Number!" });
  }
};

exports.deleteDepartment = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    Department.destroy({
      where: { department_id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Department was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Department with id=${id}. Maybe Department was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Department with id=" + id,
        });
      });
  } else {
    res.send({ message: "ID should be a Number!" });
  }
};

exports.deleteAllEmployee = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Employees were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees.",
      });
    });
};

exports.deleteAllDepartment = (req, res) => {
  Department.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Departments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Departments.",
      });
    });
};

exports.findEmployeeForDepartment = (req, res) => {
  if (validate.isInteger(parseInt(req.params.id))) {
    const id = req.params.id;
    Employee.findAll({
      where: { department_id: id },
    })
      .then((employee_data) => {
        if (employee_data === null) {
          res.status(500).send({
            message: "No Employees for department id=" + id + " yet.",
          });
        }
        res.send(employee_data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving employees for department with id=" + id,
        });
      });
  } else {
    res.send({ message: "Enter a numerical value as the ID" });
  }
};
