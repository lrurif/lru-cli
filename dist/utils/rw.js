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

const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
const RC = exports.RC = `${HOME}/.jmrc`;
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
        return error(`键名必填`);
    }
    if (!value) {
        return error(`值必填`);
    }
    let data = JSON.parse(_fs2.default.readFileSync(RC).toString());
    if (data[key] === undefined) {
        return error(`${key}不存在`);
    }
    data[key] = value;
    _fs2.default.writeFileSync(RC, JSON.stringify(data, null, '\t'));
    console.log(_logSymbols2.default.success, _chalk2.default.green(`配置${key}成功`));
}
function get(key) {
    if (!key) {
        return error(`键名必填`);
    }
    let data = JSON.parse(_fs2.default.readFileSync(RC).toString());
    if (data[key] === undefined) {
        return error(`${key}不存在`);
    }
    return data[key];
}
function getAll() {
    let data = JSON.parse(_fs2.default.readFileSync(RC).toString());
    Object.keys(data).forEach(key => {
        console.log(`${key} = ${data[key]}`);
    });
}