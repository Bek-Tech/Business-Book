import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('products.db');

export const initProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, date TEXT NOT NULL, name TEXT NOT NULL UNIQUE,  stock REAL NOT NULL, history BLOB, status TEXT);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertProduct = (date, name, stock, history) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO products (date, name, stock, history,status) VALUES ( ?, ?, ?,?,?);`,
                [date, name, stock, history, "active"],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occured , product names must be unique !")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id, date, name, stock,history,status FROM products GROUP BY id   HAVING status LIKE "active" ORDER BY id DESC `,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchDeletedProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT id, date, name, stock,history, status FROM products GROUP BY status   HAVING status = "inactive" ORDER BY id DESC `,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};



export const totalyDeleteProduct = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE products SET  name= "deleted",  date= "deleted" , stock= 0 , history='[]' , status = "deleted" WHERE id =${id}`,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const updateProduct = (id, date, name, stock, history) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE products SET  name= "${name}",  date= "${date}" , stock=${stock} , history='${history}' WHERE id =${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};


export const deleteProduct = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE products SET  name= "deleted${id}",  date= "deleted" , stock= 0 , history='[]' , status = "deleted" WHERE id =${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const updateProductStatus = (id, status) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE products SET status = "${status}" WHERE id =${id}`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    alert("error has occurred")
                    reject(err);
                }
            );
        });
    });
    return promise;
};

