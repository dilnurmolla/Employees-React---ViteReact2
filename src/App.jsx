import { useState } from "react"; 

import Header from "./components/Header";
import AddEmployeeModal from "./components/AddEmployeeModal";
import EditModalEmployee from "./components/EditModalEmployee";
import EmployeeList from "./components/EmployeeList";

function App(){

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Thomas Hardy",
      email: "thomashardy@gmail.com",
      address: "89 Chiaroscuro Rd, Portland, USA",
      phone: "(171) 555-2222"
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  function addEmployee(newEmployee){
     setEmployees(prevEmployees => [...prevEmployees,
      {
        ...newEmployee,
        id: Math.max(...prevEmployees.map(emp => emp.id), 0) + 1
      }
     ])
  }

  function editEmployee(updatedEmployee){
    console.log("updatedEmployee", updatedEmployee);

    setEmployees(prevEmployees => { 
    return prevEmployees.map(emp => {
        return emp.id === updatedEmployee.id ? updatedEmployee : emp
      }) 
    });
  }

  function editClick(employee){
     setIsEditModalOpen(true);
     setSelectedEmployee(employee);
  }


  function openAddModal(){
    console.log("yaptık");
    setIsAddModalOpen(true);
  }

  function onCloseAddModal(){
    console.log("kapatsak mi ustu");
    setIsAddModalOpen(false);

  }

  function CloseEditModal(){
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  }

      return(
         <div className='container'>
        <div className="table-wrapper">
          <Header onOpenAddModal={openAddModal} />
          <EmployeeList employees={employees} onEditClick={editClick}/>
          <AddEmployeeModal isOpen={isAddModalOpen} onCloseAddModal={() => setIsAddModalOpen(false)} onAddEmployee={addEmployee}/>
          <EditModalEmployee isOpen={isEditModalOpen} 
          employee={selectedEmployee}
          onCloseEditModal={CloseEditModal} 
          onEditEmployee={editEmployee}/>
        </div>
      </div>
  )

}


export default App;