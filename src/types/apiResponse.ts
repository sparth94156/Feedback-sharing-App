import { Message } from "@/model/User"

export interface ApiResponse {
    success: boolean,
    message: string,
    isAcceptingMessage?: boolean,   // For isAcceptingMessage when signIn 
    messages?: Array<Message>   // For sending the message database to the user

}