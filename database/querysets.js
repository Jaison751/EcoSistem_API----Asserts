const selectAllItems = (table) => {
    return `SELECT * FROM ${table};`;
}

const selectById = (table, id) => {
    return `SELECT * FROM ${table} WHERE id = ${id};`;
}

const insertData = (table, jsonData) => {
    const { data } = jsonData;
    return `INSERT INTO ${table} (data) VALUES ('${data}');`;
}

const updateData = (table, jsonData) => {
    const { id, data } = jsonData;
    return `UPDATE ${table} SET data = '${data}' WHERE id = ${id};`;
}

module.exports = {
    selectAllItems,
    selectById,
    insertData,
    updateData
};
