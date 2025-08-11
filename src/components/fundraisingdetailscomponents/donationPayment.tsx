
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Input, Text } from '@chakra-ui/react'

import React from 'react' 
import usePayStack from '@/hooks/usePayStack'
import { IDonationList } from '@/helpers/models/fundraising'
import { CustomButton } from '../shared'
import DonationTermAndCondition from '../shared/donationTermAndCondition'

export default function DonationPayment({ data, fullWidth }: { data?: IDonationList, fullWidth?: boolean }) {

    // const [value, setValue] = useState("")
    // const { googlesign ,setGoogle } = useModalStore((state) => state);

    const { payForDonation, setValue, value } = usePayStack()

    const {
        primaryColor,
        borderColor,
        headerTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    const donate = [
        "NGN 5000",
        "NGN 15000",
        "NGN 25000",
        "NGN 35000",
        "NGN 50000",
    ] 

    const clickHandler = () => {

        payForDonation.mutate({
            seller: data?.createdBy?.userId + "",
            price: Number(value),
            currency: "NGN",
            orderType: "DONATION",
            typeID: data?.id + ""
        })
    }


    return (
        <Flex bgColor={mainBackgroundColor} w={["full", "full", "full", fullWidth ? "full" : "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} p={["3", "3", "5"]}  >
            <Text fontSize={"18px"} fontWeight={"600"} >Enter the Amount</Text>
            {/* <Text fontSize={"14px"} >Enter the amount you wish to donate </Text> */}

            <Flex w={"fit-content"} flexWrap={"wrap"} gap={"2"}>
                {donate?.map((item) => (
                    <Flex key={item} as={"button"} onClick={() => setValue(item?.replace("NGN ", ""))} rounded={"32px"} h={"25px"} w={"80px"} borderWidth={"2px"} justifyContent={"center"} alignItems={"center"} color={item.replace("NGN ", "") === value ? primaryColor : headerTextColor} borderColor={item.replace("NGN ", "") === value ? primaryColor : borderColor} fontSize={"12px"} fontWeight={"600"}  >
                        {item}
                    </Flex>
                ))}
            </Flex>
            <Flex w={"full"} h={"50px"} pos={"relative"} >
                <Input value={value} placeholder='0' onChange={(e) => setValue(e.target.value)} w={"full"} h={"50px"} rounded={"32px"} pl={"8"} borderColor={borderColor} type='number' borderWidth={"1px"} />
                <Flex w={"fit-content"} h={"50px"} pos={"absolute"} justifyContent={"center"} alignItems={"center"} px={"4"} >
                    ₦
                </Flex>
            </Flex>
            <CustomButton text={"Donate"} loading={payForDonation?.isPending} onClick={clickHandler} borderRadius={"999px"} borderWidth={"1px"} borderColor={primaryColor} disable={value ? false : true} w={"full"} h={"50px"} rounded={"32px"} color={primaryColor} fontWeight={"600"} backgroundColor={"#EFF5F8"} _hover={{ backgroundColor: "#EFF5F8" }} >

            </CustomButton>
            <Flex w={"full"} justifyContent={"center"} >
                <DonationTermAndCondition refund={true} />
            </Flex>
        </Flex>
    )
}
