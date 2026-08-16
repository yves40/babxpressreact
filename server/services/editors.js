"use server"

import sqlHelper from './sqlHelper.js';
import AppError from './customError.js';

const modulename = "editors # ";
const Version = "editors.js Aug 062026 , 1.02";

// -----------------------------------------------------------------------------------------
// Search editors count
// -----------------------------------------------------------------------------------------
export async function getEditorsCount() {
    try {
        const sqlh = new sqlHelper();
        let conn = await sqlh.startTransactionRO();
        const rows = await sqlh.Select('select count(*) as editorscount from editors', 
                                        null, 
                                        conn);
        sqlh.commitTransaction(conn);
        if(rows.length > 0) {
            return rows[0].editorscount;
        }
        else {
            throw new AppError('Aucun éditeur trouvé');
        }   
    }
    catch(error) {
        console.log(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération du nombre d\'éditeurs');
    }   
}
// -----------------------------------------------------------------------------------------
// Top authors
// -----------------------------------------------------------------------------------------
export async function getTopEditors(limit) {
    try {
        const sqlh = new sqlHelper();
        let conn = await sqlh.startTransactionRO();
        const rows = await sqlh.Select('select count(b.bk_id) bookcount , e.ed_name \
                        from books b, editors e \
                        where b.bk_editor = e.ed_id  \
                        group by e.ed_name \
                        order by bookcount desc , e.ed_name asc limit ?', 
                limit, 
                conn);
        sqlh.commitTransaction(conn);
        if(rows.length > 0) {
            return rows;
        }
        else {
            throw new AppError('Pas de top éditeurs ! Désolé');
        }   
    }
    catch(error) {
        console.log(`${modulename} ${error}`);
        throw new Error('Erreur lors de la récupération des éditeurs les plus lus');
    }
}

