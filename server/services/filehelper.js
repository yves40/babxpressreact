import { exists, access, constants } from 'node:fs';

const module = 'FILEHELPER'
const Version = "filehelpers:1.04, May 28 2026 ";


async function fileExists(filepath) {

    return new Promise((resolve, reject) => {
        access(filepath, constants.F_OK, (err) => {
            if(err) {
                console.log(`${module} *************** ${filepath} does not exist`);
                resolve(false);
            } else {
                console.log(`${module} *************** ${filepath} exists`);
                resolve(true);
            }
        });
    });

}

const filehelper = {
    fileExists,
}
export default filehelper;
