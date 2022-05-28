
INSERT INTO departments(departments_name)
VALUES
('SALES'),
('TECHNICIAN'),
('HUMAN RESOURCES'),
('FINANCE');

INSERT INTO roles(title, salary, departmentsId)
VALUES
('Manager', 100000, 1),
('Sales Associate', 50000, 1),
('Junior Technician', 60000, 2),
('Senior Technician', 100000, 2),
('Senior HR', 60000, 3),
('HR assisant', 45000, 3),
('Finance Manager', 100000, 4),
('Finance Associate', 50000, 4);

INSERT INTO employees(first_name, last_name, rolesId, managerId)
VALUES
('Tim', 'Baker', 1, NULL),
('Jessica', 'Beil', 1, 1),
('Tommy', 'Lee', 2, 1),
('Josh', 'Watson', 2, 1),
('Jeremy', 'Crenshaw', 3, 1),
('Deborah', 'Hall', 3, NULL),
('Erica', 'Howell', 4, 1),
('Katie', 'Smalls', 4, 1);