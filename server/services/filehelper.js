import { exists, access, constants } from 'node:fs';

async function fileExists(filepath) {

    return new Promise((resolve, reject) => {
        access(filepath, constants.F_OK, (err) => {
            if(err) {
                console.log(`FILEHELPER *************** ${filepath} does not exist`);
                resolve(false);
            } else {
                console.log(`FILEHELPER *************** ${filepath} exists`);
                resolve(true);
            }
        });
    });

}

const filehelper = {
    fileExists,
}
export default filehelper;
