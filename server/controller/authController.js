import { User } from './../models/userModel.js';


export const authCallback = async (req, res, next) => { 
 try {
  const {id, firstName, lastName,imageUrl} = req.body;

  const user = await User.findOne({clerkId: id});

  if(!user){
    await User.create({
      clerkId: id,
      fullName: `${firstName} ${lastName}`,
      imageUrl,
    });
  }

  res.status(200).json({message: "Success", success: true})
 } catch (error) {
  console.log(error, "Error in auth callback");
  next(error);
 }
}