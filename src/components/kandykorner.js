import React from "react"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./Nav/NavBar"
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/login";
import { Register } from "./auth/register";




export const KandyKorner = () => (
    <>
    <Route
      render={() => {
        if (localStorage.getItem("kandy_customer")) {
          return (
            <>
              <NavBar />
              <h1>Kandy Korner Sweets</h1>
             <h2>Serving Chattanooga since 1987!</h2>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);