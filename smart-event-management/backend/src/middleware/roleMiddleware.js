const roleMiddleware =
    (...allowedRoles) =>
    (req, res, next) => {
        const userRoles = Array.isArray(req.user?.roles) ? req.user.roles : [];

        if (allowedRoles.length === 0) return next();

        const isAllowed = allowedRoles.some((role) => userRoles.includes(role));

        if (!isAllowed) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: insufficient role"
            });
        }

        next();
    };

module.exports = roleMiddleware;

