"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _index = require("./utils/index.js");

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (templateName, projectName) {
    if (_fs2.default.existsSync(projectName)) {
        console.log(_logSymbols2.default.error, _chalk2.default.red(projectName + "\u9879\u76EE\u5DF2\u5B58\u5728\uFF01"));
        return;
    }
    _inquirer2.default.prompt([{
        name: 'description',
        message: 'Please enter the project description: '
    }, {
        name: 'author',
        message: 'Please enter the author name: '
    }]).then(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
            var description = _ref2.description,
                author = _ref2.author;
            var loading, fileName, data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            loading = (0, _ora2.default)('downloading template ...').start();
                            _context.prev = 1;

                            console.log(description, author);
                            _context.next = 5;
                            return (0, _index.downloadTemplate)(templateName, projectName);

                        case 5:
                            loading.succeed();
                            fileName = projectName + "/package.json";

                            if (_fs2.default.existsSync(fileName)) {
                                data = JSON.parse(_fs2.default.readFileSync(fileName).toString());

                                data.name = projectName;
                                data.author = author;
                                data.description = description;
                                _fs2.default.writeFileSync(fileName, JSON.stringify(data, null, '\t'));
                                console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
                            }
                            _context.next = 14;
                            break;

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context["catch"](1);

                            console.log(_chalk2.default.red(_context.t0));
                            loading.fail();

                        case 14:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[1, 10]]);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }());
};