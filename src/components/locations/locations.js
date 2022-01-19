import React, {useEffect, useState} from "react"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    const [totalLocationsMessage, updateMessage] = useState("")
    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then(
                    (locations) => {setLocations(locations)}
                )
        },
        []

    )
    useEffect(
        () => {
            updateMessage(`${locations.length} locations to serve you!`)
        },
        [locations]
    )

    return (
        <>
        {
         <h3>{totalLocationsMessage}</h3>
        }
        <div className="location__object">
        {
             locations.map((locationObject) => {
                return <section className="location__card" key={`location--${locationObject.id}`}>
                    <p>{locationObject.name}</p>
                    <p>Address: {locationObject.address} {locationObject.city}, {locationObject.state} {locationObject.zip}</p>
                    <p>Phone: {locationObject.phone}</p>
                </section>
            
            })
        }
        </div> 
        </>
    )
}