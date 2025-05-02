const MecIssue = require("../Models/MecIssueModel");
const { sendEmergencyEmail } = require("../Config/emergencyEmailConfig");

//display data
const getAllMecIssues = async(req, res, next) => {
    try {
        const MecIssues = await MecIssue.find();
        if (!MecIssues || MecIssues.length === 0) {
            return res.status(404).json({ message: "No mechanical issues found" });
        }
        return res.status(200).json(MecIssues);
    } catch (err) {
        console.error("Error fetching mechanical issues:", err);
        return res.status(500).json({ message: "Error fetching mechanical issues" });
    }
};

//data insert
const DisMecIssue = async (req, res, next) => {
    const { lpname, email, etype, anote } = req.body;
    let MecIssues;

    try {
        MecIssues = new MecIssue({ lpname, email, etype, anote });
        await MecIssues.save();

        // Send email notification
        const emailSent = await sendEmergencyEmail(
            email,
            "Mechanical Emergency",
            { lpname, etype, anote }
        );

        if (!emailSent) {
            console.error("Failed to send email notification");
        }
    } catch (err) {
        console.error("Error creating mechanical issue:", err);
        return res.status(500).json({ message: "Error creating mechanical issue" });
    }

    if (!MecIssues) {
        return res.status(404).json({ message: "Unable to add mechanical issue" });
    }
    return res.status(200).json(MecIssues);
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let MecIssues;

    try {
        MecIssues = await MecIssue.findById(id);
    } catch (err) {
        console.error("Error fetching mechanical issue:", err);
        return res.status(500).json({ message: "Error fetching mechanical issue" });
    }

    if (!MecIssues) {
        return res.status(404).json({ message: "Mechanical issue not found" });
    }
    return res.status(200).json(MecIssues);
};

//Update Service provider details
const UpdateMecIssue = async (req, res, next) => {
    const id = req.params.id;
    const { lpname, email, etype, anote } = req.body;
    let MecIssues;

    try {
        MecIssues = await MecIssue.findByIdAndUpdate(id, { lpname, email, etype, anote });
        MecIssues = await MecIssues.save();
    } catch (err) {
        console.error("Error updating mechanical issue:", err);
        return res.status(500).json({ message: "Error updating mechanical issue" });
    }

    if (!MecIssues) {
        return res.status(404).json({ message: "Unable to update mechanical issue details" });
    }
    return res.status(200).json(MecIssues);
};

//delete service provider
const deleteMecIssue = async (req, res, next) => {
    const id = req.params.id;
    let MecIssues;

    try {
        MecIssues = await MecIssue.findByIdAndDelete(id);
    } catch (err) {
        console.error("Error deleting mechanical issue:", err);
        return res.status(500).json({ message: "Error deleting mechanical issue" });
    }

    if (!MecIssues) {
        return res.status(404).json({ message: "Unable to delete mechanical issue" });
    }
    return res.status(200).json(MecIssues);
};

exports.getAllMecIssues = getAllMecIssues;
exports.DisMecIssue = DisMecIssue;
exports.getById = getById;
exports.UpdateMecIssue = UpdateMecIssue;
exports.deleteMecIssue = deleteMecIssue;