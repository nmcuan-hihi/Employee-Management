package com.employee.employee.repostory;

import com.employee.employee.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepostory extends JpaRepository<Employee, String> {
}
