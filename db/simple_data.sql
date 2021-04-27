insert into `customer` (customer_id, customer_name) values 
('1', 'Michael'),
('2', 'Sofie');

insert into `project` (project_id, project_name, customer_id) values
('1', 'TestProjectA', '1'),
('2', 'TestProjectB', '1'),
('3', 'TestProjectC', '2');


insert into `employee` (employee_id, first_name, last_name, position, username ,password) values 
(11111111, 'Jame', 'Olara', 'Admin', 'Admin11111111', '$2y$05$WzTVpKzVXEgAr4xc.rMqCeRj9SP1F.04R1C/Nc2Irda.KxQSTJvb2'), /*passwordAdmin*/
(22222222, 'Quality', 'GodIT', 'QA', 'QA22222222','$2y$05$TQ/EJ/7gZlXJQo06wWR1o.OkFL45YK6uyWoLV1MTTUkYQrWh7iNRy'), /*passwordQA*/
(33333333, 'Customer', 'is_A_God', 'User', 'User33333333','$2y$05$iBRt4lcZDw28noCpnYkzj.CMyDjMt2zcvDMt6jko1BmMBvS27rZhi'), /*passwordUser*/
(44444444, 'Adam', 'maroonfive', 'QA', 'QAadam','$2y$12$YHdsGvTIULO4iuqa39iNUenUKw3jJwZBrQtk9HP79cva90NJElzji'), /*Adam578943256*/
(55555555, 'pedkai', 'waijao', 'QA', 'QApedkai','$2y$12$/3oyYUrUm03sj4INThdVD.jP7TwufOL/HPDvSqpEH6g/3G8fHs4jS'), /*pedkai123456*/
(66666666, 'padthai', 'maisaipak', 'User', 'UserPadthai','$2y$12$r9h2uwucF2.BhfT6L1UPU.zjYEvNkSwwag9JNexXl67U1ZVLxi8ha'), /*padthainaja*/
(77777777, 'somying', 'mahakai', 'User', 'UserSomying','$2y$12$CbSCvKNJNH4Zh9pzJ1mrruLDDYpnvYdp.1XMXY4SEYA260Qpj1L9G'), /*maha6534864651*/
(88888888, 'peter', 'parker', 'User', 'UserPeter','$2y$12$A9S/ewoGpDtm2cods117YuonNeel0SoQ56AdidwfLdPNK6gwhwm9K'), /*IamSpiderman*/
(99999999, 'sommai', 'kloyjai', 'Admin', 'AdminSommai','$2y$12$/WSedgjVsscZgeLIW6DFe.dOC88Hk4gTsDVuY1TPP1/P1SKc8aJAO'), /*som216516515*/
(10101010, 'somsuay', 'naja', 'Admin', 'AdminSomsuay','$2y$12$2rTO7Ck5WW5JNbejPDqS0usvfYcmRNOtpmvZPaCsS0iNyIE41QCRi'); /*somsuayInwZa007*/

insert into `project_employee` (project_id, employee_ID) values 
(1, 11111111),
(2, 22222222),
(3, 33333333),
(4, 44444444),
(5, 55555555),
(6, 66666666),
(7, 77777777),
(8, 88888888),
(9, 99999999),
(10, 10101010);
