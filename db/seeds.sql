INSERT INTO department(dep_names)
VALUES
('SALES'),
('TECHNICIAN'),
('HUMAN RESOURCES'),
('FINANCE');

INSERT INTO roles(title, salary, department_id)
VALUES
('Sales Manager', 100000, 1),
('Sales Associate', 50000, 1),
('Junior Technician', 60000, 2),
('Senior Technician', 100000, 2),
('Senior HR', 60000, 3),
('HR assisant', 45000, 3),
('Finance Manager', 100000, 4),
('Finance Associate', 50000, 4);

INSERT INTO employee(first_name, last_name, roles_id)
VALUES
('Tim', 'Baker', 1),
('Jessica', 'Beil', 1),
('Tommy', 'Lee', 2),
('Josh', 'Watson', 2),
('Jeremy', 'Crenshaw', 3),
('Deborah', 'Hall', 3),
('Erica', 'Howell', 4),
('Katie', 'Smalls', 4);