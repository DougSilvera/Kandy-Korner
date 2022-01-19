import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom"

export const ProductList = () => {
    const [products, setProduct] = useState([])
    const [selectedCandy, setSelectedCandy] = useState([])
    const history = useHistory()
    
        useEffect(
            () => {
                fetch("http://localhost:8088/products?_expand=productType&_sort=productTypeId")
                    .then(res => res.json())
                    .then((data) => {
                        setProduct(data)
                    })
            },
            []
        )
    
    const selectOrderCandy = (selectedCandyId) => {
        let selectedCandyCopy = [...selectedCandy]
        if (selectedCandy.includes(selectedCandyId)) {
            selectedCandyCopy = selectedCandyCopy.filter((productId) => productId !== selectedCandyId)
            setSelectedCandy(selectedCandyCopy)
        } else {
            selectedCandyCopy.push(selectedCandyId)
            setSelectedCandy(selectedCandyCopy)
        }
    }

    const submitOrder = () => {
        const newOrder = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            timestamp: Date.now()
        }
        fetch("http://localhost:8088/purchases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newOrder)
        }
        )
        .then((data) => data.json())
        .then((newOrder) => {
            const orderCandyPromises= selectedCandy.map((candyId) => {
                return fetch("http://localhost:8088/purchaseItems", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: candyId,
                        purchaseId: newOrder.id
                    })
                })
            })
            return Promise.all(orderCandyPromises)
        })
        .then (() => {
          setSelectedCandy([])  
        })
        .then(() => {
            history.push("/purchases")

        })
        
    }


    return (
        <>
        <h3>Products</h3>
        <div className="product__object">
        {
            products.map((product) => {
                return <div className="product__card" key={`product--${product.id}`}>
                    <p>{product.name}</p>
                    <p>${product.price}</p>
                    <p>Category: {product.productType.name}</p>
                    <label htmlFor="select-candy" id={`${product.id}`}>Add To Order <input type="checkbox" id={`${product.id}`} onChange={() => selectOrderCandy(product.id)} /></label>

                </div>
            })
        }
        </div>
        <button onClick={() => {submitOrder()}}>Submit Order</button>
        </>
    )
}