DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments(
    departmentsId INT AUTO_INCREMENT PRIMARY KEY,
    departments_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    rolesid INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL,
    departmentId INT NOT NULL,
        FOREIGN KEY (departmentId) REFERENCES departments(departmentsId)
);

CREATE TABLE employees (
    employeesId INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    rolesId INT NOT NULL,
        FOREIGN KEY (rolesId) REFERENCES roles(rolesid)
    managerId INT,
        FOREIGN KEY (managerId) REFERENCES employees(employeesId)
);

SELECT*FROM departments;

SELECT*FROM roles;

SELECT*FROM employees;

