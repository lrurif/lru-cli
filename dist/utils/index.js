"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadTemplate = undefined;

var downloadTemplate = exports.downloadTemplate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(templateName, projectName) {
        var registry, api;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        registry = (0, _rw.get)("registry");
                        api = registry + "/" + templateName;
                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                            (0, _downloadGitRepo2.default)(api, projectName, function (err) {
                                if (err) {
                                    reject(err);
                                }
                                resolve();
                            });
                        }));

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function downloadTemplate(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _rw = require("./rw.js");

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }