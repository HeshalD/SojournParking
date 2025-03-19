const Payment = require("../Models/PaymentModel");

//data display
const getAllPayment = async (req,res,next) =>{
    
    let payments;

    try{
        payments = await Payment.find();
    }catch(err){
        console.log(err);
    }

    if(!payments){
        return res.status(404).json({message:"payment not found "})
    }
    return res.status(200).json({payments})
    };

    //data insert
    const addPayments = async(req,res,next) =>{
        const{cardHolderName,cardNumber,expDate,cvv} = req.body;

        let payments;

        try{
            payments = new Payment({cardHolderName,cardNumber,expDate,cvv});
            await payments.save();
        }catch (err){
            console.log(err);
        }

        // not insert payments
        if(!payments){
            return res.status(404).json({message:"unable to find "})
        }
        return res.status(200).json({payments})
    }

    //get by id
    const getById = async(req,res,next) =>{
        const id = req.params.id;

        let payments;

        try{
            payments = await Payment.findById(id);
        }catch(err){
            console.log(err);
        }

        //not available payments
        if(!payments){
            return res.status(404).json({message:"unable to find "})
        }
        return res.status(200).json({payments})
    }

    //update user detais
    const updatePayment = async (req,res,next) =>{
        const id = req.params.id;
        const{cardHolderName,cardNumber,expDate,cvv} = req.body;

        let payments;
        
        try{
            payments = await Payment.findByIdAndUpdate(id,{
                cardHolderName:cardHolderName,cardNumber:cardNumber,expDate:expDate,cvv:cvv
            });
            payments = await payments.save();
        }catch(err){
            console.log(err);
        }

        if(!payments){
            return res.status(404).json({message:"unable to find "})
        }
        return res.status(200).json({payments})
    }

    //delete payments
    const deletePayment = async (req,res,next) =>{
        const id = req.params.id;

        let payments;

        try{
            payments = await Payment.findByIdAndDelete(id);
        }catch(err){
            console.log(err);
        }

        if(!payments){
            return res.status(404).json({message:"unable to find "})
        }
        return res.status(200).json({payments})

    }


    
    exports.getAllPayment = getAllPayment;
    exports.addPayments = addPayments;
    exports.getById = getById;
    exports.updatePayment = updatePayment;
    exports.deletePayment = deletePayment;