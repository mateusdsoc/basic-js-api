import {Router} from 'express';
import { sendReminders } from '../controller/workflow.controller';

const workflowRouter = Router();

workflowRouter.post('/subscription/reminder', sendReminders);

export default workflowRouter;