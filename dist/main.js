"use strict";

var _commander = require("commander");

var _constant = require("./utils/constant.js");

var _init = require("./init.js");

var _init2 = _interopRequireDefault(_init);

var _config = require("./config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let actionMap = {
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
Object.keys(actionMap).forEach(actionName => {
    let action = actionMap[actionName];
    _commander.program.command(actionName).description(action.description).action(async () => {
        let args = process.argv.slice(3);
        if (actionName === 'init') {
            return (0, _init2.default)(...args);
        }
        if (actionName === 'config') {
            return (0, _config2.default)(...args);
        }
    });
});
function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach(action => {
        actionMap[action].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}
_commander.program.on("-h", help);
_commander.program.on("-help", help);
_commander.program.version(_constant.VERSION, '-V -v --version');
_commander.program.parse();