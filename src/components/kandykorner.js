import React from "react"
import { LocationList } from "./locations/locations"
import { ProductList } from "./products/products"


export const KandyKorner = () => {
    return (
        <>
        <h1>Kandy Korner Sweets</h1>
        <h2>Serving Chattanooga since 1987!</h2>

        {
            <LocationList />
        }
        {
            <div className="location"><ProductList /></div>
        }

        
    </>)
}