"use client"
import { IMAGE_URL } from '@/helpers/services/urls';
import { useImage } from '@/helpers/store/useImagePicker';
import useCustomTheme from '@/hooks/useTheme';
import { GallaryIcon, PictureIcon } from '@/svg';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosCloseCircle, IoMdAdd } from 'react-icons/io';
import { toaster } from '../ui/toaster';
import { convertAndCompressToPng } from '@/helpers/services/convertImage';

export default function ImagePicker(
    {
        preview = [],
        single,
        index: imageIndex = 0,
        setValue
    }: {
        preview?: Array<string>,
        single?: boolean,
        index?: number,
        setValue: (name: string, value: any) => void,
    }
) {

    const {
        secondaryBackgroundColor,
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    const { image, setImage } = useImage((state) => state)
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isLoading, setIsLoading] = useState("");

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const fileArray = Array.from(files);

            let dataLength = fileArray?.length + image?.length

            if (dataLength > 5) {
                toaster.create({
                    title: "Maximum Number Of Images to Upload is 5",
                    type: "error",
                    closable: true
                })
            } else {
                try {
                    const convertedFiles = await Promise.all(
                      fileArray.map((file) => convertAndCompressToPng(file, 800, 1920,
                        1080,
                        0.9,
                        setIsLoading
                    ))
                    ); 
                    setImage([...image, ...convertedFiles]);
                  } catch (err) {
                    toaster.create({
                      title: "Image conversion failed",
                      description: String(err),
                      type: "error",
                    });
                    setIsLoading("Image conversion failed");
                  } 
            }

        }

        // setIsLoading("");
    };



    const handleSingleImage = (e: any) => {

        const selected = e.target.files[0];

        const TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (selected && TYPES.includes(selected.type)) {
            const clone = [...image]
            clone[imageIndex ? imageIndex : 0] = selected
            setImage(clone)
        }
    }

    const removeImage = (indexToRemove: number) => {
        const clone = image.filter((_, index) => index !== indexToRemove)
        setImage(clone);
    };

    const removeImagePreview = (indexToRemove: number) => {
        const clone = preview.filter((_, index) => index !== indexToRemove)
        setValue("picUrls", clone);
    };

    return (
        <>
            {!single && (
                <Flex w={"full"} rounded={"12px"} borderStyle={"dashed"} borderWidth={"1px"} overflowX={"auto"} bgColor={secondaryBackgroundColor} h={"200px"} >
                    {isLoading && (
                        <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} >
                            <Text>{isLoading}</Text>
                        </Flex>
                    )}
                    <input
                        type="file"
                        multiple={single ? false : true}
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    {(image?.length === 0 && preview?.length === 0 && !isLoading) && (
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
                    {(image?.length > 0 || preview?.length > 0 && !isLoading) && (
                        <Flex w={"fit"} gap={"3"} p={"4"} >
                            {preview.map((file, index) => (
                                <Flex pos={"relative"} rounded={"2xl"} shadow={"2xl"} h={"full"} w={"180px"} >
                                    <Image
                                        w={"full"}
                                        h={"full"}
                                        rounded={"2xl"}
                                        src={IMAGE_URL + file}
                                        alt={`preview-${index}`}
                                    />
                                    <Flex onClick={() => removeImagePreview(index)} cursor={"pointer"} pos={"absolute"} rounded={"full"} bgColor={mainBackgroundColor} zIndex={"20"} top={"-2"} right={"-2"} >
                                        <IoIosCloseCircle color='red' size={"25px"} />
                                    </Flex>
                                </Flex>
                            ))}
                            {image.map((file, index) => (
                                <Flex pos={"relative"} rounded={"2xl"} shadow={"2xl"} h={"full"} w={"180px"} >
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
            )}
            {single && (
                <Flex width={"full"} flexDirection={"column"} gap={"4"} alignItems={"center"} >
                    <Flex as={"button"} width={["full", "361px"]} height={"228px"} border={"1px dashed #D0D4EB"} roundedBottom={"32px"} roundedTopLeft={"32px"} justifyContent={"center"} alignItems={"center"} >
                        {(!image[imageIndex] && preview?.length === 0) && (
                            <label role='button' style={{ width: "100%", display: "grid", height: "100%", placeItems: "center", gap: "16px" }} >
                                <Box width={"full"} >
                                    <Text fontSize={"sm"} >Click to upload image</Text>
                                    <Flex justifyContent={"center"} mt={"3"} gap={"2"} >
                                        <PictureIcon />
                                    </Flex>
                                </Box>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleSingleImage}
                                />
                            </label>
                        )}
                        {(image[imageIndex] || preview?.length > 0) && (
                            <label role='button' style={{ width: "100%", display: "grid", height: "228px", placeItems: "center", gap: "16px" }} >

                                {image[imageIndex] ? (
                                    <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} objectFit="cover" alt={"eventimage"} width={"full"} height={"228px"} src={URL.createObjectURL(image[imageIndex])} />
                                ) : (

                                    <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} objectFit="cover" alt={"eventimage"} width={"full"} height={"228px"} src={IMAGE_URL + preview[0]} />
                                )}

                                {/* {(!image[imageIndex]) &&
                                    <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} objectFit="cover" alt={"eventimage"} width={"full"} height={"228px"} src={IMAGE_URL + data[index]?.bannerImage} />} */}
                                <input
                                    type="file"
                                    id="image"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </Flex>
                    <Flex fontSize={"xs"} textAlign={"center"} color={"brand.chasescrollGray"} justifyContent={"space-between"} width={"full"} >
                        <Box>
                            <Text>Image size:</Text>
                            <Text>2160 x 1080px</Text>
                        </Box>
                        <Box>
                            <Text>Max. file size:</Text>
                            <Text>800KB</Text>
                        </Box>
                        <Box>
                            <Text>Image type:</Text>
                            <Text>JPEG/PNG</Text>
                        </Box>
                    </Flex>
                </Flex>
            )}
        </>
    );
}; 