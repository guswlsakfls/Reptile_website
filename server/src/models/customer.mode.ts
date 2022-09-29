import db  from './db';

const Customer = (customer: {
    id: number; title: string; body: string; 
}) => {
    const id = customer.id;
    const title = customer.title;
    const body = customer.body;
    return ({id, title, body})
}

// customer 튜플 추가
Customer.create = (newCustomer: any, result: any) => {
    db.query("INSERT INTO customers SET ?", newCustomer, (err: any, res) => {
        if (err) {
            console.log("err: ", err);
            result(err, null);
            return ;
        }
        console.log("Created customer: ", {id:res.insertId, ...newCustomer});
        console.log('newCustomer');
        result(null, res);
    });
};

// customer id로 조회
Customer.findByID = (customerID: any, result: any) => {
    db.query('SELECT * FROM cmarket.customers WHERE id = ?', customerID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }

        result(null, res[0]);
    });
};

// customer 전체 조회
Customer.getAll = (result: any) => {
    db.query('SELECT * FROM customers', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }
        console.log("customer: ", res);
        result(null, res);
    })
}

// customer id로 수정
Customer.updateByID = (id: any, customer: any, result: any) => {
    db.query('UPDATE customers SET id = ?, title = ?, body = ? WHERE id = ?', 
    [customer.id, customer.title, customer.body, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log("update customer: ", {id:id, ...customer});
        result(null, {id:id, ...customer});
    });
};

// customer id 로 삭제
Customer.remove = (id: any, result: any) => {
    db.query('DELETE FROM customers WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

// customer 전체 삭제
Customer.removeAll = (result: any) => {
    db.query('DELETE FROM customers', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
            return ;
        }
        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return ;
        }
        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

export default Customer;