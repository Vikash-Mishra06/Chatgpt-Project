const userModel = require("./../models/userModel");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const { token } = req.cookies;

  // 1️⃣ Handle missing token properly
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token found" });
  }

  try {
    // 2️⃣ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Correct way to find a user by ID
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    // 4️⃣ Attach user to request for downstream use
    req.user = user;
    next();
  } catch (err) {
    // 5️⃣ Handle invalid or expired tokens cleanly
    return res.status(401).json({ message: "Unauthorized, invalid or expired token" });
  }
}

module.exports = { authUser };
