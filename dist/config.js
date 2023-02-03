"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _rw = require("./utils/rw.js");

exports.default = (action, key, value) => {
    switch (action) {
        case "get":
            if (key) {
                (0, _rw.get)(key);
            } else {
                (0, _rw.getAll)();
            }
            break;
        case "set":
            (0, _rw.set)(key, value);
            break;
        default:
            console.log();
            break;
    }
};