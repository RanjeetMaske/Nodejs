const PDFDocument = require("pdfkit");

exports.usersPdf = (users) => {
  const doc = new PDFDocument({ margin: 30 });
  doc.fontSize(18).text("Users Export", { align: "center" }).moveDown();
  users.forEach((u, idx) => {
    doc.fontSize(12).text(`${idx + 1}. ${u.name} (${u.email})`);
    doc.text(`   Role: ${u.role}`);
    doc.text(`   Society: ${u.Society ? u.Society.name : "-"}`);
    doc.text(`   Flat: ${u.flatNumber || "-"}`);
    doc.moveDown();
  });
  return doc;
};

exports.maintenanceReceipt = (record) => {
  const doc = new PDFDocument({ margin: 30 });
  doc.fontSize(16).text("Maintenance Receipt", { align: "center" }).moveDown();
  doc.fontSize(12).text(`Maintenance ID: ${record.id}`);
  doc.text(`User ID: ${record.userId}`);
  doc.text(`Society ID: ${record.societyId}`);
  doc.text(`Amount: ${record.amount}`);
  doc.text(`Due Date: ${record.dueDate}`);
  doc.text(`Status: ${record.status}`);
  if (record.paidAt) doc.text(`Paid At: ${record.paidAt}`);
  return doc;
};
