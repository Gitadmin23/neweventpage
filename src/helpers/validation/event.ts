
import * as Yup from "yup";

export const validationSchemaTheme = Yup.object().shape({  
  eventType: Yup.string().required("Event type is required"),
  eventName: Yup.string().required("Event name is required"),
  eventDescription: Yup.string().required("Event description is required"),  
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"), 
}); 

export const validationSchemaTicket = Yup.object().shape({  
    productTypeData: Yup.array()
      .of(
        Yup.object().shape({
          totalNumberOfTickets: Yup.number()
            .typeError("Total tickets must be a number")
            .required("Total number of tickets is required"),
          ticketPrice: Yup.number()
            .typeError("Ticket price must be a number")
            .required("Ticket price is required"),
          ticketType: Yup.string().required("Ticket type is required"),
          minTicketBuy: Yup.number()
            .typeError("Minimum tickets must be a number")
            .min(1, "Minimum ticket buy must be at least 1")
            .required("Minimum ticket buy is required"),
          maxTicketBuy: Yup.number()
            .typeError("Maximum tickets must be a number")
            .nullable(),
          rerouteURL: Yup.string().url().nullable(),
        })
      )
      .min(1, "At least one ticket type must be defined"),
   
});
