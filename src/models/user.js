import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
    title: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      required: false 
    }
  });

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
        select: false,
    },
    fullname: {
        type: String,
        required: [true, "can't be blank"],
        minLength: [3, "is too short"],
        maxLength: [50, "is too long"],
    },
    notes: [noteSchema]
})


const User = models.User || model("User", userSchema);
export default User;