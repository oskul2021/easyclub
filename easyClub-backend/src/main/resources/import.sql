INSERT INTO roles(name) VALUES('User');
INSERT INTO roles(name) VALUES('Moderator');
INSERT INTO roles(name) VALUES('Admin');
INSERT INTO roles(name) VALUES('Executive');

INSERT INTO app_user(birth_date, first_name, last_name, custom_password, email, locked, mobile_number, password, phone_number, username,city, street, housenumber, post_code)  VALUES('2000-05-26','Levin', 'Kerschberger', false, 'levinkerschberger@gmail.com', true,'01576354821', '$2a$12$/s15AERBNycatBWciw4XmOU6t5MP/2gEfySLsjyLtkl8cMQVPXPbC','0742651406', 'lekeit00', 'Stuttgart', 'Cottastraße', '6', '70176');
INSERT INTO app_user(birth_date, first_name, last_name, custom_password, email, locked, mobile_number, password, phone_number, username,city, street, housenumber, post_code)  VALUES('2000-05-26','Lukas', 'Lösch', false, 'lösch@gmail.com', true,'01576354821', '$2a$12$/s15AERBNycatBWciw4XmOU6t5MP/2gEfySLsjyLtkl8cMQVPXPbC','0742651406', 'leukos00', 'Stuttgart', 'Cottastraße', '6', '70176');
INSERT INTO app_user(birth_date, first_name, last_name, custom_password, email, locked, mobile_number, password, phone_number, username,city, street, housenumber, post_code)  VALUES('2000-01-01','Admin', 'Admin', false, 'admin@example.com', true,'0123456789', '$2a$12$ib141mZmwe2LxWi1UUSaE.Wb3Vc2Qu6Gy25bocCzU67IlwGy5E.4m','0123456789', 'admin', 'Adminhausen', 'Adminstraße', '1', '12345');
INSERT INTO app_user(birth_date, first_name, last_name, custom_password, email, locked, mobile_number, password, phone_number, username,city, street, housenumber, post_code)  VALUES('2000-01-01','Pascal', 'Kasper', false, 'pascal@example.com', true,'0123456789', '$2a$12$/s15AERBNycatBWciw4XmOU6t5MP/2gEfySLsjyLtkl8cMQVPXPbC','0123456789', 'pascal', 'Deggingen', 'Schlater Straße', '1', '12345');
INSERT INTO app_user(birth_date, first_name, last_name, custom_password, email, locked, mobile_number, password, phone_number, username,city, street, housenumber, post_code)  VALUES('1998-08-25','Christian', 'Achstetter', false, 'christian@example.com', true,'0123456789', '$2a$12$/s15AERBNycatBWciw4XmOU6t5MP/2gEfySLsjyLtkl8cMQVPXPbC','0123456789', 'christian', 'Stuttgart', 'Boecklerstraße', '18', '70199');

INSERT INTO app_events(name,category,location,startdate,enddate,starttime,endtime,description,allday) VALUES('Stuttgart vs Esslingen', 'Basketball','Esslingen', '2023-01-26', '2023-01-26','12:00','16:00', 'U20 Spiel',false);
INSERT INTO app_events(name,category,location,startdate,enddate,starttime,endtime,description,allday) VALUES('Plochingen vs Esslingen', 'Basketball','Plochingen','2023-02-24', '2023-02-24','12:00','16:00', 'U16 Spiel',false);
INSERT INTO app_events(name,category,location,startdate,enddate,starttime,endtime,description,color,allday) VALUES('Stuttgart vs Esslingen', 'Fußball','Stuttgart', '2023-03-21', '2023-03-21','12:00','16:00',  'U12 Spiel','yellow', false);
INSERT INTO app_events(name,category,location,startdate,enddate,starttime,endtime,description,allday) VALUES('Stuttgart vs Esslingen', 'Basketball','Esslingen', '2023-04-22', '2023-04-22','12:00','16:00', 'U12 Spiel',false);
INSERT INTO app_events(name,category,location,startdate,enddate,starttime,endtime,description,allday) VALUES('Stuttgart vs Esslingen', 'Basketball','Esslingen', '2023-04-25', '2023-04-25','16:00','18:00',  'U16 Spiel',false);
INSERT INTO app_events(name,category,location,startdate,enddate,starttime,endtime,description,color,allday) VALUES('Plochingen vs Esslingen', 'Fußball','Esslingen', '2023-05-25', '2023-05-25','12:00','16:00',  'U16 Spiel','yellow',false);
INSERT INTO app_events(name,category,location,startdate,enddate,starttime,endtime,description,allday) VALUES('Stuttgart vs Esslingen', 'Basketball','Esslingen', '2023-04-22', '2023-04-22','16:00','18:00',  'U14 Spiel',false);
INSERT INTO app_events(name,category,location,startdate,enddate,description,color,allday) VALUES('Basketball Turnier', 'Basketball','Esslingen', '2023-04-22', '2023-04-26',  'U14 Spiel','yellow',true);

