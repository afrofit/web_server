"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var path_1 = __importDefault(require("path"));
var transporter = nodemailer_1.default.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});
// point to the template folder
var handlebarOptions = {
    viewEngine: {
        partialsDir: path_1.default.resolve("./views/"),
        defaultLayout: false,
    },
    viewPath: path_1.default.resolve("./views/"),
};
// use a template file with nodemailer
transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
exports.default = transporter;
//# sourceMappingURL=nodemailer.js.map