const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const signToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Provide email and password" });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        societyId: user.societyId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Registration (only accessible to admins via route)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, societyId, flatNumber, phone } =
      req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    // check if first superadmin
    const superAdminExists = await User.findOne({
      where: { role: "superadmin" },
    });
    if (!superAdminExists) {
      // allow first superadmin creation
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const user = await User.create({
        name,
        email,
        password: hashed,
        role: "superadmin",
        societyId: societyId || null,
        flatNumber,
        phone,
      });
      return res.status(201).json({
        message: "First superadmin created",
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }

    // For normal registrations, enforce auth
    if (!req.user)
      return res.status(401).json({ message: "Not authorized, token missing" });

    if (!["superadmin", "societyadmin"].includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });

    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "societyuser",
      societyId: societyId || null,
      flatNumber,
      phone,
    });
    res
      .status(201)
      .json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
