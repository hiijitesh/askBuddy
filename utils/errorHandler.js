module.exports = {
    successResponse: (res, data, message = "Success") => {
        return res.status(200).json({
            success: true,
            message,
            data,
        });
    },
    errorResponse: (res, err, message = "Internal Server Error") => {
        console.error(err);
        return res.status(400).send({
            success: false,
            message,
            data: err,
        });
    },
    forbiddenResponse: (res, err, message = "Unauthorized Access") => {
        console.error(err);
        return res.status(403).json({
            success: false,
            message,
            data: err,
        });
    },
    invalidFieldResponse: (res, err, message = "Empty fields") => {
        console.error(err);
        return res.status(400).json({
            success: false,
            message,
            data: err,
        });
    },
};
