import React, {useEffect, useState} from "react"

export const ProductList = () => {
    const [products, setProduct] = useState([])
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

                </div>
            })
        }
        </div>
        </>
    )
}