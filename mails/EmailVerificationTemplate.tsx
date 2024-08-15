import {
  Html,
  Head,
  Font,
  Button,
  Preview,
  Heading,
  Section,
  Hr,
  Row,
  Text
} from "@react-email/components";

type EmailVerificationProps = {
  username: string;
  otp: string;
  tmailType?: string;
};
const EmailVerificationTemplate = ({
  username,
  otp,
  tmailType = "Verification"
}: EmailVerificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>{tmailType} Code</title>
        <Font
          fontFamily="Noto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap",
            format: "woff2"
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>

      <Hr />

      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Text>
            <Heading as="h2">Hello {username},</Heading>
          </Text>
        </Row>
        <Row>
          <Text>
            Thank you for registering with <Heading as="h5">Learnify</Heading> .
            To complete your registration, please enter the following
            verification code within the next 1 hours:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>

        <Row>
          <Button
            href={`http://localhost:3000/verify-email/${username}`}
            style={{
              backgroundColor: "#FF6636",
              color: "#FFEEE8",
              padding: "10px 20px"
            }}
          >
            Verify Here
          </Button>
        </Row>
      </Section>
    </Html>
  );
};

export default EmailVerificationTemplate;
