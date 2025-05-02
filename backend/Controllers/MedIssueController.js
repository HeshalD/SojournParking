const MedIssue = require("../Models/MedIssueModel");
const { sendEmergencyEmail } = require("../Config/emergencyEmailConfig");

//display data
const getAllMedIssues = async(req, res, next) =>{
    try {
        const medIssues = await MedIssue.find();
        if (!medIssues || medIssues.length === 0) {
            return res.status(404).json({ message: "No medical issues found" });
        }
        return res.status(200).json(medIssues);
    } catch (err) {
        console.error("Error fetching medical issues:", err);
        return res.status(500).json({ message: "Error fetching medical issues" });
    }
};

//data insert
const DisMedIssue = async (req, res, next) =>{
    const { lpname, email, etype, pcon, anote } = req.body;
    let medIssues;

    try {
        medIssues = new MedIssue({ lpname, email, etype, pcon, anote });
        await medIssues.save();

        // Send email notification
        const emailSent = await sendEmergencyEmail(
            email,
            "Medical Emergency",
            { lpname, etype, pcon, anote }
        );

        if (!emailSent) {
            console.error("Failed to send email notification");
        }
    } catch (err) {
        console.error("Error creating medical issue:", err);
        return res.status(500).json({ message: "Error creating medical issue" });
    }

    if (!medIssues) {
        return res.status(404).json({ message: "Unable to add medical issue" });
    }
    return res.status(200).json(medIssues);
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;
    let medIssues;

    try {
        medIssues = await MedIssue.findById(id);
    } catch (err) {
        console.error("Error fetching medical issue:", err);
        return res.status(500).json({ message: "Error fetching medical issue" });
    }

    if (!medIssues) {
        return res.status(404).json({ message: "Medical issue not found" });
    }
    return res.status(200).json(medIssues);
};

//Update Medical Issue details
const UpdateMedIssue = async (req, res, next) => {
    const id = req.params.id;
    const { lpname, email, etype, pcon, anote } = req.body;
    let medIssues;

    try {
        medIssues = await MedIssue.findByIdAndUpdate(
            id,
            { lpname, email, etype, pcon, anote },
            { new: true }
        );
        medIssues = await medIssues.save();
    } catch (err) {
        console.error("Error updating medical issue:", err);
        return res.status(500).json({ message: "Error updating medical issue" });
    }

    if (!medIssues) {
        return res.status(404).json({ message: "Unable to update medical issue details" });
    }
    return res.status(200).json(medIssues);
};

//Delete medical issue
const deleteMedIssue = async (req, res, next) => {
    const id = req.params.id;
    let medIssues;

    try {
        medIssues = await MedIssue.findByIdAndDelete(id);
    } catch (err) {
        console.error("Error deleting medical issue:", err);
        return res.status(500).json({ message: "Error deleting medical issue" });
    }

    if (!medIssues) {
        return res.status(404).json({ message: "Unable to delete medical issue" });
    }
    return res.status(200).json(medIssues);
};

exports.getAllMedIssues = getAllMedIssues;
exports.DisMedIssue = DisMedIssue;
exports.getById = getById;
exports.UpdateMedIssue = UpdateMedIssue;
exports.deleteMedIssue = deleteMedIssue;