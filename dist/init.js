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

exports.default = (templateName, projectName) => {
    if (_fs2.default.existsSync(projectName)) {
        console.log(_logSymbols2.default.error, _chalk2.default.red(`${projectName}项目已存在！`));
        return;
    }
    _inquirer2.default.prompt([{
        name: 'description',
        message: 'Please enter the project description: '
    }, {
        name: 'author',
        message: 'Please enter the author name: '
    }]).then(async ({ description, author }) => {
        let loading = (0, _ora2.default)('downloading template ...').start();
        try {
            console.log(description, author);
            await (0, _index.downloadTemplate)(templateName, projectName);
            loading.succeed();
            const fileName = `${projectName}/package.json`;
            if (_fs2.default.existsSync(fileName)) {
                const data = JSON.parse(_fs2.default.readFileSync(fileName).toString());
                data.name = projectName;
                data.author = author;
                data.description = description;
                _fs2.default.writeFileSync(fileName, JSON.stringify(data, null, '\t'));
                console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
            }
        } catch (err) {
            console.log(_chalk2.default.red(err));
            loading.fail();
        }
    });
};