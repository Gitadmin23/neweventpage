"use client"

import { MapView } from "@/components/map_component"
import { ModalLayout } from "@/components/shared"
import { useMapModal } from "@/helpers/store/useMapModal"
import { textLimit } from "@/helpers/utils/textlimit"
import useCustomTheme from "@/hooks/useTheme"
import { Button, Flex, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

export default function SelectMapLocation(
    {
        latlng,
        value,
        setValue
    }: {
        latlng: string,
        value: string
        setValue: (name: string, value: any) => void,
    }
) {

    const { open, setOpen } = useMapModal((state) => state)
  
    const {
        borderColor, 
        mainBackgroundColor,
        headerTextColor
    } = useCustomTheme()

    const [marker, setMarker] = React.useState({} as any) 

    const selectLocation = (item: any) =>{
        console.log(item);
        setMarker(item) 
        setValue("location.latlng", item?.lat+" "+item.lng) 
    }


    const selectAddress = (item: any) =>{
        console.log(item);
        setValue("location.locationDetails", item) 
    }
 
    

    return (
        <Flex flexDir={"column"} gap={"0.5"} >
            <Text fontSize={"14px"} >Enter Address</Text>
            <Button onClick={() => setOpen(true)} w={"full"} minH={"45px"} color={headerTextColor} textAlign={"left"} display={"flex"} justifyContent={"start"} px={"3"} borderColor={borderColor} borderWidth={"1px"} bgColor={mainBackgroundColor} rounded={"full"} >
                {value ?  textLimit(value, 20) : "Select Location"}
            </Button>
            <ModalLayout size="lg" open={open} trigger={true} closeBtn={true} close={()=> setOpen(false)} >
                <MapView setAddress={selectAddress} marker={marker} setMarker={selectLocation} view={true} zoom={15} latlng={latlng} height={'40vh'} />
            </ModalLayout>
        </Flex>
    )
}