import * as userService from "../services/users.js";

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.mongoDbConn, req.body);
    const response = { ...user, id: user._id.toString() };
    res.status(201).json(response);
  } catch (error) {
    if (error.message === "user with this name already exists") {
      return res.status(409).json({ error: error.message }); 
    }
    res.status(500).json({ error: error.message });
  }
};
export const myProfile = async (req, res) => {
  try {
    const user = await userService.myProfile(req.mongoDbConn, req.body);
    const response = { ...user, id: user._id.toString() };
    res.status(201).json(response);
  } catch (error) {
    if (error) {
      return res.status(409).json({ error }); 
    }
    res.status(500).json({ error });
  }
};
