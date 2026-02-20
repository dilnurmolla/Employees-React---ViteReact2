import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

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


function Header({onOpenAddModal}){
  return(
      <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
						<h2>Manage <b>Employees</b></h2>
					</div>
					<div className="col-sm-6">
      <button  onClick={onOpenAddModal} className="btn btn-success"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></button>
				<a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>Delete</span></a>
					</div>
                </div>
            </div>
  )
}

function AddEmployeeModal({isOpen, onCloseAddModal, onAddEmployee}){

  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    address: '',
    phone: '',
    gender: '',
    department: ''
  })

  function handleChange(e){
    const {name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log("bu da halloldu");
    onAddEmployee(formData);
    onCloseAddModal();
    setFormData({
      name: '',
      email: '',
      address: '',
      phone: '',
      gender: '',
      department: ''
    })
  }

  function handleCancel(){
    onCloseAddModal();
    setFormData({
      name: '',
      email: '',
      address: '',
      phone: '',
      gender: '',
      department: ''
    })
  }

  if(!isOpen)return null;
  return (
    <>

	<div id="AddEmployeeModal" className="modal fade show">
  <div className="modal-dialog">
  <div className="modal-content">
        <form onSubmit={handleSubmit}>
    <div className="modal-header">						
						<h4 className="modal-title">Add Employee</h4>
						<button onClick={onCloseAddModal} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
{/* React sentetik eventi, html DOM hemen hemen aynısı 
ama sentetik olması tüm tarayıcılar için aynı çalışmasını sağlıyor.*/}					
          </div>
          <div className="modal-body">					
						<div className="form-group">
							<label>Name</label>
							<input type="text" 
              className="form-control" 
              required
              name='name'
              value={formData.name}
              onChange={handleChange}
              />
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="email" 
              className="form-control" 
              required
              name='email'
              value={formData.email}
              onChange={handleChange}
              />
						</div>
						<div className="form-group">
							<label>Address</label>
							<textarea 
              className="form-control" 
              required
              name='address'
              value={formData.address}
              onChange={handleChange}
              ></textarea>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input type="text" 
              className="form-control" 
              required
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              />
						</div>	
           <div className="form-group">
  <label>Gender</label>
  <div>
    <label style={{ marginRight: 12 }}>
      <input
        type="radio"
        name="gender"
        value="Male"
        checked={formData.gender === "Male"}
        onChange={handleChange}
      />{" "}
      Male
    </label>

    <label>
      <input
        type="radio"
        name="gender"
        value="Female"
        checked={formData.gender === "Female"}
        onChange={handleChange}
      />{" "}
      Female
    </label>
  </div>
</div>
<div className='form-group'>
  <label>Department</label>
 <div>
   <select
     name = "department"
     value={formData.department}
     onChange={handleChange}>

    <option value="" disabled>Select Department</option>
    <option value="Finance">Finance</option>
    <option value="HR">HR</option>
    <option value="Development">Development</option>
  </select>
 </div>
</div>
        </div>
          <div className="modal-footer">
						<button onClick={handleCancel} type="button" className="btn btn-default">Cancel</button>
						<button type="submit" className="btn btn-success">Add</button>
					</div>
        </form>
  </div>
  </div>
  </div>
  <div className="modal-backgrop fade show"></div>

  </>
  )
}

function EmployeeList({ employees }){
  console.log("emp", employees);
  return(
    <table className="table table-striped table-hover">
                <thead>
                    <tr>
						<th>
							<span className="custom-checkbox">
								<input type="checkbox" id="selectAll"/>
								<label htmlFor="selectAll"></label>
							</span>
						</th>
                        <th>Name</th>
                        <th>Email</th>
						            <th>Address</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    employees.map( employee => (
                      <EmployeeItem key={employee.id} employee={employee}/>
                    ))
                  }
                </tbody>
            </table>
  )
}

function EmployeeItem({employee}){
  return(
           <tr>
						<td>
							<span className="custom-checkbox">
								<input type="checkbox" id="checkbox1" name="options[]" value="1"/>
								<label htmlFor="checkbox1"></label>
							</span>
						</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
						            <td>{employee.address}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.department}</td>
                        <td>
                            <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
