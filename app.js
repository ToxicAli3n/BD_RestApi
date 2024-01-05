const express = require("express");
const cors = require("cors");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");
const Router_Quiz = require("./routes/Router_Quiz");
const Router_Role = require("./routes/Router_Role");
const Router_Users = require("./routes/Router_Users");

const app = express();

app.use(express.json());
app.use(cors());
app.use(Router_Quiz);
app.use(Router_Role);
app.use(Router_Users);

app.all("*", (req, res, next) => {
    next(new AppError('The URL ${req.originalUrl} does not exists', 404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

module.exports = app;