--user: admin, pw: adminadmin
--all other users: pw: useruser
INSERT INTO app_group(description, name) VALUES('Erste Gruppe', 'Gruppe 1');
INSERT INTO app_group(description, name) VALUES('Zweite Gruppe', 'Gruppe 2');
INSERT INTO app_group(description, name) VALUES('Dritte Gruppe', 'Gruppe 3');

INSERT INTO user_roles(user_id, role_id) VALUES (1,1);
INSERT INTO user_roles(user_id, role_id) VALUES (1,3);
INSERT INTO user_roles(user_id, role_id) VALUES (2,1);
INSERT INTO user_roles(user_id, role_id) VALUES (2,3);
INSERT INTO user_roles(user_id, role_id) VALUES (3,1);
INSERT INTO user_roles(user_id, role_id) VALUES (3,3);
INSERT INTO user_roles(user_id, role_id) VALUES (4,1);
INSERT INTO user_roles(user_id, role_id) VALUES (5,1);
INSERT INTO user_roles(user_id, role_id) VALUES (5,3);
INSERT INTO user_roles(user_id, role_id) VALUES (5,4);

INSERT INTO app_user_group(group_id, app_user_id) VALUES(1,3);
INSERT INTO app_user_group(group_id, app_user_id) VALUES(1,2);
INSERT INTO app_user_group(group_id, app_user_id) VALUES(1,1);
INSERT INTO app_user_group(group_id, app_user_id) VALUES(1,4);
INSERT INTO app_user_group(group_id, app_user_id) VALUES(1,5);

INSERT INTO app_user_group(group_id, app_user_id) VALUES(2,4);
INSERT INTO app_user_group(group_id, app_user_id) VALUES(2,1);
INSERT INTO app_user_group(group_id, app_user_id) Values(2,5);

INSERT INTO app_user_group(group_id, app_user_id) VALUES(3, 5);
INSERT INTO app_user_group(group_id, app_user_id) VALUES(3, 2);

INSERT INTO club(id, city, house_number, name, non_profit_association_approval, post_code, purpose_of_association, street, tax_number, tax_office)  VALUES('1', 'Stuttgart','34', 'SchachLegendsCannstatt', '2008-02-11', '70176', 'Schach spielen blabla', 'Schlossallee', '324564', 'Finanzamt Stuttgart 2');
INSERT INTO account_posting(id, account_donor_id, amount, bic, booking_date, booking_finished_date, booking_text, donation_receiver_id, iban, type, usage_text) VALUES (2, 1, 123, 'GENODEFS01', '2023-01-10', '2023-01-12', 'für neue Schachbretter..', 1, 'DE68499758376664', 1, 'Spende');
INSERT INTO account_posting(id, account_donor_id, amount, bic, booking_date, booking_finished_date, booking_text, donation_receiver_id, iban, type, usage_text) VALUES (3, 2, 30, 'GENODEFS01', '2023-02-08', '2023-02-12', 'Heizkostenspende', 1, 'DE68499758376664', 1, 'Spende');
INSERT INTO account_posting(id, account_donor_id, amount, bic, booking_date, booking_finished_date, booking_text, donation_receiver_id, iban, type, usage_text) VALUES (4, 3, 210, 'GENODEFS01', '2023-01-01', '2023-01-02', 'für neue Schachfiguren', 1, 'DE68499758376664', 1, 'Spende');
INSERT INTO account_posting(id, account_donor_id, amount, bic, booking_date, booking_finished_date, booking_text, donation_receiver_id, iban, type, usage_text) VALUES (5, 2, 10, 'GENODEFS01', '2022-011-14', '2022-011-17', 'Bratwurst', 1, 'DE68009758344469', 1, 'Spende');
INSERT INTO account_posting(id, account_donor_id, amount, bic, booking_date, booking_finished_date, booking_text, donation_receiver_id, iban, type, usage_text) VALUES (6, 3, 20, 'GENODEFS01', '2021-07-05', '2021-07-8', 'Jugendförderung..', 1, 'DE68009758344469', 1, 'Spende');
INSERT INTO account_posting(id, account_donor_id, amount, bic, booking_date, booking_finished_date, booking_text, donation_receiver_id, iban, type, usage_text) VALUES (7, 3, 45, 'GENODEFS01', '2021-011-01', '2021-011-4', 'Lampen', 1, 'DE68009758344469', 1, 'Spende');
INSERT INTO account_posting(id, account_donor_id, amount, bic, booking_date, booking_finished_date, booking_text, donation_receiver_id, iban, type, usage_text) VALUES (8, 4, 10, 'GENODEFS01', '2020-012-24', '2020-012-24', 'Weihnachtsgeschenk', 1, 'DE68009758344469', 1, 'Spende');

/*INSERT INTO app_events(user_id, role_id) VALUES (4,1); */