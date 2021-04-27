insert into `customer` (customer_id, customer_name) values 
('1', 'Michael'),
('2', 'Sofie');

insert into `project` (project_id, project_name, customer_id) values
('1', 'TestProjectA', '1'),
('2', 'TestProjectB', '1'),
('3', 'TestProjectC', '2');

insert into `employee` (employee_id, first_name, last_name, position, username ,password) values 
('11111111', 'Jame', 'Olara', 'Admin', 'Admin11111111', '$2y$05$WzTVpKzVXEgAr4xc.rMqCeRj9SP1F.04R1C/Nc2Irda.KxQSTJvb2'), /*passwordAdmin*/
('22222222', 'Quality', 'GodIT', 'QA', 'QA22222222','$2y$05$TQ/EJ/7gZlXJQo06wWR1o.OkFL45YK6uyWoLV1MTTUkYQrWh7iNRy'), /*passwordQA*/
('33333333', 'Customer', 'is_A_God', 'User', 'User33333333','$2y$05$iBRt4lcZDw28noCpnYkzj.CMyDjMt2zcvDMt6jko1BmMBvS27rZhi'); /*passwordUser*/
