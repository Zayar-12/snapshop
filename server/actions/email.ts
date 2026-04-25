import EmailConfirmation from "@/app/components/email-template";
import { getBaseUrl } from "@/lib/get-base-url"

import { Resend } from 'resend';


export const sendEmail = async(email:string,token:string,userFirstname:string)=>{
const resend = new Resend(process.env.RESEND_API_KEY);
  const currentBaseUrl=getBaseUrl();
    const  confirmUrl=`${currentBaseUrl}/auth/confirm-email?token=${token}`

 
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Account Confirmation Email-Snap Shop ',
      react: EmailConfirmation({ 
        userFirstname,
        confirmEmailLink:confirmUrl
      }),
    });

    if (error) {
     console.log(error);
     
    }

   
 
}