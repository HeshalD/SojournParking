const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../Models/EmployeeModel"); 
require("dotenv").config();


const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, employeeNo , email, password, role } = req.body;

    // Check if user already exists
    const existingEmployee = await Employee.findOne({ email });
    if ( existingEmployee) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      name,
      employeeNo,
      email,
      password: hashedPassword,
    });

    await newEmployee.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, employee: { id: employee._id, name: employee.name, email: employee.email, role: employee.role } });
  } catch (err) {
    console.error('Error during login',err);
    res.status(500).json({ message: "Server Error", error:err.message });
  }
});

// Profile Route (GET & PUT) for authenticated users
router.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const employee = await Employee.findById(decoded.id).select("-password");
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Profile Route
router.put("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name, employeeNo, phone, email } = req.body;

    const employee = await Employee.findById(decoded.id);
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }

    employee.name = name || employee.name;
    employee.employeeNo = employeeNo || employee.employeeNo;
    employee.phone = phone || employee.phone;
    employee.email = email || employee.email;

    await employee.save();
    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
