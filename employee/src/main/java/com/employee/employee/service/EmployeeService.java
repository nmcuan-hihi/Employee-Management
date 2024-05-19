package com.employee.employee.service;

import com.employee.employee.model.Employee;

import java.util.List;

public interface EmployeeService {
    public Employee addEmployee(Employee employee) ;
    public List<Employee> getAllEmployee();
}
