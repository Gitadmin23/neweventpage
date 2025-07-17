

import useCustomTheme from '@/hooks/useTheme';
import { GallaryIcon, PhotoIcon } from '@/svg';
import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { IoIosCloseCircle, IoMdAdd } from 'react-icons/io';

export default function ImagePicker() {

    const {
        secondaryBackgroundColor,
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()

    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setImages((prev) => [...prev, ...fileArray]);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        // <div style={{ maxWidth: '400px', margin: 'auto' }}>
        //     {/* Hidden input */}
        //     <input
        //         type="file"
        //         multiple
        //         accept="image/*"
        //         onChange={handleImageChange}
        //         ref={fileInputRef}
        //         style={{ display: 'none' }}
        //     />

        //     {/* Trigger button */}
        //     <button
        //         type="button"
        //         onClick={handleButtonClick}
        //         style={{
        //             padding: '10px 16px',
        //             backgroundColor: '#007bff',
        //             color: '#fff',
        //             border: 'none',
        //             borderRadius: '4px',
        //             cursor: 'pointer',
        //             marginBottom: '1rem',
        //         }}
        //     >
        //         Select Images
        //     </button>

        //     {/* Image previews */}
        //     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        //         {images.map((file, index) => (
        //             <div key={index} style={{ position: 'relative' }}>
        //                 <img
        //                     src={URL.createObjectURL(file)}
        //                     alt={`preview-${index}`}
        //                     style={{
        //                         width: '100px',
        //                         height: '100px',
        //                         objectFit: 'cover',
        //                         borderRadius: '8px',
        //                     }}
        //                 />
        //                 <button
        //                     onClick={() => removeImage(index)}
        //                     style={{
        //                         position: 'absolute',
        //                         top: 0,
        //                         right: 0,
        //                         background: 'red',
        //                         color: 'white',
        //                         border: 'none',
        //                         borderRadius: '50%',
        //                         width: '20px',
        //                         height: '20px',
        //                         cursor: 'pointer',
        //                     }}
        //                 >

        //                 </button>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <Flex w={"full"} rounded={"12px"} borderStyle={"dashed"} borderWidth={"1px"} overflowX={"auto"} bgColor={secondaryBackgroundColor} h={"200px"} >
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
            {images?.length === 0 && (
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
            {images?.length > 0 && (
                <Flex w={"fit"} gap={"3"} p={"4"} >
                    {images.map((file, index) => (
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