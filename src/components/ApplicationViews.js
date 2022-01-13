import React from "react";
import { LocationList } from "./locations/locations";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { ProductList } from "./products/products";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeForm } from "./employees/NewEmployeeForm";

export const ApplicationViews = () => {
    return (
        <>
            <Route path= "/locations">
                <LocationList />
            </Route>
            <Route path= "/products">
                <ProductList />
            </Route>
            <Route exact path= "/employees">
                <EmployeeList />
            </Route>
            <Route path="/employees/addNewHire">
                <EmployeeForm />
            </Route>
        </>
    )
}