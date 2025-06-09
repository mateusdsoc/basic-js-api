import nodemailer from 'nodemailer';
import {EMAIL_PASSWORD} from './env.js';

export const accountEmail = "mateuaraujo01@gmail.com"
const transported = nodemailer.createTransport({
    service: 'gmail', 
    auth:{
        user: accountEmail,
        pass: 'EMAIL_PASSWORD'
    }
})