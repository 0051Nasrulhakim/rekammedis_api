const pool = require("../config/dbKode_wilayah");

module.exports = {

    getKodedistrictAndParam: async (kode, param) => {
        const [rows] = await pool.query(
        `SELECT id FROM vilages WHERE district_id = ? AND name like %${param}%` ,
            [kode]
        );
        return rows[0];
    },

}
