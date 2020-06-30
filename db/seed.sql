-- Run in MySQL to populate tables for viewing/updating --
USE company;

INSERT INTO department (name) VALUES ("research and development");
INSERT INTO department (name) VALUES ("human resources");
INSERT INTO department (name) VALUES ("marketing");
INSERT INTO department (name) VALUES ("executive");
INSERT INTO department (name) VALUES ("administration");

INSERT INTO role (title, salary, department_id) VALUES ("manager", 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("cashier", 30000, 2); 
INSERT INTO role (title, salary, department_id) VALUES ("salesperson", 50000, 3); 
INSERT INTO role (title, salary, department_id) VALUES ("photographer", 40000, 4); 
INSERT INTO role (title, salary, department_id) VALUES ("chef", 40000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Trout", 1, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Cody", "Bellinger", 2, 9);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Walker", "Buehler", 3, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Clayton", "Kershaw", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mookie", "Betts", 5, 6);