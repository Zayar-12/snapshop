// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails
 
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';
// import tailwindConfig from '../../tailwind.config';

interface EmailConfirmationProps {
  userFirstname?: string;
  confirmEmailLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const EmailConfirmation = ({
  userFirstname,
  confirmEmailLink
}: EmailConfirmationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview>Account Confirmation Email - SnapShop</Preview>
          <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">
          
            <Section>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Hi {userFirstname},
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
              We received an account registeration request with this email address
              </Text>
              <Button
                className="bg-[#007ee6] rounded text-white text-[15px] no-underline text-center font-dropbox-sans block w-[210px] py-[14px] px-[7px]"
                href={ confirmEmailLink}
              >
              Activate Account
              </Button>
           
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                 To activate your account, please click on the button above
                <Link className="underline" href={ confirmEmailLink}>
                visit our official website
                </Link>
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Happy Shopping!
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailConfirmation.PreviewProps = {
  userFirstname: 'Snap Shop',
  resetPasswordLink: 'https://codehubmm.com',
} as EmailConfirmationProps;

// EmailConfirmation.tailwindConfig = tailwindConfig;

export default EmailConfirmation;
