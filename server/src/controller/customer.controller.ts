import Customer from "../models/customer.mode";

// 새 객체 생성
exports.create = (req: any, res: any) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };
    const customer = Customer({
      id: req.body.id,
      title: req.body.title,
      body: req.body.body
    });

    // 데이터베이스에 저장
    Customer.create(customer, (err: any, data: any) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating Customer."
            });
        };
    })
};

// 전체 조회 
exports.findAll = (req: any,res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
    Customer.getAll((err: { message: any; }, data: any) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

// id로 조회
exports.findOne = (req: { params: { customerId: string; }; },res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
    Customer.findByID(req.params.customerId, (err: { kind: string; }, data: any) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      });
};

// id로 갱신
exports.update = (req: { body: { id: any; title: any; body: any; }; params: { customerId: string; }; },res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: any) => void; })=>{
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.updateByID(
    req.params.customerId,
    Customer(req.body),
    (err: { kind: string; }, data: any) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// id로 삭제
exports.delete = (req: { params: { customerId: number; }; },res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; send: (arg0: { message: string; }) => void; })=>{
    Customer.remove(req.params.customerId, (err: { kind: string; }, data: any) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.customerId
            });
          }
        } else res.send({ message: `Customer was deleted successfully!` });
      });
};

// 전체 삭제
exports.deleteAll = (req: any,res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; send: (arg0: { message: string; }) => void; })=>{
    Customer.removeAll((err: { message: any; }, data: any) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all customers."
          });
        else res.send({ message: `All Customers were deleted successfully!` });
      });
};