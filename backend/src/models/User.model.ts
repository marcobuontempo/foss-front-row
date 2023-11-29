import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  password: string;
  comparePassword(password: string): boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash and salt the password before saving
userSchema.pre<IUser>('save', async function (next) {
  const user = this;

  // Check if the password is modified or it's a new user
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Set the hashed password in the user document
    user.password = hashedPassword;
    next();
  } catch (error: unknown) {
    // Handle errors, such as bcrypt hashing failure
    if (error instanceof Error) {
      return next(error);
    }
  }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  try {
    // Use bcrypt.compare to compare the entered password with the stored hashed password
    return bcrypt.compare(enteredPassword, this.password)
      .then(match => match)
      .catch(() => false);
  } catch (error: unknown) {
    // Handle errors, such as invalid hashed password format
    return false;
  }
};


export const User = mongoose.model<IUser>('User', userSchema);

export default User;