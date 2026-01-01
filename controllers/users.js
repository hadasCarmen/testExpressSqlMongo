import * as userService from "../services/users.js";

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.mongoDbConn, req.body);
    // Convert _id to string id for response consistency
    const response = { ...user, id: user._id.toString() };
    res.status(201).json(response);
  } catch (error) {
    // Check for specific error messages to return appropriate HTTP status codes
    if (error.message === "user with this name already exists") {
      return res.status(409).json({ error: error.message }); // 409 Conflict for duplicate names
    }
    res.status(500).json({ error: error.message });
  }
};
