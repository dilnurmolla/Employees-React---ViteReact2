import { useState } from "react"; 

import Header from "./components/Header";
import AddEmployeeModal from "./components/AddEmployeeModal";
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

  function addEmployee(newEmployee){
     setEmployees(prevEmployees => [...prevEmployees,
      {
        ...newEmployee,
        id: Math.max(...prevEmployees.map(emp => emp.id), 0) + 1
      }
     ])
  }

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  function openAddModal(){
    console.log("yaptık");
    setIsAddModalOpen(true);
  }

  function onCloseAddModal(){
    console.log("kapatsak mi ustu");
    setIsAddModalOpen(false);

  }
      return(
         <div className='container'>
        <div className="table-wrapper">
          <Header onOpenAddModal={openAddModal} />
          <EmployeeList employees={employees}/>
          <AddEmployeeModal isOpen={isAddModalOpen} onCloseAddModal={() => setIsAddModalOpen(false)} onAddEmployee={addEmployee}/>
          </div>
          </div>
      )
  
}


export default App;