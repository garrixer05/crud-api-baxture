import { Types, isObjectIdOrHexString } from "mongoose";
import userModel from "../model/userModel.js";

export async function getUser(req, res) {
  try {
    const { userID } = req.params;
    if (!isObjectIdOrHexString(userID)) {
      return res.status(400).send({ message: "Not a valid user ID" });
    }
    const oid = new Types.ObjectId(userID);
    const user = await userModel.findById(oid);
    return res.status(201).send({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}
export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({});
    return res.status(201).send({ users: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}
export async function addUser(req, res) {
  try {
    const { username, age, hobbies } = req.body;

    if (!username || !age || !hobbies) {
      return res.status(400).send("Username, age and hobbies are required!");
    }
    const newUser = {
      username: username,
      age: age,
      hobbies: hobbies,
    };
    await userModel.create(newUser);
    return res.status(201).send({ user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}
export async function updateUser(req, res) {
  try {
    const { userID } = req.params;
    if (!isObjectIdOrHexString(userID)) {
      return res.status(400).send({ message: "Not a valid user ID" });
    }
    const oid = new Types.ObjectId(userID);

    const { username, age, hobbies } = req.body;

    if (!username || !age || !hobbies) {
      return res.status(400).send("Username, age and hobbies are required!");
    }
    const update = {
      username,
      age,
      hobbies,
    };
    const updatedUser = await userModel.findByIdAndUpdate(oid, update, {
      new: true,
    });
    return res.status(201).send({ updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}
export async function deleteUser(req, res) {
  try {
    const { userID } = req.params;
    if (!isObjectIdOrHexString(userID)) {
      return res.status(400).send({ message: "Not a valid user ID" });
    }
    const oid = new Types.ObjectId(userID);
    await userModel.findByIdAndDelete(oid);
    return res.status(201).send({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}
