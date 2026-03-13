 
import { AxiosError, AxiosResponse } from "axios";
import React from "react";

import { toaster } from "../ui/toaster";
import { useMutation } from "@tanstack/react-query";
import httpService from "@/helpers/services/httpService";
import { Box, Spinner } from "@chakra-ui/react";
import { useDetails } from "@/helpers/store/useUserDetails";
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    event: any;
    size?: string;
    indetail?: boolean;
    color?: string;
    newbtn?: boolean;
}

function SaveEventBtn(props: Props) {
    const { event, size, indetail, color, newbtn } = props;

    const { userId: user_index } = useDetails((state) => state); 
    const [isSaved, setIsSaved] = React.useState(event?.isSaved);

    const { mainBackgroundColor } = useCustomTheme()

    // save event
    const saveEvent = useMutation({
        mutationFn: (data: any) => httpService.post("/events/save-event", data),
        onError: (error: AxiosError<any, any>) => { 

            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
        onSuccess: (data: AxiosResponse<any>) => { 
            toaster.create({
                title: data.data?.message,
                type: "success",
                closable: true,
            });
            setIsSaved(true);
        },
    });

    const deletedSavedEvent = useMutation({
        mutationFn: (data: any) =>
            httpService.post("/events/remove-saved-event", data),
        onError: (error: AxiosError<any, any>) => {
            
            toaster.create({
                title: error?.response?.data?.message,
                type: "error",
                closable: true,
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
    
            toaster.create({
                title: data.data?.message,
                type: "success",
                closable: true,
            });
            setIsSaved(false);
        },
    });

    const handleSave = React.useCallback(
        (e: any) => {
            e.stopPropagation();
            if(saveEvent.isPending || deletedSavedEvent.isPending) {
                return
            }

            if (isSaved) {
                deletedSavedEvent.mutate({
                    eventID: event.id,
                    typeID: user_index,
                    type: "EVENT",
                });
            } else {
                saveEvent.mutate({
                    eventID: event.id,
                    typeID: user_index,
                    type: "EVENT",
                });
            }
        },
        [deletedSavedEvent, saveEvent],
    );

    return (
        <Box
            as="button"
            onClick={handleSave}
            w={"24px"}
            h={"24px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"} 
            bgColor={mainBackgroundColor}  
            rounded={"md"} 
        >
            {(saveEvent.isPending || deletedSavedEvent.isPending) && (
                <Spinner size="sm" color="brand.chasesccrollButtonBlue" />
            )}
            {!saveEvent.isPending && !deletedSavedEvent.isPending && (
                <span className="text-xl">
                    {isSaved && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={size ? size : "15"}
                            height={size ? size : "15"}
                            viewBox="0 0 18 18"
                            fill="none"
                        >
                            <path
                                d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z"
                                fill={
                                    color ? color : indetail ? "white" : "#3C41F0"
                                }
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z"
                                fill={
                                    color ? color : indetail ? "white" : "#3C41F0"
                                }
                                stroke={
                                    color ? color : indetail ? "white" : "#3C41F0"
                                }
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    )}
                    {!isSaved && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={size ? size : "15"}
                            height={size ? size : "15"}
                            viewBox="0 0 18 18"
                            fill="none"
                        >
                            <path
                                d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z"
                                stroke={color ? color : "#3C41F0"}
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z"
                                stroke={
                                    color ? color : indetail ? "white" : "#3C41F0"
                                }
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    )}
                </span>
            )}
        </Box>
    );
}

export default SaveEventBtn;
