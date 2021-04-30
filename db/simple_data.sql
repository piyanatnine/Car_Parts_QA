insert into customer (customer_id, customer_name) values 
(1, 'Michael'),
(2, 'Sofie'),
(3, 'Oliver'),
(4, 'Jack'),
(5, 'Harry'),
(6, 'Thomas'),
(7, 'Emily'),
(8, 'Amelia'),
(9, 'Taylor'),
(10, 'Evans');


insert into project (project_id, project_name, customer_id) values
(1, 'TestProjectA', 1),
(2, 'TestProjectB', 1),
(3, 'TestProjectC', 2),
(4, 'TestProjectD', 3),
(5, 'TestProjectE', 4),
(6, 'TestProjectF', 3),
(7, 'TestProjectG', 5),
(8, 'TestProjectH', 5),
(9, 'TestProjectI', 6),
(10, 'TestProjectJ', 3),
(11, 'TestProjectK', 8),
(12, 'TestProjectL', 2),
(13, 'TestProjectM', 8),
(14, 'TestProjectN', 10),
(15, 'TestProjectO', 7),
(16, 'TestProjectP', 2),
(17, 'TestProjectQ', 10),
(18, 'TestProjectR', 9),
(19, 'TestProjectS', 4),
(20, 'TestProjectT', 4);


insert into employee (employee_id, first_name, last_name, position, username ,password) values 
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

insert into project_employee (project_id, employee_ID) values 
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

insert into part (part_number, part_name, part_drawing, project_id) values
(00000001, 'tail_light_left', 'drawing_001.pdf', 10),
(00000002, 'doors_1', 'drawing_002.pdf', 6),
(00000003, 'hoods', 'drawing_003.pdf', 8),
(00000004, 'mirrors_left', 'drawing_004.pdf', 1),
(00000005, 'grilles', 'drawing_005.pdf', 5),
(00000006, 'bumpers', 'drawing_006.pdf', 5),
(00000007, 'fenders', 'drawing_007.pdf', 4),
(00000008, 'radiator_supports', 'drawing_008.pdf', 3),
(00000009, 'wheels', 'drawing_009.pdf', 7),
(00000010, 'air_filter', 'drawing_010.pdf', 9),
(00000011, 'tail_light_right', 'drawing_011.pdf', 10),
(00000012, 'doors_2', 'drawing_012.pdf', 6),
(00000013, 'doors_3', 'drawing_013.pdf', 6),
(00000014, 'doors_4', 'drawing_014.pdf', 6),
(00000015, 'mirrors_right', 'drawing_015.pdf', 1),
(00000016, 'air_bags', 'drawing_016.pdf', 5),
(00000017, 'batterry', 'drawing_017.pdf', 4),
(00000018, 'afsdszff', 'drawing_018.pdf', 3),
(00000019, 'asffasas', 'drawing_019.pdf', 7),
(00000020, 'aafsfarr', 'drawing_020.pdf', 9),
(00000021, 'erytuiut', 'drawing_021.pdf', 2),
(00000022, 'ipojlkl', 'drawing_022.pdf', 1),
(00000023, 'qewretytuyi', 'drawing_023.pdf', 3),
(00000024, 'xzvhcjmv', 'drawing_024.pdf', 6),
(00000025, 'dsgfhhdg', 'drawing_025.pdf', 7),
(00000026, 'wqtwgdsb', 'drawing_026.pdf', 5),
(00000027, 'sdzhfgjhj', 'drawing_027.pdf', 9),
(00000028, 'styryshs', 'drawing_028.pdf', 3),
(00000029, 'ncfhh', 'drawing_029.pdf', 2),


insert into document (upload_no, file_name, document_url, document_type, status, part_number, uploader, upload_datetime, approver, approved_datetime, preceding_doc) values
(20000001, 'file001', 'document_001', 'Inspection', 'Approved', 00000005, 77777777, '2021-01-23 13:31:12',22222222 , '2021-01-24 15:23:02', null), 
(20000002, 'file002', 'document_002', 'Inspection', 'Approved', 00000005, 77777777, '2021-01-25 11:11:02', 44444444, '2021-01-26 10:53:03', 20000001), 
(20000003, 'file003', 'document_003', 'Work_Inst', 'Temporary', 00000001, 10101010, '2021-01-27 15:11:02', null, null,null), 
(20000004, 'file004', 'document_004', 'Q_Point', 'Approved', 00000006, 66666666, '2021-01-27 16:31:05', 55555555, '2021-01-28 10:13:33', null), 
(20000005, 'file005', 'document_005', 'Q_Point', 'Temporary', 00000006, 11111111, '2021-01-30 14:20:00', null, null, 20000004), 
(20000006, 'file006', 'document_006', 'Inspection', 'Approved', 00000010, 77777777, '2021-02-01 10:01:10', 55555555, '2021-02-02 9:23:13', null),  
(20000007, 'file007', 'document_007', 'Inspection', 'Temporary', 00000009, 99999999, '2021-02-05 09:11:52', null, null, null), 
(20000008, 'file008', 'document_008', 'Work_Inst', 'Approved', 00000001, 33333333, '2021-02-06 11:11:02', 44444444, '2021-02-08 10:58:25', 20000003),  
(20000009, 'file009', 'document_009', 'Inspection', 'Approved', 00000004, 88888888, '2021-02-09 12:59:00', 44444444, '2021-02-10 16:21:21', null),
(20000010, 'file010', 'document_010', 'Q_Point', 'Temporary', 00000001, 33333333, '2021-02-15 13:01:57', null, null,20000008); 

