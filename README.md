# Anonymous Feedback Sharing App

# Step by Step Process

    - Installed mongoose for MongoDB database connection and data schema
    - Created a model folder for the models of the app.
    - Created User file and added it to the model folder.
    - Created database Schema for User and Message.
    - Created a schema folder in the src directory.
    - Installed zod validation library.
    - Zod provides upfront typescript schema validation for your application.
    - Created schema for signUp, signIn, message, acceptMessage and verification using zod library.
    - Created lib folder for database connection file & for UI component library.
    - Generated MONGODB_URI for data connection from database.
    - Created database connection file.
    - Creates an account on resend. Generate the API_KEY
    - Created emails folder for storing all the emails templates that we are going to build throughout our application.
    - Created verificationEmail file for email template
    - Created sendVerification file for sending email.
    - Created ApiResponse file inside types folder for API response type for sendVerificationEmail.
    - Copy the send email code from the resend documentation.
    - Creates api folder for signUp functionality.  (./api/signIn/routs.ts)
    - Create a POST request for signUp.

# SignUp WorkFlow

    IF existingUserByEmail exists THEN
        IF exisitingUserByEmail.isVerified THEN
         return {success: false}
        ELSE
        // Saved the updated user
        // Send the verification email
        END-IF
    ELSE
     // Creates a new user with the provided data
     // Save the new user to the database
     // Send the verification email
    END-IF
