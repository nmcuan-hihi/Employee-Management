// EmployeeProvider.js
import React, { createContext, useState } from 'react'; // Import useState từ react

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employeeData, setEmployeeData] = useState([]); // Sử dụng useState

  return (
    <EmployeeContext.Provider value={{ employeeData, setEmployeeData }}>
      {children}
    </EmployeeContext.Provider>
  );
};
