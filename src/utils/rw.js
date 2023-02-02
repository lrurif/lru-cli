import fs from "fs";
import chalk from "chalk";
import logSymbols from 'log-symbols';


const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
export const RC = `${HOME}/.jmrc`;
if(!fs.existsSync(RC)) {
    fs.writeFileSync(RC, JSON.stringify({
        registry: "lrurif"
    }, null, "\t"));
}
function error(txt) {
    console.log(logSymbols.error, chalk.red(txt));
}
export function set(key, value) {
    
    if (!key) {
        return error(`键名必填`);
    }
    if (!value) {
        return error(`值必填`);
    }
    let data = JSON.parse(fs.readFileSync(RC).toString())
    if (data[key] === undefined) {
        return error(`${key}不存在`);
    }
    data[key] = value;
    fs.writeFileSync(RC, JSON.stringify(data, null, '\t'));
    console.log(logSymbols.success, chalk.green(`配置${key}成功`));
}
export function get(key) {
    if (!key) {
        return error(`键名必填`);
    }
    let data = JSON.parse(fs.readFileSync(RC).toString())
    if (data[key] === undefined) {
        return error(`${key}不存在`);
    }
    return data[key];
}
export function getAll() {
    let data = JSON.parse(fs.readFileSync(RC).toString())
    Object.keys(data).forEach(key => {
        console.log(`${key} = ${data[key]}`);
    })
}