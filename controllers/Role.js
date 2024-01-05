const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllRole= (req, res, next) => {
    conn.query("SELECT * FROM Role", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createRole = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.name,
        req.body.description,
    ];
    conn.query(
        "INSERT INTO Role (name,description) VALUES(?)",
        [values],
        function (err,data,fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "Role added",
            });
        }
    );
};

exports.getRoleById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "SELECT * FROM Role WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.updateRole = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "UPDATE Role SET name=?, description=? WHERE id=?",
        [
            req.body.name,
            req.body.description,
            req.params.id,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "Role info updated!",
            });
        }
    );
};

exports.deleteRole = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    conn.query(
        "DELETE FROM Role WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "User deleted!",
            });
        }
    );
};