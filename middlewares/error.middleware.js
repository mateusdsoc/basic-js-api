const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {... err};

        error.message = err.message;
        console.log(err.message);

        //Mongoose bad objectID
        if(err.name === "CastError"){
            const message = "Resource not found"
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicated key
        if(err.code === 11000){
            const message = "Duplicated field value entered";
            error = new Error();
            error = statusCode(400);
        }

        // Mongoose validation error
        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({sucess: false, error: error.message || "Server Error"});

    }catch(error){
        next(error);
    }
};

export default errorMiddleware;