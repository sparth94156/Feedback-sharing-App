import { Schema, Document, model, models } from "mongoose";
import mongoose from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

export interface User extends Document{
    userName: string
    email: string
    password: string
    verifyCode: string
    verifyCodeExpiry: Date
    isVerified: boolean
    isAcceptingMessage: boolean
    messagesSent: Message[]
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserSchema: Schema<User>  = new Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        trim: true, // trims the string from both sides.
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'Please provide valid Password']
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify code is required']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify code expiry is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messagesSent: [MessageSchema]

})

const userModel = models.User as mongoose.Model<User> || model<User>('User', UserSchema)    // This is a comment to test the typescript for extra type safety

export default userModel;