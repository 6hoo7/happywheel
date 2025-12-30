import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

console.log("SERVER_URL:", process.env.SERVER_URL);

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.SERVER_URL}/auth/google/callback`
);

export default client;
