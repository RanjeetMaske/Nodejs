const { User, Society } = require("../models");
const PDFGenerator = require("../utils/pdfGenerator");

exports.list = async (req, res) => {
  try {
    let where = {};
    if (req.user.role === "societyadmin") where.societyId = req.user.societyId;
    const users = await User.findAll({
      where,
      include: [{ model: Society }],
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.get = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Society }],
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "Not found" });
    if (
      req.user.role === "societyadmin" &&
      user.societyId !== req.user.societyId
    )
      return res.status(403).json({ message: "Forbidden" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    if (req.body.password) delete req.body.password; // change through separate route ideally
    await user.update(req.body);
    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    await user.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// export users as PDF (superadmin or societyadmin)
exports.exportUsersPdf = async (req, res) => {
  try {
    let where = {};
    if (req.user.role === "societyadmin") where.societyId = req.user.societyId;
    const users = await User.findAll({
      where,
      include: [{ model: Society }],
      attributes: { exclude: ["password"] },
    });
    const doc = PDFGenerator.usersPdf(users);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=users.pdf");
    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
