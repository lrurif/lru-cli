"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.downloadTemplate = downloadTemplate;

var _rw = require("./rw.js");

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function downloadTemplate(templateName, projectName) {
    let registry = (0, _rw.get)("registry");
    let api = `${registry}/${templateName}`;
    return new Promise((resolve, reject) => {
        (0, _downloadGitRepo2.default)(api, projectName, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}