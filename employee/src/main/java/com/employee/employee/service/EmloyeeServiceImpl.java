package com.employee.employee.service;

import com.employee.employee.model.Employee;
import com.employee.employee.repostory.EmployeeRepostory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmloyeeServiceImpl implements  EmployeeService{
    @Autowired
    private EmployeeRepostory employeeRepostory;


    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepostory.save(employee);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepostory.findAll();
    }
}
