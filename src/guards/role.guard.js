
export function adminOrInstructorGuard(req, res, next) {
    const role = req.user.role;
    if (role === "admin" || role === "instructor") return next();
    return res.status(403).json({ message: "Forbidden" });
}

export function adminOrSuperAdminGuard(req, res, next) {
    const role = req.user.role;
    if (role === "admin" || role === "super_admin") return next();
    return res.status(403).json({ message: "Forbidden" });
}

export function adminInstructorSuperAdminGuard(req, res, next) {
    const role = req.user.role;
    if (["admin","instructor","super_admin"].includes(role)) return next();
    return res.status(403).json({ message: "Forbidden" });
}
