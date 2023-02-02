import { get } from "./rw.js"
import downloadGit from 'download-git-repo';
export async function downloadTemplate(templateName, projectName) {
    let registry = get("registry")
    let api = `${registry}/${templateName}`;
    return new Promise((resolve, reject) => {
        downloadGit(api, projectName, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}