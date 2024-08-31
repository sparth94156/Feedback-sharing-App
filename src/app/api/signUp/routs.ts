import connectToDB from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(request: Request) {
  // Connect the database first
  await connectToDB();

  try {
    const { username, email, password } = await request.json(); //Extracts data from post request
    const existingUserByUsernameisVerified = await userModel.findOne({
      username,
      isVerified: true,
    });
    if(existingUserByUsernameisVerified) {
      return Response.json(
        {
          success: false,
          message: "Username already exists, Try using another name",
        },
        {
          status: 400, // Bad Request
        }
      );
    }
    // Now we find the user by email
    const existingUserByEmail = await userModel.findOne({ email });
    const expiryCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if(existingUserByEmail.isVerified){
        return Response.json({
          success: false,
          message: "Username already exists with this email", 
        },
      {status: 400})
      }else{
        const hashPassword = await bcrypt.hash(password, 10)
        existingUserByEmail.password = hashPassword;  // Change the passoword with new password
        existingUserByEmail.verifyCode = expiryCode   // change the verifyCode
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000) // Another way of setting the timer to 1 hour

        await existingUserByEmail.save()  // Now the code will directly move to send verification code 
      }
      // TODO
    } else {
      // User email does not exists
      const hashPassword = await bcrypt.hash(password, 10);
      const presentDate = new Date();
      const expiryDate = new Date(presentDate.getTime() + 1 * 60 * 60 * 1000); // 3600000 or expiryDate = presentDate.setHours(presntDate.getHours() + 1)

      const newUser = new userModel({
        username,
        email,
        password: hashPassword,
        verifyCode: expiryCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messagesSent: [],
      });

      newUser.save(); // Saves the data to the databse
    }
    // Sending the verification email
   const emailResponse =  await sendVerificationEmail(
      email,
      username,
      expiryCode 
    )
    console.log(emailResponse)
    // You should check for the api references in the docs for the parameters that we pass when sending 
    // verification email and how the response should look like 
    // So when we check the email response by console it (we get one of the property 'success')

    if(!emailResponse.success){
      return Response.json({
        success: false,
        message: "Username already exists, Try using another name", // email.message
      },
    {status: 500})
    }
    // Generic return
    return Response.json(
      {
        success: true,
        message: "User registered Successfully, Please verify your email",  
      },
      {status: 201}
    );
  } catch (error) {
    console.log("Error sending verification email ", error);
    return Response.json(
      {
        success: false,
        message: "An Error Occured While Sending Email Verification",
      },
      {
        status: 500,
      }
    );
  }
}
