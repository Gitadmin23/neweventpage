"use client"
import { CloseButton, Dialog, Flex } from "@chakra-ui/react";

interface IProps {
    children: React.ReactNode;
    button?: React.ReactNode;
    footer?: React.ReactNode;
    trigger?: boolean;
    open?: boolean;
    title?: string;
    placement?: "top" | "center" | "bottom"
    closeBtn?: boolean;
    close?: () => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full"
}

export default function ModalLayout({
    children,
    button,
    footer,
    trigger,
    open,
    title,
    close,
    closeBtn,
    placement = "center",
    size
}: IProps) {

    return (
        <>
            {!trigger && (
                <Dialog.Root placement={placement ?? "center"} size={size ?? "md"} >
                    <Dialog.Trigger >
                        {button}
                    </Dialog.Trigger>
                    <Dialog.Backdrop />
                    <Dialog.Positioner >
                        <Dialog.Content mt={"10"}>
                            <Dialog.CloseTrigger />
                            {title || closeBtn && ( 
                                <Dialog.Header pt={"4"} pl={"4"} textAlign={"center"} >
                                    <Dialog.Title >{title}</Dialog.Title>
                                    {closeBtn && (
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Dialog.CloseTrigger>
                                    )}
                                </Dialog.Header>
                            )}
                            <Flex w={"full"} h={"full"} >
                                {children}
                            </Flex>
                            <Dialog.Body />
                            <Dialog.Footer>
                                {footer}
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            )}
            {trigger && (
                <Dialog.Root placement={placement ?? "center"} size={size ?? "md"} open={open} onOpenChange={close} >
                    <Dialog.Backdrop />
                    <Dialog.Positioner p={"2"} >
                        <Dialog.Content >
                            <Dialog.CloseTrigger /> 
                            {title || closeBtn && ( 
                                <Dialog.Header pl={"4"} textAlign={"center"} >
                                    <Dialog.Title >{title}</Dialog.Title>
                                    {closeBtn && (
                                        <Dialog.CloseTrigger zIndex={"30"} asChild>
                                            <CloseButton size="sm" />
                                        </Dialog.CloseTrigger>
                                    )}
                                </Dialog.Header>
                            )}
                            <Dialog.Body>
                                <Flex w={"full"} h={"auto"} overflowY={"hidden"} >
                                    {children}
                                </Flex>
                            </Dialog.Body>
                            <Dialog.Footer>
                                {footer}
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            )}
        </>
    )
}