import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection, LegalList } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms of Service, Vivianne",
  description: "The terms that govern your use of Vivianne.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="29 August 2026"
      intro="By installing, accessing, or otherwise using Vivianne, you agree to be bound by these terms. If you disagree with any part of them, you may not use the application."
    >
      <LegalSection heading="1. Description of the service">
        <p>
          Vivianne is a desktop interface for an AI assistant, built on the
          Tauri runtime. It lets you interact with large language models, manage
          conversations, and extend the assistant with tools and plugins. It is
          provided &ldquo;as is&rdquo; and may evolve over time.
        </p>
      </LegalSection>

      <LegalSection heading="2. Eligibility">
        <p>
          You must be at least 13 years old to use Vivianne. By using it, you
          represent that you meet this age requirement and are not barred from
          doing so under any applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="3. Account and authentication">
        <p>
          Some features require you to sign in or create an account. You are
          responsible for safeguarding your credentials and for any activity
          under your account. Notify us immediately if you suspect unauthorised
          access.
        </p>
      </LegalSection>

      <LegalSection heading="4. Acceptable use">
        <p>You agree not to:</p>
        <LegalList
          items={[
            "Use the application for any unlawful purpose or in violation of applicable law.",
            "Upload, transmit, or process content that is infringing, defamatory, obscene, harassing, or otherwise objectionable.",
            "Attempt to reverse-engineer, decompile, or otherwise extract the source code, except where that restriction is prohibited by law.",
            "Interfere with or disrupt the integrity, performance, or security of the application.",
            "Use the application to develop competing products, or to train competing AI models, without our express written consent.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="5. AI-generated content">
        <p>
          Vivianne uses third-party AI models to generate responses.
          AI-generated content is provided for informational purposes only. We
          do not guarantee the accuracy, completeness, or suitability of any
          output. You are responsible for evaluating it before relying on it.
        </p>
      </LegalSection>

      <LegalSection heading="6. Privacy">
        <p>
          Your use of Vivianne is also subject to our{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          , which is incorporated into these terms by reference.
        </p>
      </LegalSection>

      <LegalSection heading="7. Intellectual property">
        <p>
          All rights, title, and interest in the application (including source
          code, design, and branding) are owned by us or our licensors. You
          retain ownership of content you submit, but grant us a worldwide,
          non-exclusive, royalty-free licence to use, host, and process that
          content solely to operate the service.
        </p>
      </LegalSection>

      <LegalSection heading="8. Third-party services">
        <p>
          Vivianne relies on third-party services, including AI providers and
          package registries. We are not responsible for the availability,
          accuracy, or content of those services. Your use of them is subject to
          their own terms.
        </p>
      </LegalSection>

      <LegalSection heading="9. Termination">
        <p>
          We may suspend or terminate your access at any time, with or without
          cause, including if you breach these terms. On termination, your right
          to use the application ceases immediately.
        </p>
      </LegalSection>

      <LegalSection heading="10. Disclaimers">
        <p className="uppercase text-[13px] leading-relaxed tracking-wide">
          The application is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; without warranties of any kind, express or implied,
          including but not limited to the implied warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the application will be
          uninterrupted, error-free, or free of harmful components.
        </p>
      </LegalSection>

      <LegalSection heading="11. Limitation of liability">
        <p className="uppercase text-[13px] leading-relaxed tracking-wide">
          To the maximum extent permitted by law, in no event shall we, our
          affiliates, or our licensors be liable for any indirect, incidental,
          special, consequential, or punitive damages, including lost profits or
          data, arising out of or in connection with your use of the
          application, whether based on warranty, contract, tort, or any other
          legal theory, and even if we have been advised of the possibility of
          such damages.
        </p>
      </LegalSection>

      <LegalSection heading="12. Indemnification">
        <p>
          You agree to indemnify and hold harmless us, our affiliates, and our
          respective officers, directors, and employees from any claim, demand,
          loss, or expense (including reasonable legal fees) arising out of your
          use of the application or your violation of these terms.
        </p>
      </LegalSection>

      <LegalSection heading="13. Changes to these terms">
        <p>
          We may update these terms from time to time. We will post the revised
          terms and update the &ldquo;last updated&rdquo; date above. Continued
          use after the changes take effect constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection heading="14. Governing law">
        <p>
          These terms are governed by and construed in accordance with the laws
          of India, without regard to its conflict of law principles.
        </p>
      </LegalSection>

      <LegalSection heading="15. Contact">
        <p>
          Questions about these terms:{" "}
          <a href="mailto:legal@vivianne.dev" className="underline">
            legal@vivianne.dev
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
