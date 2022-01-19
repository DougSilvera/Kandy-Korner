import React from "react";
import { useState, useEffect } from "react";

export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])
    const [orderedItems, setOrderedItems] = useState([])
    const customerPurchases = purchases.filter((purchase) => purchase.customerId === parseInt(localStorage.getItem("kandy_customer")));
    

    useEffect ( () => {
        fetch(`http://localhost:8088/purchases/?_expand=customer`)
            .then((resp) => resp.json())
            .then((data) => {
                setPurchases(data);
            })
    },
    [] 
    )


    useEffect(() => {
        fetch("http://localhost:8088/purchaseItems?_expand=product")
        .then((resp) => resp.json())
        .then((data) => {
            setOrderedItems(data)
        })
    },
    []
    )
    
    return(
    <>
        <h1>Purchases</h1>
        {
            customerPurchases.map((purchaseObject) => {
                const transactionItems = orderedItems.filter((transactionOrderedItem) => transactionOrderedItem.purchaseId === purchaseObject.id)
                const purchaseTotal = transactionItems.map( transactionItem => transactionItem.product.price)
                function simpleArraySum(ar) {
                    var sum = 0;
                    for (var i = 0; i < ar.length; i++) {
                      sum += ar[i];
                    }
                    return sum.toFixed(2);
                  }
                  
                return <section className="purchase_card" key={`purchase--${purchaseObject.id}`}>
                    <p>Transaction #: {purchaseObject.id}</p>
                    <p>Customer: {purchaseObject.customer.name}</p>
                    <p>Shipping Address: {purchaseObject.customer.address} {purchaseObject.customer.city}, {purchaseObject.customer.state} {purchaseObject.customer.zip}</p>
                    <ul>
                        {transactionItems.map((transactionItemObject) => { 
                            return <li key={`products--${transactionItemObject.product.id}`}>{transactionItemObject.product.name}</li>
                        })}


                    </ul>
                    <p>Order Total ${`${simpleArraySum(purchaseTotal)}`}</p>
                </section>
            })
        }
    </>

    )
}