'use client'
import { Box, HStack, VStack, Switch, Image, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react'
import { FiFolderPlus, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation'
import useCommunity from '@/hooks/useCommunity';
import { CustomButton, CustomInput, ImagePicker } from '@/components/shared';
import CustomEventSwitch from '../theme/customEventSwitch';

interface Props {
    create?: boolean,
    setTab?: any
}

function CreateCommunity({ create, setTab }: Props) {

    const { formik, uploadImage, createCommunity } = useCommunity()

    useEffect(() => {
        if(createCommunity.isSuccess) {
            setTab(0)
        }
    }, [createCommunity.isSuccess])

    return (
        // <VStack width='100%' height='100%' overflow={'hidden'} padding={['20px', '0px']} >

        //     <VStack width={['100%', '40%']}>

        //         <input hidden type='file' accept='image/*' ref={inputRef as any} onChange={(e) => handleFilePicked(e.target.files as FileList)} />
        //         <HStack width='100%' height={'60px'} justifyContent={'flex-start'} alignItems={'center'}>
        //             <FiX fontSize={'25px'} onClick={() => clickHandler()} />
        //         </HStack>

        //         <Box cursor={'pointer'} onClick={() => inputRef.current?.click()} width='100%' height="200px" borderWidth='2px' borderColor='grey' borderRadius={'20px'} borderStyle={'dashed'} overflow={'hidden'} bg='grey' >
        //             {url === '' && file === null && (
        //                 <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
        //                     <Image src='/assets/svg/folder-cloud.svg' alt='icon' width={50} height={50} />
        //                     <CustomText fontFamily={'Satoshi-Regular'} color='white' fontSize={'md'}>Upload image here</CustomText>
        //                 </VStack>
        //             )}
        //             {
        //                 url !== '' && file !== null && (
        //                     <Image src={url} alt='image' objectFit={'cover'} style={{ width: '100%', height: '100%' }} />
        //                 )
        //             }
        //         </Box>

        //         <VStack marginY={'20px'} width='100%' spacing={5} >
        //             <CustomInput name='name' placeholder='Community name' type='text' isPassword={false} />
        //             <CustomInput name='description' placeholder='Community Description' type='text' isPassword={false} />
        //         </VStack>

        //         <VStack width='100%' alignItems={'center'} marginBottom={'20px'} >
        //             <CustomText fontFamily={'Satoshi-Regular'} fontSize='20px'>Visibiltiy</CustomText>
        //             <HStack spacing={6} alignItems={'center'} marginTop={'10px'}>
        //                 <CustomText>Private</CustomText>
        //                 <Switch isChecked={isPublic === false} onChange={() => setIsPublic(prev => !prev)} />
        //             </HStack>

        //             <HStack spacing={6} alignItems={'center'} marginTop={'10px'}>
        //                 <CustomText>Public</CustomText>
        //                 <Switch isChecked={isPublic} onChange={() => setIsPublic(prev => !prev)} />
        //             </HStack>
        //         </VStack>

        //         <Button type='submit' marginTop={'20px'} variant={'solid'} bg={'brand.chasescrollButtonBlue'} isLoading={uploadImage.isLoading || createCommunity.isLoading} width='100%' borderRadius={'10px'} color='white' > Submit</Button>

        //     </VStack>

        // </VStack>
        <Flex flexDirection={"column"} gap={"3"} w={"full"} px={"4"} >
            <ImagePicker single={true} preview={[formik?.values.imgSrc]} />
            <CustomInput disabled={true} name={`name`} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Community Name" value={formik.values} />
            <CustomInput disabled={true} name={`description`} errors={formik?.errors} touched={formik?.touched} setValue={formik.setFieldValue} label="Community Description" value={formik.values} />
            <CustomEventSwitch title="Visibiltiy" setValue={formik.setFieldValue} value={formik.values.isPublic} name="isPublic" />
            <Flex w={"full"} >
                <CustomButton isLoading={uploadImage.isPending || createCommunity.isPending} type="button" onClick={()=> formik.handleSubmit()} text={"Submit"} borderRadius={"999px"} fontSize={"14px"} />
            </Flex>
        </Flex>
    )
}

export default CreateCommunity