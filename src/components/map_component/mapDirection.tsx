"use client"
import React, { useEffect, useState } from 'react'
import CustomButton from '../shared/customButton'
import { toaster } from '@/components/ui/toaster'

interface Props {
    latLng: string,
    setResult: any,
    myLocation: any
}

function EventDirection(props: Props) {
    const {
        latLng,
        setResult,
        myLocation
    } = props

    const [show, setShow] = useState(false)
    const [origin, setOrigin] = useState({} as any)
    const [destination, setDestination] = useState({} as any)

    useEffect(() => {
        // if (show) {

        navigator.geolocation.getCurrentPosition(
            (position) => { 

                setOrigin({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            }
        );

        setDestination({
            lat: Number(latLng.split(" ")[0]),
            lng: Number(latLng.split(" ")[1]),
        })
        // }  
    }, [])

    // const [directionsResponse, setDirectionsResponse] = useState(null);

    async function calculateRoute(originData: any, destinationData: any) {
        if (originData?.lat === "" && destinationData?.lat === "") {
            return;
        }
        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
                origin: originData,
                destination: destinationData,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setResult(result);
                    console.log(result);

                } else {
  
                    toaster.create({
                        title: `Error`,
                        description: "Directions request returned no results.",
                        type: "error",
                        closable: true
                    })
                    console.error(result);
                }
            }
        );

    }

    return (
        <CustomButton onClick={() => calculateRoute(myLocation, destination)} width={"fit-content"} text={!show ? "Show Direction" : "Hide Direction"} />
    )
}

export default EventDirection
