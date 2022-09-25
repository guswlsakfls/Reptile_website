import db  from './db';

const Customer = function(this: any, customer: {
    id: any; title: any; body: any; 
}) {
    this.id = customer.id;
    this.title = customer.title;
    this.body = customer.body;
}

// customer 튜플 추가
Customer.create = (newCustomer: any, result: any) => {
    db.query("INSERT INTO cmarget.customers SET?", newCustomer, (err: any, res: {
        insertId: any; "": any; 
}) => {
        if (err) {
            console.log("err: ", err);
            result(err, null);
            return ;
        }
        console.log("Created customer: ", {id:res.insertId, ...newCustomer});
        result(null, {id:res.insertId, ...newCustomer});
    });
};

// customer id로 조회
Customer.findByID = (customerID: any, result: any) => {
    db.query('SELECT * FROM cmarget.customers WHERE id = ?', customerID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return ;
        }
    });
};

// customer 전체 조회
Customer.getAll = (result: any) => {
    db.query('SELECT * FROM cmarket.customers', (err, res) => {
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
    db.query('UPDATE cmarget.customers SET id = ?, title = ?, body = ? WHERE id = ?', 
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
    db.query('DELETE FROM cmarget.customers WHERE id = ?', id, (err, res) => {
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
    db.query('DELETE FROM cmarget.customers', (err, res) => {
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