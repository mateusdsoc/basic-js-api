import mongoose from 'mongoose';

const subscriptionSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "name is required"],
        trim:true,
        minLength:2,
        maxLength:200,
    },
    price:{
        type:Number,
        required:[true, "price is required"],
        min:[0, "price must be greater than zero"],
    },
    currency:{
        type: String,
        enum: ["USD", "EUR", "BRL"],
        default: "BRL",
    },
    frequency:{
        type: String,
        enum:["daily", "weekly", "monthly", "yearly"],
    },
    category:{
        type:String,
        enum: ["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics", "other"],
        required:[true, "category needs to be true"],
    },
    paymentMethod:{
        type: String,
        required: [true, "payment method isnt setted"],
        trim: true,
    },
    status:{
        type:String,
        enum:["active", "cancelled", "expired"],
        default: "active",
    },
    startDate:{
        type: Date,
        required:[true, "date needs to exist"],
        validate:{
            validator: (value) => value <= new Date(),
            message: "Start date must be in the past",
        }
    },
    renewalDate:{
        type: Date,
        required:[true, "date needs to exist"],
        validate:{
            validator: function (value){
                return value > this.startDate;
            }, 
            message: "RenewalDate must be after the start date",   
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        index: true,
    }
}, {tymestamps: true});

// calculate renewal date if missing
subscriptionSchema.pre('save', function (next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7, 
            monthly:30,
            yearly:365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    //update status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;