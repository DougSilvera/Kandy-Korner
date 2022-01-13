import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export const EmployeeList = () => {
    const history = useHistory()
    const [employees, setEmployees] = useState([]);
    const [totalEmployeeMessage, updateMessage]= useState("")
    const mgrState = (employee) => {
        if (employee.manager === true) {
            return "Yes"
        } else {return "No"}
    }
    useEffect(
        () => {
        fetch("http://localhost:8088/employees?_expand=location&_sort=locationId")
            .then((response) => response.json())
            .then((employees) => {
                setEmployees(employees);
            })
    },
    []
    )
    useEffect(
        () => {
            updateMessage(`Kandy Korner has ${employees.length} employees`)
        }
    )
    return (
        <>
            <h1>Employees</h1>
            <button onClick={() => history.push("/employees/addNewHire")}>
        Add New Employee
      </button>
            {
            <div>{totalEmployeeMessage}</div>
            }
            {
                employees.map((employeeObject) => {
                    return <section className="employee__card" key={`employee--${employeeObject.id}`}>
                        <p>Location: {employeeObject.location.name}</p>
                        <p>Name: {employeeObject.name}</p>
                        <p>Phone: {employeeObject.phone}</p>
                        <p>Manager: {mgrState(employeeObject)}</p>
                    </section>
                })

            }
        </>
    )
}