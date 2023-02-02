"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RC = undefined;
exports.set = set;
exports.get = get;
exports.getAll = getAll;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
var RC = exports.RC = HOME + "/.jmrc";
if (!_fs2.default.existsSync(RC)) {
    _fs2.default.writeFileSync(RC, JSON.stringify({
        registry: "lrurif"
    }, null, "\t"));
}
function error(txt) {
    console.log(_logSymbols2.default.error, _chalk2.default.red(txt));
}
function set(key, value) {

    if (!key) {
        return error("\u952E\u540D\u5FC5\u586B");
    }
    if (!value) {
        return error("\u503C\u5FC5\u586B");
    }
    var data = JSON.parse(_fs2.default.readFileSync(RC).toString());
    if (data[key] === undefined) {
        return error(key + "\u4E0D\u5B58\u5728");
    }
    data[key] = value;
    _fs2.default.writeFileSync(RC, JSON.stringify(data, null, '\t'));
    console.log(_logSymbols2.default.success, _chalk2.default.green("\u914D\u7F6E" + key + "\u6210\u529F"));
}
function get(key) {
    if (!key) {
        return error("\u952E\u540D\u5FC5\u586B");
    }
    var data = JSON.parse(_fs2.default.readFileSync(RC).toString());
    if (data[key] === undefined) {
        return error(key + "\u4E0D\u5B58\u5728");
    }
    return data[key];
}
function getAll() {
    var data = JSON.parse(_fs2.default.readFileSync(RC).toString());
    Object.keys(data).forEach(function (key) {
        console.log(key + " = " + data[key]);
    });
}