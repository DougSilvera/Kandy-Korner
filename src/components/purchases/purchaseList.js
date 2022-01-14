import React from "react";
import { useState, useEffect } from "react";

export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])

    useEffect ( () => {
        fetch("http://localhost:8088/purchases?_sort=timestamp&_order=desc&_expand=location&_expand=customer&_expand=employee")
            .then((resp) => resp.json())
            .then((data) => {
                setPurchases(data);
            })
    },
    [] 
    )
    return(
    <>
        <h1>Purchases</h1>
        {
            purchases.map((purchaseObject) => {
                return <section className="purchase_card" key={`purchase--${purchaseObject.id}`}>
                    <p>Transaction #: {purchaseObject.id}</p>
                    <p>Location: {purchaseObject.location.name}</p>
                    <p>Total: {purchaseObject.totalSpent}</p>
                    <p>Customer: {purchaseObject.customer.name}</p>
                    <p>Employee: {purchaseObject.employee.name}</p>
                </section>
            })
        }
    </>

    )
}