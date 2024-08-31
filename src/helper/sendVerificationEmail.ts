import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  
  // both resend and react-email have same code for sending email 
  try {
    await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: "dannysinghasia991@gmail.com",
        subject: "anonymous_message Verification code",
        react: VerificationEmail({username, otp:verifyCode}),
    })
    return { success: true, message: "Verification email send successfully" };
  } catch (emailError) {
    console.log("send verification email error", emailError);
    return { success: false, message: "Send verification email error" };
  }
}
