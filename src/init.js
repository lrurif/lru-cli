import fs from "fs"
import inquirer from 'inquirer';
import chalk from "chalk";
import ora from 'ora';
import { downloadTemplate } from "./utils/index.js"
import symbol from 'log-symbols';
export default (templateName, projectName) => {
    if (fs.existsSync(projectName)) {
        console.log(symbol.error, chalk.red(`${projectName}项目已存在！`));
        return;
    }
    inquirer.prompt([
        {
            name: 'description',
            message: 'Please enter the project description: '
        },
        {
            name: 'author',
            message: 'Please enter the author name: '
        }
    ]).then(async ({ description, author }) => {
        let loading = ora('downloading template ...').start();
        try {
            await downloadTemplate(templateName, projectName);
            loading.succeed();
            const fileName = `${projectName}/package.json`;
            if (fs.existsSync(fileName)) {
                const data = JSON.parse(fs.readFileSync(fileName).toString())
                data.name = projectName;
                data.author = author;
                data.description = description;
                fs.writeFileSync(fileName, JSON.stringify(data, null, '\t'))
                console.log(symbol.success, chalk.green('Project initialization finished!'));
            }
        } catch (err) {
            console.log(chalk.red(err));
            loading.fail();
        }

    })
}