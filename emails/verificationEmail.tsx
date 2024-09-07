import {
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Text,
  Section,
  Font,
} from "@react-email/components";

interface verificationEmailProps {
  username: String;
  otp: String;
}

export default function VerificationEmail({
  username,
  otp,
}: verificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Preview>OTP for verification</Preview>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Your Email verification code</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
        {/* 
        I'm gonna implement this very soon
        <Row>
        <Button
          href={`http://localhost:3000/verify/${username}`}
          style={{ color: '#61dafb' }}
        >
          Verify here
        </Button>
      </Row> */}
      </Section>
    </Html>
  );
}
