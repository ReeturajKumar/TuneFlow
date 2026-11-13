import mongoose from "mongoose";
import dns from "dns";

// Some Windows setups (VPN/antivirus DNS proxy) make Node query 127.0.0.1, which
// refuses the SRV lookup that mongodb+srv:// needs. Fall back to public DNS then.
if (dns.getServers().every((s) => s.startsWith("127.") || s === "::1")) {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}