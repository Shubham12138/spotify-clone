import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  console.log("ProtectRoute - req.auth:", req.auth);
  console.log("ProtectRoute - req.headers:", req.headers);

  if (!req.auth.userId) {
    console.log("ProtectRoute - No userId found, returning 401");
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  }

  console.log("ProtectRoute - User authenticated, userId:", req.auth.userId);
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const userEmail = currentUser.primaryEmailAddress?.emailAddress;

    // Check if ADMIN_EMAIL is set, if not, allow all authenticated users as admin for development
    const adminEmail = process.env.ADMIN_EMAIL;
    const isAdmin = adminEmail ? adminEmail === userEmail : true;

    console.log(
      `User email: ${userEmail}, Admin email: ${adminEmail}, Is admin: ${isAdmin}`
    );

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized - you must be an ADMIN" });
    }

    // Add the admin status to the request object for later use
    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    next(error);
  }
};
