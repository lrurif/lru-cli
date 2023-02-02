import { program } from "commander";
import { VERSION } from "./utils/constant.js"

import init from "./init.js"
import config from "./config.js"


let actionMap = {
    init: {
        description: 'generate a new project from a template',
        usages: [
            'lru init templateName projectName'
        ]
    },
    config: {
        description: 'config .jmrc',
        usages: [
            'lru config set <k> <v>',
            'lru config get <k>',
            'lru config remove <k>'
        ]
    },
    //other commands
}
Object.keys(actionMap).forEach(actionName => {
    let action = actionMap[actionName]
    program.command(actionName).description(action.description).action(async () => {
        let args = process.argv.slice(3);
        if (actionName === 'init') {
            return init(...args)
        }
        if (actionName === 'config') {
            return config(...args)
        }
    })
})
function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}
program.on("-h", help);
program.on("-help", help);
program.version(VERSION, '-V -v --version');
program.parse();
