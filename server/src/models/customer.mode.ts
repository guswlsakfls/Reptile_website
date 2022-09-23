// import { sql }  from './db';

// export const Customer = function(this: any, customer: {
//     [x: string]: any;
//     name: any; email: any; 
// }) {
//     this.email = customer.email;
//     this.name = customer.name;
//     this.active = customer.active;
// }

// // customer 튜플 추가
// Customer.create = (newCustomer: any, result: any) => {
//     sql.query("INSERT INTO customers SET?", newCustomer, (err: any, res: {
//         insertId: any; "": any; 
// }) => {
//         if (err) {
//             console.log("err: ", err);
//             result(err, null);
//             return ;
//         }
//         console.log("Created customer: ", {id:res.insertId, ...newCustomer});
//         result(null, {id:res.insertId, ...newCustomer});
//     });
// };

// // customer id로 조회
// Customer.findByID = (customerID: any, result: any) => {
//     sql.query('SELECT * FROM customers WHERE id = ?', customerID, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return ;
//         }
//     });
// };

// // customer 전체 조회
// Customer.getAll = (result: any) => {
//     sql.query('SELECT * FROM customers', (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return ;
//         }
//         console.log("customer: ", res);
//         result(null, res);
//     })
// }

// // customer id로 수정
// Customer.updateByID = (id: any, customer: any, result: any) => {
//     sql.query('UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?', 
//     [customer.email, customer.name, customer.active, id], (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             return;
//         }
//         if (res.affectedRows == 0) {
//             result({kind: "not_found"}, null);
//             return ;
//         }
//         console.log("update customer: ", {id:id, ...customer});
//         result(null, {id:id, ...customer});
//     });
// };

// // customer id 로 삭제
// Customer.remove = (id: any, result: any) => {
//     sql.query('DELETE FROM customers WHERE id = ?', id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//             return;
//         }
//         if (res.affectedRows == 0) {
//             result({kind: "not_found"}, null);
//             return ;
//         }
//         console.log("deleted customer with id: ", id);
//         result(null, res);
//     });
// };

// // customer 전체 삭제
// Customer.removeAll = (result: any) => {
//     sql.query('DELETE FROM customers', (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null)
//             return ;
//         }
//         if (res.affectedRows == 0) {
//             result({kind: "not_found"}, null);
//             return ;
//         }
//         console.log(`deleted ${res.affectedRows} customers`);
//         result(null, res);
//     });
// };