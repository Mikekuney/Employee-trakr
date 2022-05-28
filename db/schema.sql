DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments(
    departmentsId INTEGER AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    rolesId INTEGER AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL,
    departmentsId INTEGER NOT NULL,
    PRIMARY KEY (rolesId),
    FOREIGN KEY (departmentsId) REFERENCES departments(departmentsId)
);

CREATE TABLE employees (
    employeesId INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    rolesId INT NOT NULL,
    managerId INTEGER NULL,
    PRIMARY KEY (employeesId),
    FOREIGN KEY (rolesId) REFERENCES roles(rolesId),
    FOREIGN KEY (managerId) REFERENCES employees(employeesId)
);


