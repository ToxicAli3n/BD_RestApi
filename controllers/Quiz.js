const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllQuiz= (req, res, next) => {
    conn.query("SELECT * FROM Quiz", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createQuiz = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.description,
        req.body.name,
    ];
    conn.query(
        "INSERT INTO Quiz (description,name) VALUES(?)",
        [values],
        function (err,data,fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "Quiz added",
            });
        }
    );
};

exports.getQuizById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "SELECT * FROM Quiz WHERE id = ?",
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

exports.updateQuiz = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "UPDATE Quiz SET description=?, name=? WHERE id=?",
        [
            req.body.description,
            req.body.name,
            req.params.id,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "Quiz info updated!",
            });
        }
    );
};

exports.deleteQuiz = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    conn.query(
        "DELETE FROM Quiz WHERE id=?",
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