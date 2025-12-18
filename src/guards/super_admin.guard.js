const superAdminGuard = (req, res, next) => {
  if (!req.user?.is_super) {
    return res.status(403).json({ message: "Super admin only" });
  }
  next();
};

export default superAdminGuard;
