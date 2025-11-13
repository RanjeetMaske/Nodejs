const { Maintenance, User } = require("../models");
const PDFGenerator = require("../utils/pdfGenerator");

exports.create = async (req, res) => {
  try {
    // superadmin or societyadmin creates maintenance due for a user
    const { userId, amount, dueDate } = req.body;
    if (!userId || !amount || !dueDate)
      return res.status(400).json({ message: "Missing fields" });
    const record = await Maintenance.create({
      societyId: req.user.societyId || null,
      userId,
      amount,
      dueDate,
      status: "pending",
    });
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.pay = async (req, res) => {
  try {
    const { id } = req.params;
    const { paidAt } = req.body;
    const record = await Maintenance.findByPk(id);
    if (!record) return res.status(404).json({ message: "Not found" });
    record.status = "paid";
    record.paidAt = paidAt ? new Date(paidAt) : new Date();
    await record.save();
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.list = async (req, res) => {
  try {
    let where = {};
    if (req.user.role === "societyadmin") where.societyId = req.user.societyId;
    if (req.user.role === "societyuser") where.userId = req.user.id;
    const items = await Maintenance.findAll({
      where,
      order: [["dueDate", "DESC"]],
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.exportReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Maintenance.findByPk(id);
    if (!record) return res.status(404).json({ message: "Not found" });
    const doc = PDFGenerator.maintenanceReceipt(record);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=maintenance_${id}.pdf`
    );
    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
