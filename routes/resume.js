import express from "express";
import authMiddleware from "../models/middleware/auth.js"; // authentication middleware
import Resume from "../models/resume.js"; // correct path and lowercase filename

const router = express.Router();

// Create Resume
router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    const resume = new Resume({
      user: req.user.id,
      ...req.body,
    });
    await resume.save();
    res.status(201).json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all resumes of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update resume
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    if (resume.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete resume
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    if (resume.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

    await resume.deleteOne();
    res.json({ message: "Resume deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
