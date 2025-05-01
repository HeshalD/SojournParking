const Member = require("../Models/MembershipModel");
const { sendMembershipConfirmationEmail } = require("../Config/emailConfig");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG files are allowed'));
        }
    }
});

//data display
const getAllMembers = async (req, res, next) => {

    let members;

    try{
        members = await Member.find();
    }catch(err){
        console.log(err);
    }

    if(!members){
        return res.status(404).json({message:"Member not found"});
    }

    return res.status(200).json({members});
};

// data insert
const addMembers = async (req,res,next) => {
    try {
        const { EmployeeID, LicensePlateNo, Email } = req.body;
        const slipFile = req.file;

        if (!slipFile) {
            return res.status(400).json({ 
                message: "Payment slip is required",
                error: "No file uploaded"
            });
        }

        const slipPath = slipFile.filename;

        const members = new Member({
            EmployeeID,
            LicensePlateNo,
            Slip: slipPath,
            Email
        });

        await members.save();

        // Send confirmation email
        if (Email) {
            const emailSent = await sendMembershipConfirmationEmail(
                Email,
                EmployeeID,
                { EmployeeID, LicensePlateNo }
            );
            
            if (!emailSent) {
                console.log('Failed to send membership confirmation email');
            }
        }

        return res.status(200).json({ 
            message: "Membership created successfully",
            members 
        });
    } catch (err) {
        console.error("Error in addMembers:", err);
        if (err.code === 11000) { // Duplicate key error
            return res.status(400).json({ 
                message: "Email already exists",
                error: "Duplicate email"
            });
        }
        return res.status(500).json({ 
            message: "Error creating membership",
            error: err.message 
        });
    }
}

//Get by id
const getById = async(req,res,next) =>{
    const id = req.params.id;

    let members;

    try{
        members = await Member.findById(id);
    }catch(err){
        console.log(err);
    }

    //not available users
    if(!members){
        return res.status(404).json({message:"unable to renewal "})
    }
    return res.status(200).json({members})

}

//update user details
const updateMember = async (req,res,next) => {
    const id = req.params.id;
    const{EmployeeID,LicensePlateNo,Slip,Email} = req.body;

    let members;

    try{
        members = await Member.findByIdAndUpdate(id,{
            EmployeeID:EmployeeID,LicensePlateNo:LicensePlateNo,Slip:Slip,Email:Email
        });
        members = await members.save();
    }catch(err){
        console.log(err);
    }

    if(!members){
        return res.status(404).json({message:"unable to update "})
    }
    return res.status(200).json({members});

}

//delete user data
const deleteMember = async (req,res,next) => {
    const id = req.params.id;

    let members;

    try{
        members = await Member.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    if(!members){
        return res.status(404).json({message:"unable to delete "})
    }
    return res.status(200).json({members});
}

exports.getAllMembers = getAllMembers;
exports.addMembers = addMembers;
exports.getById = getById;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember;
exports.upload = upload;
