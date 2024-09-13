import connectToDB from "@/lib/dbConnect";
import userModel from "@/model/User";
import { z } from "zod";
import { userNameValidation } from "@/schema/signUpSchema";
import next from "next";

// We created a querySchema to check for unique username
const uniqueUsernameQuerySchema = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {
  await connectToDB();

  try {
    // We'll first get the url
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    // validate with zod
    const result = uniqueUsernameQuerySchema.safeParse(queryParam);
    console.log(result);

    if (!result.success) {
      // the ZodError instance containing detailed information about the validation problems. But we want error info related to the username
      // the error property has an array of errors so incase if we dont have the error property we'll just simply return an empty array
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameter",
        },
        {
          status: 400, // Bad request
        }
      );
    }
    // Now that if result.success is true, we can get the username from result object
    const { username } = result.data;

    // find the user from the database
    const existingVerifiedUser = await userModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
        }
      );
    }

    // if username does not exists or verfied
    return Response.json(
        {
          success: true,
          message: "Username is unique",
        },
        {
          status: 200,
        }
      ); 


  } catch (error) {
    console.error("Error checking Username", error);
    return Response.json(
      {
        status: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
