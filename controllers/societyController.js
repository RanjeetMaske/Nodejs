const { Society } = require("../models");

exports.create = async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });
    const society = await Society.create({ name, address });
    res.status(201).json(society);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const societies = await Society.findAll();
    res.json(societies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOne = async (req, res) => {
  try {
    const society = await Society.findByPk(req.params.id);
    if (!society) return res.status(404).json({ message: "Not found" });
    res.json(society);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const society = await Society.findByPk(req.params.id);
    if (!society) return res.status(404).json({ message: "Not found" });
    await society.update(req.body);
    res.json(society);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const society = await Society.findByPk(req.params.id);
    if (!society) return res.status(404).json({ message: "Not found" });
    await society.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
