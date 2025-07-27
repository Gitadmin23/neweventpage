"use client"
import useCustomTheme from '@/hooks/useTheme'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react' 
import ModalLayout from './modalLayout'

export default function DonationTermAndCondition({ refund }: { refund?: boolean }) {

    const [open, setOpen] = useState(false)

    const {
        primaryColor,
        mainBackgroundColor
    } = useCustomTheme()
    const termsAndConditions = `
Terms and Conditions
Effective Date: 11/29/2024

Welcome to Chasescroll. By accessing or using our platform, you agree to comply with
and be bound by the following terms and conditions. If you do not agree, please refrain
from using our services.

1. Introduction
1.1. About Us: Chasescroll fundraising system connects fundraisers and donors to 
support various causes.
1.2. Acceptance of Terms: By using our platform, you confirm you are at least 18 years 
old or the age of majority in your jurisdiction and legally capable of entering into a 
contract.
1.3. Modifications: We reserve the right to amend these terms at any time. Changes 
will be posted on this page and are effective immediately.

2. Definitions
• Platform: The website or mobile app where services are provided.
• User: Anyone using the platform, including fundraisers and donors.
• Fundraiser: Individuals or organizations raising funds.
• Donor: Individuals or entities contributing funds.
• Campaign: A specific fundraising initiative created by a fundraiser.

3. User Obligations
3.1. Users agree to provide accurate and truthful information.
3.2. Users must not use the platform for illegal, fraudulent, or harmful activities.
3.3. Users are responsible for securing their account credentials. We are not liable for 
unauthorized account access resulting from negligence.

4. Fundraisers’ Responsibilities
4.1. Ensure all campaigns comply with applicable laws.
4.2. Use funds solely for the stated purpose of the campaign.
4.3. Provide updates to donors as required or as requested.
4.4. Refund donors where applicable if the campaign cannot fulfill its objectives.

5. Donors’ Responsibilities
5.1. Contributions are voluntary, and donors should ensure they understand the 
campaign details before donating.
5.2. Donations may not be refundable unless explicitly stated or required by law.
5.3. Donors should report suspected fraudulent campaigns to the platform.

6. Fees and Payments
6.1. Chasescroll charges donors a 1.5% service fee during donation payment and a 
3% service fee charge on organizers during wallet cashout to their preferred bank 
account.
6.2. Payment processing fees may apply, and these will be outlined at checkout.
6.3. Payouts to fundraisers are subject to account owner transferring the fund from 
their Chasescroll wallet which is Powered by Paystack into their preferred bank 
account.

7. Prohibited Activities
Users may not:
• Engage in campaigns that promote hate speech, violence, discrimination, or illegal 
activities.
• Use the platform to solicit personal loans or pyramid schemes.
• Create multiple accounts to manipulate platform metrics.

8. Platform Rights and Responsibilities
8.1. We may review and monitor campaigns but are not responsible for their accuracy 
or legitimacy.
8.2. We reserve the right to suspend or terminate accounts that violate these terms.
8.3. Chasescroll is not liable for any disputes between fundraisers and donors.

9. Intellectual Property
9.1. Content uploaded to the platform remains the property of the user, but you grant 
us a license to use it for promotional and operational purposes.
9.2. You must not upload copyrighted or infringing materials without proper 
authorization.

10. Privacy
Our use of your information is governed by our Privacy Policy.

11. Disclaimers
11.1. We do not guarantee the success or legitimacy of any campaign.
11.2. The platform is provided "as is" without warranties of any kind.

12. Liability Limitation
Chasescroll is not liable for:
• Losses arising from contributions made to campaigns.
• Technical issues affecting the platform’s operation.

13. Dispute Resolution
13.1. Any disputes will be resolved through binding arbitration in Nigeria, unless 
prohibited by law.
13.2. Users may also report disputes to local regulatory authorities where applicable.

14. Termination
We may suspend or terminate your account for violating these terms or for any reason 
at our sole discretion.

15. Governing Law
These terms are governed by the laws of The Federal Republic of Nigeria.

16. Contact Us
If you have questions or concerns about these Terms and Conditions, please contact 
us at: support@chasescroll.com
`;

    const termsAndConditionsNew = `
Donating to a Fundraising Campaign on Chasescroll

7.0. Making Donations
•	All donations are voluntary and non-refundable unless explicitly stated otherwise.
•	Donations are processed securely through our payment partners.
•	You acknowledge that donations do not guarantee any goods, services, or tax benefits unless otherwise specified.

7.1. Use of Funds
•	Campaign organizers are responsible for the appropriate use of the funds raised.
•	Chasescroll does not guarantee the accuracy of campaign statements or the intended use of funds.

7.2. Refund Policy
•	Refund requests are subject to approval and must be submitted within 24hrs from the date of donation.
•	Refunds may be granted in cases of fraudulent campaigns or if the campaign is canceled by the campaign organizer. Chasescroll is not responsible for refunds.

7.3. Prohibited Activities
You agree not to:
•	Make donations using fraudulent methods or stolen payment information.
•	Use the platform to launder money or engage in illegal activities.
•	Misrepresent the purpose of a donation.

7.4. Dispute Resolution
•	In case of disputes, we encourage donors and campaign organizers to resolve issues directly.
•	If no resolution is reached, you may submit a dispute through our platform for mediation.

7.5. Limitation of Liability
Chasescroll is not liable for any misuse of funds, fraudulent campaigns, or losses incurred as a result of donations. Our liability is limited to the amount of fees collected for processing the donation
`


    return (
        (<Flex  >
            {refund && (
                <Text onClick={() => setOpen(true)} cursor={"pointer"} textDecor={"underline"} fontWeight={"bold"} fontSize={"12px"} color={primaryColor} >Fundraising Terms And Conditions</Text>
            )}
            {!refund && (
                <Text onClick={() => setOpen(true)} cursor={"pointer"} textDecor={"underline"} fontWeight={"bold"} fontSize={"12px"} color={primaryColor} >Fundraising Terms And Conditions</Text>
            )}
            <ModalLayout size={"full"} open={open} trigger={true} closeBtn={true} close={()=> setOpen(false)} >
                <Box width={"full"} h={["100vh", "100vh", "full"]} bg={mainBackgroundColor} px={["0px", "8", "8"]} pt={"3"} pb={"4"} >
                    <Box display={"flex"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >

                        <Text fontSize={["18px", "24px", "24px"]} fontWeight={"bold"} lineHeight={"28.8px"} textAlign={"center"} >{refund ? "Fundraising Terms And Conditions" : "Fundraising Terms And Conditions"}</Text>
                        {refund && (
                            <Box
                                my={"3"} lineHeight={"22px"}
                                whiteSpace="pre-wrap"
                                p={[2, 4, 4]}
                                borderWidth="1px"
                                borderRadius="md"
                                overflowY="auto"
                                maxH={["77vh"]}
                                fontSize="sm"
                            >
                                {termsAndConditionsNew}
                            </Box>
                        )}
                        {!refund && ( 
                            <Box
                                my={"3"} lineHeight={"22px"}
                                whiteSpace="pre-wrap"
                                p={[2, 4, 4]}
                                borderWidth="1px"
                                borderRadius="md"
                                overflowY="auto"
                                maxH={["77vh"]}
                                fontSize="sm"
                            >
                                {termsAndConditions}
                            </Box> 
                        )}
                        <Button onClick={() => setOpen(false)} w={refund ? "full" : ["full", "300px", "300px"]} mx={"auto"} h={"42px"} mt={"3"} borderWidth={"1px"} color={"#5465E0"} borderColor={"#5465E0"} rounded={"8px"} bgColor={"white"} _hover={{ backgroundColor: "white" }} >
                            Done
                        </Button>
                    </Box>
                </Box>
            </ModalLayout>
        </Flex>)
    );
}
