DROP TABLE IF EXISTS `customer`;
create table `customer`
(
    customer_id int(8) primary key,
    customer_name varchar(100) not null
);

DROP TABLE IF EXISTS `project`;
CREATE table `project` (
    project_id int(8),
    project_name varchar(100) not null,
    customer_id int(8) not null,
    PRIMARY KEY (project_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

DROP TABLE IF EXISTS `employee`;
create table `employee` 
(
    employee_id int(8) primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    position ENUM('Admin', 'User', 'QA') not null,
    Username Varchar(30) not null,
    password varchar(255) not null
);

DROP TABLE IF EXISTS `part`;
create table `part`
(
    part_number int(8) primary key,
    part_name varchar(100) not null,
    part_deawing varchar(255) not null,
    project_id int(8),
    FOREIGN KEY (project_id) REFERENCES project(project_id)
);

DROP TABLE IF EXISTS `document`;
create table `document`
(
    upload_no int(8) primary key,
    file_name varchar(255) not null,
    document_type enum('Work_Inst', 'Inspection', 'Q_Point') not null,
    status enum('Approved', 'Temporary') not null,
    part_number int(8) ,
    uploder int(8) ,
    upload_datetime timestamp not null DEFAULT CURRENT_TIMESTAMP,
    approver int(8) ,
    approved_datetime timestamp not null DEFAULT CURRENT_TIMESTAMP,
    preceding_doc int(8) ,
    FOREIGN KEY (part_number) REFERENCES project(project_id),
    FOREIGN KEY (uploder) REFERENCES employee(employee_id),
    FOREIGN KEY (approver) REFERENCES employee(employee_id),
    FOREIGN KEY (preceding_doc) REFERENCES document(upload_no)
);

