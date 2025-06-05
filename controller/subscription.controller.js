import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({
            sucess:true,
            data: subscription
        })
    }catch(error){
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        //check if user who does the request is the same as the on in token
        if(req.user.id !== req.params.id){
            const error = new Error("You are requesting a subscription from another account");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.id});
        
        res.status(200).json({
            sucess: true,
            data: subscriptions
        });

    }catch(error){
        next(error);
    }
}