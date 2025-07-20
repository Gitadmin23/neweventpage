"use client"
import { IMAGE_URL } from '@/helpers/services/urls';
import { useImage } from '@/helpers/store/useImagePicker';
import useCustomTheme from '@/hooks/useTheme';
import { GallaryIcon } from '@/svg';
import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { IoIosCloseCircle, IoMdAdd } from 'react-icons/io';

export default function ImagePicker(
    {
        preview = [],
        single
    }: {
        preview?: Array<string>,
        single?: boolean
    }
) {

    const {
        secondaryBackgroundColor,
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    const { image, setImage } = useImage((state) => state)
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    }; 

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files); 
            if(single){
                setImage([...fileArray]);
            } else {
                setImage([...image, ...fileArray]);
            }
        }
    };

    const removeImage = (indexToRemove: number) => {
        const clone = image.filter((_, index) => index !== indexToRemove)
        setImage(clone);
    };

    const removeImagePreview = (indexToRemove: number) => {
        const clone = preview.filter((_, index) => index !== indexToRemove)
        setImage(clone);
    };

    return (
        <Flex w={"full"} rounded={"12px"} borderStyle={"dashed"} borderWidth={"1px"} overflowX={"auto"} bgColor={secondaryBackgroundColor} h={"200px"} >
            <input
                type="file"
                multiple={single ? false : true}
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
            {(image?.length === 0 && preview?.length === 0) && (
                <Flex onClick={handleButtonClick} cursor={"pointer"} textAlign={"center"} gap={"3"} flexDir={"column"} w={"full"} justifyContent={"center"} alignItems={"center"} h={"full"} >
                    <GallaryIcon size='35px' />
                    <Flex flexDir={"column"} gap={"1"} maxW={"176px"} >
                        <Text fontSize={"13px"} fontWeight={"medium"} >Drag pictures here to upload</Text>
                        <Text fontSize={"8px"} >You can add up to 6 picture</Text>
                        <Text fontSize={"8px"} >File Format: JPG, JPEG, PNG and picture shouldn’t be more than 2 MB </Text>
                        <Text fontWeight={"bold"} textDecor={"underline"} color={primaryColor} fontSize={"10px"} >Upload from your device</Text>
                    </Flex>
                </Flex>
            )}
            {preview?.length > 0 && (
                <Flex w={"fit"} gap={"3"} p={"4"} >
                    {preview.map((file, index) => (
                        <Flex pos={"relative"} h={"full"} w={"180px"} >
                            <Image
                                w={"full"}
                                h={"full"}
                                rounded={"2xl"}
                                src={IMAGE_URL+file}
                                alt={`preview-${index}`}
                            />
                            <Flex onClick={() => removeImage(index)} cursor={"pointer"} pos={"absolute"} rounded={"full"} bgColor={mainBackgroundColor} zIndex={"20"} top={"-2"} right={"-2"} >
                                <IoIosCloseCircle color='red' size={"25px"} />
                            </Flex>
                        </Flex>
                    ))}
                    {/* <Flex onClick={handleButtonClick} cursor={"pointer"} pos={"relative"} bgColor={mainBackgroundColor} h={"full"} w={"180px"} justifyContent={"center"} alignItems={"center"} rounded={"2xl"} >
                        <IoMdAdd size={"50px"} />
                    </Flex> */}
                </Flex>
            )}
            {image?.length > 0 && (
                <Flex w={"fit"} gap={"3"} p={"4"} >
                    {image.map((file, index) => (
                        <Flex pos={"relative"} h={"full"} w={"180px"} >
                            <Image
                                w={"full"}
                                h={"full"}
                                rounded={"2xl"}
                                src={URL.createObjectURL(file)}
                                alt={`preview-${index}`}
                            />
                            <Flex onClick={() => removeImage(index)} cursor={"pointer"} pos={"absolute"} rounded={"full"} bgColor={mainBackgroundColor} zIndex={"20"} top={"-2"} right={"-2"} >
                                <IoIosCloseCircle color='red' size={"25px"} />
                            </Flex>
                        </Flex>
                    ))}
                    <Flex onClick={handleButtonClick} cursor={"pointer"} pos={"relative"} bgColor={mainBackgroundColor} h={"full"} w={"180px"} justifyContent={"center"} alignItems={"center"} rounded={"2xl"} >
                        <IoMdAdd size={"50px"} />
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
}; 