import express from 'express';

import {PORT} from './config/env.js';

import userRouter from './routes/users.route.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.router.js';
import connectToDatabase from './database/mongoDB.js';

const app = express();  

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the subscriptiontrackerapi");
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    await connectToDatabase();
})

export default app