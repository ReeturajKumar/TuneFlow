import { User } from './../models/userModel.js';


export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl, email } = req.body;

    // First, check if a user already exists with the same email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If a user with the same email exists, don't create a new account
      return res.status(400).json({ message: "A user with this email already exists", success: false });
    }

    // Check if the user with the Clerk ID exists
    const user = await User.findOne({ clerkId: id });

    // If the user doesn't exist, create a new one
    if (!user) {
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
        email, // Store email as well
      });
    }

    // Return a success response
    res.status(200).json({ message: "Success", success: true });
  } catch (error) {
    console.log(error, "Error in auth callback");
    next(error);
  }
};
