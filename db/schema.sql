

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dep_names VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    r_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL,
    department_id INT,
        CONSTRAINT fk_deparment FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
        CONSTRAINT fk_role FOREIGN KEY (roles_id) REFERENCES roles(r_id) ON DELETE CASCADE,
    manager_id INT,
        CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(emp_id) ON DELETE SET NULL
);

SELECT*FROM department;

SELECT*FROM roles;

SELECT*FROM employee;

