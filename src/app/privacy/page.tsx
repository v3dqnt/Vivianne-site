import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList, Term } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy, Vivianne",
  description: "How Vivianne collects, uses, and safeguards your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="29 August 2026"
      intro="This policy explains how we collect, use, disclose, and safeguard your information when you use Vivianne. It applies to the desktop application and to this website."
    >
      <LegalSection heading="1. Information we collect">
        <p className="font-medium text-fg">Automatically collected</p>
        <LegalList
          items={[
            <>
              <Term>Usage data:</Term> information about how the application is
              accessed and used, which may include IP address, operating system,
              and the time and date of access.
            </>,
            <>
              <Term>Diagnostic data:</Term> crash logs, performance statistics,
              and diagnostic data used to maintain, improve, and secure the
              application.
            </>,
          ]}
        />
        <p className="font-medium text-fg">Information you provide</p>
        <LegalList
          items={[
            <>
              <Term>Account information:</Term> if you create an account or sign
              in, your email address, username, and password (stored hashed).
            </>,
            <>
              <Term>Content you input:</Term> text, files, or prompts you send to
              the assistant may be processed by the underlying AI providers. We
              do not store your raw input beyond what is necessary to provide
              the service.
            </>,
            <>
              <Term>Feedback:</Term> comments and contact details you send us in
              feedback or bug reports, so we can respond.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="2. How we use your information">
        <LegalList
          items={[
            "To provide, maintain, and improve the application and its AI features.",
            "To personalise your experience within the application.",
            "To monitor and address technical issues, crashes, and security vulnerabilities.",
            "To communicate with you about updates, features, or support matters.",
            "To comply with legal obligations and protect the rights and safety of the application and its users.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="3. How we share your information">
        <LegalList
          items={[
            <>
              <Term>AI service providers:</Term> when you send a prompt to the
              assistant it is transmitted to a third-party AI provider (for
              example OpenAI, Anthropic, or Google) under that provider&apos;s
              own privacy policy. We do not sell your data to unrelated third
              parties.
            </>,
            <>
              <Term>Legal requirements:</Term> we may disclose information where
              required by law, regulation, or a valid government request.
            </>,
            <>
              <Term>Service providers:</Term> we may engage third parties to
              host, debug, or improve the application. They are bound by
              confidentiality and use-limitation obligations.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="4. Data retention">
        <LegalList
          items={[
            "Usage diagnostics and crash logs are retained for 30 days, unless a longer period is required for security or legal reasons.",
            "Account information is retained for as long as your account exists, or as needed to provide the service.",
            "Content you input is not stored long-term. It is processed in real time and not persisted beyond the session unless you explicitly save it.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="5. Your rights">
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <LegalList
          items={[
            "Access, correct, or delete personal information we hold about you.",
            "Receive a copy of your data in a portable format.",
            "Object to or restrict processing of your data.",
            "Withdraw consent at any time, where processing is based on consent.",
          ]}
        />
        <p>
          To exercise these rights, contact us at{" "}
          <a href="mailto:privacy@vivianne.dev" className="underline">
            privacy@vivianne.dev
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="6. Children's privacy">
        <p>
          Vivianne is not intended for children under the age of 13. We do not
          knowingly collect personal information from children. If you believe
          we have inadvertently collected such information, please contact us
          immediately.
        </p>
      </LegalSection>

      <LegalSection heading="7. Changes to this policy">
        <p>
          We may update this privacy policy from time to time. We will notify
          users of material changes by posting the new policy on this page and,
          where appropriate, by sending a notification within the application.
        </p>
      </LegalSection>

      <LegalSection heading="8. Contact us">
        <p>
          Questions or suggestions about this policy:{" "}
          <a href="mailto:privacy@vivianne.dev" className="underline">
            privacy@vivianne.dev
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
