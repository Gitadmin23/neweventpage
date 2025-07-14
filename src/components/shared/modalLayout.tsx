import { CloseButton, Dialog, Flex } from "@chakra-ui/react";

interface IProps {
    children: React.ReactNode;
    button?: React.ReactNode;
    footer?: React.ReactNode;
    trigger?: boolean;
    open?: boolean;
    title?: string;
    closeBtn?: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "cover" | "full"
}

export default function ModalLayout({
    children,
    button,
    footer,
    trigger,
    open,
    title,
    closeBtn,
    size
}: IProps) {

    return (
        <>
            {!trigger && (
                <Dialog.Root size={size ?? "md"} >
                    <Dialog.Trigger >
                        {button}
                    </Dialog.Trigger>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.CloseTrigger />
                            <Dialog.Header>
                                <Dialog.Title>{title}</Dialog.Title>
                                {closeBtn && (
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                )}
                            </Dialog.Header>
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
                <Dialog.Root open={open} > 
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.CloseTrigger />
                            <Dialog.Header>
                                <Dialog.Title>{title}</Dialog.Title>
                                {closeBtn && (
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Dialog.CloseTrigger>
                                )}
                            </Dialog.Header>
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
        </>
    )
}