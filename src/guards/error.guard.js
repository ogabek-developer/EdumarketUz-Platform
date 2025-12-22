
const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
            message: err.errors.map(e => e.message)
        });
    }

    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
            message: err.errors.map(e => e.message)
        });
    }

    if (err.name === "SequelizeDatabaseError") {
        return res.status(400).json({
            message: err.message
        });
    }

    if (err.status) {
        return res.status(err.status).json({
            message: err.message
        });
    }

    return res.status(400).json({
        message: err.message || "Bad request"
    });
};

export default errorHandler;
