import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Exporting it so that we can use anywhere we want to.

