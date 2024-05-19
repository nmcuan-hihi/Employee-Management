package com.employee.employee.controller;

import com.employee.employee.model.Employee;
import com.employee.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
@CrossOrigin
public class EmloyeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAll")
    public List<Employee> getAllItem() {
        return employeeService.getAllEmployee();
    }

    @PostMapping("/add")
    public String add(@RequestBody Employee employee) {
        employeeService.addEmployee(employee);
        return employee.toString();
    }
}
