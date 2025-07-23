"use client"
import useCustomTheme from '@/hooks/useTheme'; 
import { Flex, HStack, Image, Text } from '@chakra-ui/react'; 
import React from 'react' 
import { useRouter } from 'next/navigation'; 
import { IUser } from '@/helpers/models/user';
import { textLimit } from '@/helpers/utils/textlimit';
import { capitalizeFLetter } from '@/helpers/utils/capitalLetter';
import { IMAGE_URL } from '@/helpers/services/urls';
import UserImage from './userImage';

export default function ProductImageScroller({ images, userData, createdDate, height, rounded, objectFit }: { images: Array<string>, userData?: IUser, createdDate?: string, height?: any, rounded?: string, objectFit?: string }) {


    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const { push } = useRouter()

    const { secondaryBackgroundColor } = useCustomTheme()

    React.useEffect(() => {
        if (images?.length > 1) {
            const interval = setInterval(() => {
                setActiveImageIndex((prev) => {
                    if (prev === images.length - 1) {
                        return 0;
                    }
                    return prev + 1;
                });
            }, 8000);
            return () => clearInterval(interval);
        }
    }, []) 

    const clickHandler =(e: any)=> {
        e.stopPropagation()
        push(`/dashboard/profile/${userData?.userId}`)
    } 
 
    return (
        <Flex cursor='pointer' w='full' h={"fit-content"} bgColor={secondaryBackgroundColor} p={objectFit ? "0px" : ["3px", "3px", "2"]} borderTopRadius={rounded ?? '10px'} borderBottomRadius={rounded ?? "0px"} overflow={'hidden'} justifyContent={"center"} alignItems={"center"} position={'relative'} >
            {createdDate && (
                <Flex as={"button"} onClick={(e)=> clickHandler(e)}  position={"absolute"} zIndex={"10"} left={"2"} top={"2"} bgColor={"#C4C4C499"} p={"1"} rounded={"full"} w={"fit-content"} alignItems={"center"} gap={2} >
                    <UserImage user={userData} size={"md"} />
                    <Flex flexDir={"column"} alignItems={"start"} pr={"3"} >
                        <Text display={["none", "none", "block"]} fontSize={"12px"} fontWeight={"600"} color={"white"} >
                            {textLimit(capitalizeFLetter(userData?.firstName) + " " + capitalizeFLetter(userData?.lastName), 15)}
                        </Text>
                        <Text display={["block", "block", "none"]} fontSize={"12px"} fontWeight={"600"} color={"white"} >
                            {textLimit(capitalizeFLetter(userData?.firstName) + " " + capitalizeFLetter(userData?.lastName), 10)}
                        </Text>
                        <Text fontSize={"10px"} color={"white"} >
                            {createdDate}
                        </Text>
                    </Flex>
                </Flex>
            )}
            {images?.length > 1 && (
                <Flex position={"absolute"} zIndex={"10"} bottom={"10px"} height={"15px"} width={'full'} justifyContent={"center"} gap={1}>
                    {images.map((image, index) => (
                        <Flex key={index.toString()} cursor={'pointer'} onClick={() => setActiveImageIndex(index)} width={activeImageIndex === index ? "10px" : "5px"} height={activeImageIndex === index ? "10px" : "5px"} borderRadius={activeImageIndex === index ? "10px" : "5px"} bg={activeImageIndex === index ? "white" : "white"} scale={activeImageIndex === index ? 1 : 1} ></Flex>
                    ))}
                </Flex>
            )}

            {images?.length > 0 && (
                <Image rounded={ rounded ?? "8px"} cursor='pointer' src={images[activeImageIndex]?.startsWith('https://') ? images[activeImageIndex] : (IMAGE_URL as string) + images[activeImageIndex]} alt="bannerimage" h={height ?? ["144px", "174px", "174px"]} w={"auto"} objectFit={objectFit ?? "contain"} />
            )}
            <Flex bgColor={"#000"} opacity={"10%"} pos={"absolute"} inset={"0px"} borderTopRadius={rounded ?? '10px'} />
        </Flex>
    )
}
