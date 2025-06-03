import express, { json, urlencoded } from 'express';

import {PORT} from './config/env.js';

import userRouter from './routes/users.route.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.router.js';
import connectToDatabase from './database/mongoDB.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();  

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send("Welcome to the subscriptiontrackerapi");
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    await connectToDatabase();
})

export default app