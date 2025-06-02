import express from 'express';

import {PORT} from './config/env.js';

import userRouter from './routes/users.route.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routers/subscription.router.js';

const app = express();  

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the subscriptiontrackerapi");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

export default app