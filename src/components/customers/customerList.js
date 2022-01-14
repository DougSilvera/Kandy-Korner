import React from "react";
import { useEffect, useState } from "react";

export const CustomerList = () => {
    const [customers, setCustomer] = useState([])

    useEffect (() => {
        fetch("http://localhost:8088/customers")
            .then((resp) => resp.json())
            .then((data) => {
                setCustomer(data)
            })
    },
    []
    )

    return (
        <>
            <h1>Customers</h1>
            {
                customers.map((customerObject) => {
                    return <section className="customer_card" key={`customer--${customerObject.id}`}><p>Name: {customerObject.name}</p>
                                    <p>Email: {customerObject.email} </p>
                    </section> 
                })
            }
        </>
    )
}