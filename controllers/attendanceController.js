  const { Attendance, VisitorLog } = require("../models");
  const { Op } = require("sequelize");

  // Watchman: record entry (attendance)
  exports.recordEntry = async (req, res) => {
    try {
      const watchman = req.user;
      if (watchman.role !== "watchman")
        return res.status(403).json({ message: "Only watchman allowed" });
      const { flatUserId, notes } = req.body;
      const attendance = await Attendance.create({
        watchmanId: watchman.id,
        societyId: watchman.societyId,
        flatUserId: flatUserId || null,
        entryTime: new Date(),
        notes: notes || null,
      });
      res.status(201).json(attendance);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Watchman: record exit (for a specific attendance id or last open)
  exports.recordExit = async (req, res) => {
    try {
      const watchman = req.user;
      if (watchman.role !== "watchman")
        return res.status(403).json({ message: "Only watchman allowed" });
      const { attendanceId } = req.body;
      let attendance;
      if (attendanceId) {
        attendance = await Attendance.findByPk(attendanceId);
      } else {
        attendance = await Attendance.findOne({
          where: {
            watchmanId: watchman.id,
            societyId: watchman.societyId,
            exitTime: null,
          },
          order: [["entryTime", "DESC"]],
        });
      }
      if (!attendance)
        return res.status(404).json({ message: "Open attendance not found" });
      attendance.exitTime = new Date();
      await attendance.save();
      res.json(attendance);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Visitor logs (separate but similar)
  exports.recordVisitorEntry = async (req, res) => {
    try {
      const watchman = req.user;
      if (watchman.role !== "watchman")
        return res.status(403).json({ message: "Only watchman allowed" });
      const { visitorName, vehicleNumber, purpose } = req.body;
      const log = await VisitorLog.create({
        watchmanId: watchman.id,
        societyId: watchman.societyId,
        visitorName,
        vehicleNumber,
        purpose,
        entryTime: new Date(),
      });
      res.status(201).json(log);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.recordVisitorExit = async (req, res) => {
    try {
      const watchman = req.user;
      const { visitorId } = req.body;
      let log;
      if (visitorId) {
        log = await VisitorLog.findByPk(visitorId);
      } else {
        log = await VisitorLog.findOne({
          where: {
            watchmanId: watchman.id,
            societyId: watchman.societyId,
            exitTime: null,
          },
          order: [["entryTime", "DESC"]],
        });
      }
      if (!log)
        return res.status(404).json({ message: "Open visitor log not found" });
      log.exitTime = new Date();
      await log.save();
      res.json(log);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Get attendance logs (role-based)
  exports.getLogs = async (req, res) => {
    try {
      const user = req.user;
      let where = {};
      if (user.role === "societyadmin") where.societyId = user.societyId;
      if (user.role === "watchman") where.watchmanId = user.id;
      const logs = await Attendance.findAll({
        where,
        order: [["entryTime", "DESC"]],
      });
      res.json(logs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  // visitor logs listing
  exports.getVisitorLogs = async (req, res) => {
    try {
      const user = req.user;
      let where = {};
      if (user.role === "societyadmin") where.societyId = user.societyId;
      if (user.role === "watchman") where.watchmanId = user.id;
      const logs = await VisitorLog.findAll({
        where,
        order: [["entryTime", "DESC"]],
      });
      res.json(logs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
