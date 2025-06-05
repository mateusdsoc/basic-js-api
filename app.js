import express, { json, urlencoded } from 'express';

import {PORT} from './config/env.js';

import userRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import connectToDatabase from './database/mongoDB.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();  

//basic configs: json, cookies, url, arcjet
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);

//middleware created to error handling
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send("Welcome to the subscriptiontrackerapi");
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    await connectToDatabase();
})

export default app