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

type EmailProps = {
  username: string;
  otp?: string;
  emailType?: "Verification" | "PasswordReset";
  resetToken?: string;
};

const EmailTemplate = ({
  username,
  otp,
  emailType = "Verification",
  resetToken
}: EmailProps) => {
  const isVerification = emailType === "Verification";
  const emailTitle = isVerification
    ? "Verification Code"
    : "Password Reset Request";
  const actionUrl = isVerification
    ? `http://localhost:3000/verify-email/${username}`
    : `http://localhost:3000/reset-password?token=${resetToken}`;

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>{emailTitle}</title>
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

      <Preview>
        {isVerification
          ? `Here's your verification code: ${otp}`
          : `Password reset request`}
      </Preview>
      <Section>
        <Row>
          <Text>
            <Heading as="h2">Hello {username},</Heading>
          </Text>
        </Row>

        {isVerification ? (
          <>
            <Row>
              <Text>
                Thank you for registering with{" "}
                <Heading as="h5">Learnify</Heading>. To complete your
                registration, please enter the following verification code
                within the next hour:
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
          </>
        ) : (
          <>
            <Row>
              <Text>
                We received a request to reset your password for your Learnify
                account. If you did not make this request, you can ignore this
                email. Otherwise, click the button below to reset your password.
                This link will expire in half hour.
              </Text>
            </Row>
            <Row>
              <Button
                href={actionUrl}
                style={{
                  backgroundColor: "#FF6636",
                  color: "#FFEEE8",
                  padding: "10px 20px"
                }}
              >
                Reset Password
              </Button>
            </Row>
          </>
        )}
      </Section>
    </Html>
  );
};

export default EmailTemplate;
