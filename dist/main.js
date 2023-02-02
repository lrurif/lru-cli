"use strict";

var _commander = require("commander");

var _constant = require("./utils/constant.js");

var _init = require("./init.js");

var _init2 = _interopRequireDefault(_init);

var _config = require("./config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var actionMap = {
    init: {
        description: 'generate a new project from a template',
        usages: ['lru init templateName projectName']
    },
    config: {
        description: 'config .jmrc',
        usages: ['lru config set <k> <v>', 'lru config get <k>', 'lru config remove <k>']
    }
    //other commands
};
Object.keys(actionMap).forEach(function (actionName) {
    var action = actionMap[actionName];
    _commander.program.command(actionName).description(action.description).action(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var args;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        args = process.argv.slice(3);

                        if (!(actionName === 'init')) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt("return", _init2.default.apply(undefined, _toConsumableArray(args)));

                    case 3:
                        if (!(actionName === 'config')) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt("return", _config2.default.apply(undefined, _toConsumableArray(args)));

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));
});
function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach(function (action) {
        actionMap[action].usages.forEach(function (usage) {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}
_commander.program.on("-h", help);
_commander.program.on("-help", help);
_commander.program.version(_constant.VERSION, '-V -v --version');
_commander.program.parse();