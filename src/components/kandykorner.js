import React from "react"
import { ApplicationViews } from "./ApplicationViews"
import { LocationList } from "./locations/locations"
import { NavBar } from "./Nav/NavBar"
import { ProductList } from "./products/products"


export const KandyKorner = () => {
    return (
        <>
        <NavBar />
        <h1>Kandy Korner Sweets</h1>
        <h2>Serving Chattanooga since 1987!</h2>
        <ApplicationViews />
        
        
    </>)
}