const SecIssue = require("../Models/SecIssueModel");
const { sendEmergencyEmail } = require("../Config/emergencyEmailConfig");

//display data
const getAllSecIssues = async(req, res, next) => {
    try {
        const SecIssues = await SecIssue.find();
        if (!SecIssues || SecIssues.length === 0) {
            return res.status(404).json({ message: "No security issues found" });
        }
        return res.status(200).json(SecIssues);
    } catch (err) {
        console.error("Error fetching security issues:", err);
        return res.status(500).json({ message: "Error fetching security issues" });
    }
};

//data insert
const DisSecIssue = async (req, res, next) => {
    const { lpname, email, etype, anote } = req.body;
    let SecIssues;

    try {
        SecIssues = new SecIssue({ lpname, email, etype, anote });
        await SecIssues.save();

        // Send email notification
        const emailSent = await sendEmergencyEmail(
            email,
            "Security Emergency",
            { lpname, etype, anote }
        );

        if (!emailSent) {
            console.error("Failed to send email notification");
        }
    } catch (err) {
        console.error("Error creating security issue:", err);
        return res.status(500).json({ message: "Error creating security issue" });
    }

    if (!SecIssues) {
        return res.status(404).json({ message: "Unable to add security issue" });
    }
    return res.status(200).json(SecIssues);
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let SecIssues;

    try {
        SecIssues = await SecIssue.findById(id);
    } catch (err) {
        console.error("Error fetching security issue:", err);
        return res.status(500).json({ message: "Error fetching security issue" });
    }

    if (!SecIssues) {
        return res.status(404).json({ message: "Security issue not found" });
    }
    return res.status(200).json(SecIssues);
};

//Update Service provider details
const UpdateSecIssue = async (req, res, next) => {
    const id = req.params.id;
    const { lpname, email, etype, anote } = req.body;
    let SecIssues;

    try {
        SecIssues = await SecIssue.findByIdAndUpdate(id, { lpname, email, etype, anote });
        SecIssues = await SecIssues.save();
    } catch (err) {
        console.error("Error updating security issue:", err);
        return res.status(500).json({ message: "Error updating security issue" });
    }

    if (!SecIssues) {
        return res.status(404).json({ message: "Unable to update security issue details" });
    }
    return res.status(200).json(SecIssues);
};

//delete service provider
const deleteSecIssue = async (req, res, next) => {
    const id = req.params.id;
    let SecIssues;

    try {
        SecIssues = await SecIssue.findByIdAndDelete(id);
    } catch (err) {
        console.error("Error deleting security issue:", err);
        return res.status(500).json({ message: "Error deleting security issue" });
    }

    if (!SecIssues) {
        return res.status(404).json({ message: "Unable to delete security issue" });
    }
    return res.status(200).json(SecIssues);
};

exports.getAllSecIssues = getAllSecIssues;
exports.DisSecIssue = DisSecIssue;
exports.getById = getById;
exports.UpdateSecIssue = UpdateSecIssue;
exports.deleteSecIssue = deleteSecIssue;