import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "AlphaFundX Terms and Conditions - Read our terms of service.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-muted-foreground">
            Effective Date: <span className="text-foreground">[Insert Date]</span>
          </p>
        </div>

        <div className="mt-8 text-left">
          <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
            
            <div className="mb-8 space-y-1">
              <p className="mb-1"><span className="font-semibold text-foreground">Website Name:</span> [Insert Website Name]</p>
              <p className="mb-1"><span className="font-semibold text-foreground">Company Name:</span> [Insert Company Name]</p>
              <p><span className="font-semibold text-foreground">Contact Email:</span> <a href="mailto:[Insert Email Address]" className="text-primary hover:underline">[Insert Email Address]</a></p>
            </div>
            
            <p className="text-foreground font-medium text-lg border-l-2 border-primary pl-4 py-1">
              By accessing or using this website, you agree to be bound by these Terms and Conditions. If you do not agree, you must not use this website or any related services.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              1. Introduction
            </h2>
            <p>
              This website provides access to funded trading challenge packages, account management tools, user dashboards, withdrawal request features, and related administrative services.
            </p>
            <p>
              The website does not itself execute trades. All trading activity occurs externally through third-party platforms such as MetaTrader 5 and communication channels such as Telegram. The website is used for registration, package purchases, account status tracking, profit display, and withdrawal request management.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              2. Eligibility
            </h2>
            <p>To use this website and purchase any package, you must:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Be at least 18 years old, or the legal age of majority in your jurisdiction</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Provide accurate, complete, and current information during registration</li>
              <li>Not use the website if doing so would violate any applicable law or regulation in your country or region</li>
            </ul>
            <p>
              We reserve the right to refuse service, suspend accounts, or cancel transactions if eligibility requirements are not met.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              3. Nature of the Service
            </h2>
            <p>Our services include:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Selling funded trading challenge packages</li>
              <li>Allowing users to register and log in</li>
              <li>Allowing users to submit Telegram usernames</li>
              <li>Allowing users to view account status, funding status, and profit information</li>
              <li>Allowing users to request withdrawals</li>
              <li>Allowing administrators to manually manage users, packages, purchases, profits, and withdrawals</li>
            </ul>
            <p>You acknowledge and agree that:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>The website is not a brokerage, exchange, bank, or investment advisor</li>
              <li>We do not guarantee profits, trading success, or funding approval</li>
              <li>Trading decisions and market exposure are handled outside the website</li>
              <li>Demo and real accounts may be issued manually by the admin and are subject to internal rules and approval</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              4. Account Registration
            </h2>
            <p>To access certain features, you may be required to create an account. You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Provide truthful and accurate information</li>
              <li>Keep your login credentials secure</li>
              <li>Not share your account with others</li>
              <li>Notify us immediately if you suspect unauthorized access</li>
              <li>Be responsible for all activity under your account</li>
            </ul>
            <p>
              We are not liable for losses or damages caused by unauthorized access resulting from your failure to protect your credentials.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              5. Telegram Username Submission
            </h2>
            <p>After purchasing a package, you may be required to submit your Telegram username. By submitting your Telegram username, you:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Confirm that the username belongs to you</li>
              <li>Consent to being contacted through Telegram for account delivery, support, and trading-related communication</li>
              <li>Acknowledge that demo account details, funded account details, and related instructions may be sent manually through Telegram</li>
            </ul>
            <p>
              You are responsible for ensuring that your Telegram account is active, reachable, and correctly entered.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              6. Funding Packages and Purchases
            </h2>
            <p>We may offer multiple funding packages, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>$10,000 package</li>
              <li>$25,000 package</li>
              <li>$50,000 package</li>
              <li>$100,000 package</li>
            </ul>
            <p>Each package may include different pricing, rules, profit targets, drawdown limits, or account conditions. By purchasing a package, you agree that:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>The purchase is final unless otherwise stated in our refund policy</li>
              <li>Package availability, pricing, and features may change at any time</li>
              <li>We may reject or cancel orders that appear fraudulent, suspicious, or abusive</li>
              <li>Payment must be completed before any account delivery or activation</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              7. Payment Terms
            </h2>
            <p>Payments may be processed through third-party payment providers. You agree that:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>All payment information you provide is accurate and authorized</li>
              <li>You will not initiate chargebacks, payment disputes, or reversals except in cases of genuine unauthorized transactions</li>
              <li>We may suspend your account if a payment is disputed, reversed, or flagged as fraudulent</li>
            </ul>
            <p>
              If a payment fails, remains pending, or is not confirmed, we are not obligated to provide access to the package.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              8. Trading Challenge Rules
            </h2>
            <p>Each package may be subject to trading rules, which may include:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Daily drawdown limits</li>
              <li>Maximum drawdown limits</li>
              <li>Profit targets</li>
              <li>Minimum trading days</li>
              <li>Consistency requirements</li>
              <li>Restricted trading strategies or instruments</li>
              <li>Prohibited behavior such as account sharing, copy trading, or abuse</li>
            </ul>
            <p>You agree to follow all applicable trading rules. Failure to comply may result in:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Challenge failure</li>
              <li>Account suspension</li>
              <li>Denial of funded account conversion</li>
              <li>Denial of withdrawal requests</li>
            </ul>
            <p>
              The specific rules for each package will be made available on the website and/or communicated through official support channels.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              9. Demo and Real Account Delivery
            </h2>
            <p>The platform works as follows:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>You purchase a package</li>
              <li>You submit your Telegram username</li>
              <li>Our admin manually sends you a demo MT5 account</li>
              <li>You trade the demo account externally</li>
              <li>If you pass the evaluation and comply with the rules, you may receive a real funded account</li>
            </ul>
            <p>You acknowledge that:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Demo and real accounts may be issued manually</li>
              <li>Account delivery may depend on admin review</li>
              <li>Approval is not automatic</li>
              <li>We may refuse or revoke account access if rules are violated</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              10. Profit Display
            </h2>
            <p>The website may display account-related information such as:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Current balance</li>
              <li>Profit percentage</li>
              <li>Daily profit</li>
              <li>Weekly profit</li>
              <li>Funding status</li>
            </ul>
            <p>You understand that:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Profit information may be manually updated by the admin if direct integration is unavailable</li>
              <li>Displayed profits are for informational purposes only</li>
              <li>We do not guarantee the accuracy of third-party platform performance data unless specifically stated</li>
              <li>Website figures may differ from actual MT5 data due to delays, manual updates, or technical issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              11. Withdrawals
            </h2>
            <p>Users may request withdrawals subject to eligibility, account conditions, and admin approval. Withdrawal terms:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Withdrawal requests must include accurate payment details</li>
              <li>We may request identity verification before processing withdrawals</li>
              <li>All requests are reviewed manually by the admin</li>
              <li>Request statuses may include Pending, Approved, Rejected, and Paid</li>
            </ul>
            <p>We reserve the right to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Reject incomplete or suspicious requests</li>
              <li>Delay processing for compliance, review, or verification purposes</li>
              <li>Withhold payment if trading rules were violated or if fraud is suspected</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              12. Admin Rights
            </h2>
            <p>We reserve the right to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Approve or reject registrations</li>
              <li>Modify package details</li>
              <li>Update profits, balances, or account status</li>
              <li>Suspend or terminate accounts</li>
              <li>Reject withdrawal requests</li>
              <li>Investigate suspicious activity</li>
              <li>Block access to users who violate these Terms</li>
            </ul>
            <p>
              All admin decisions regarding rule violations, account status, and withdrawals are final unless otherwise stated.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              13. Prohibited Conduct
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Use the website for unlawful purposes</li>
              <li>Provide false information</li>
              <li>Attempt to hack, reverse engineer, or damage the website</li>
              <li>Create multiple accounts to abuse promotions or bypass restrictions</li>
              <li>Share or sell your account</li>
              <li>Engage in fraud, money laundering, or chargeback abuse</li>
              <li>Harass staff or misuse support channels</li>
              <li>Submit another person’s Telegram username or payment details without permission</li>
            </ul>
            <p>
              Any violation may result in account suspension, termination, and possible legal action.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              14. Intellectual Property
            </h2>
            <p>
              All content on this website, including logos, text, designs, graphics, images, code, and layout, belongs to us or our licensors unless otherwise stated. You may not copy, reproduce, distribute, or modify any content without our written permission.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              15. Third-Party Services
            </h2>
            <p>This website may rely on third-party services, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Payment processors</li>
              <li>MetaTrader 5</li>
              <li>Telegram</li>
              <li>Hosting providers</li>
              <li>Analytics tools</li>
            </ul>
            <p>
              We are not responsible for outages, delays, errors, losses, or data issues caused by third-party services.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              16. No Financial Advice
            </h2>
            <p>All content provided on the website is for informational purposes only. We do not provide:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Investment advice</li>
              <li>Financial advice</li>
              <li>Tax advice</li>
              <li>Legal advice</li>
              <li>Trading guarantees</li>
            </ul>
            <p>
              You are solely responsible for your trading decisions, financial risks, and compliance with local laws.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              17. Risk Disclosure
            </h2>
            <p>Trading leveraged or speculative financial instruments involves significant risk and may result in loss of capital. You acknowledge that:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Trading can lead to losses</li>
              <li>Past performance does not guarantee future results</li>
              <li>Demo performance may differ from real-market performance</li>
              <li>You are responsible for understanding the risks before participating</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              18. Refunds and Cancellations
            </h2>
            <p>Refund policy, if offered, will be published separately or displayed at the time of purchase. Unless explicitly stated otherwise:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Purchased packages may be non-refundable</li>
              <li>Fees may be non-refundable once processing or account delivery has started</li>
              <li>Approved refunds, if any, are subject to verification and admin approval</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              19. Account Suspension and Termination
            </h2>
            <p>We may suspend or terminate your account at any time if:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>You violate these Terms</li>
              <li>You provide false or misleading information</li>
              <li>You engage in fraud or abuse</li>
              <li>Your payment is reversed or disputed</li>
              <li>You fail to comply with trading rules</li>
              <li>We are required to do so by law or regulation</li>
            </ul>
            <p>
              Upon termination, you may lose access to your dashboard, purchase history, or withdrawal access, subject to applicable law.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              20. Limitation of Liability
            </h2>
            <p>To the maximum extent permitted by law, we are not liable for:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Trading losses</li>
              <li>Lost profits</li>
              <li>Delayed or failed account delivery</li>
              <li>Payment failures</li>
              <li>Withdrawal delays</li>
              <li>Telegram communication failures</li>
              <li>MT5 platform issues</li>
              <li>Errors in manually updated account information</li>
              <li>Indirect, incidental, or consequential damages</li>
            </ul>
            <p>
              Your use of the website and related services is at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              21. Indemnification
            </h2>
            <p>You agree to indemnify and hold harmless [Company Name], its owners, employees, contractors, and affiliates from any claims, losses, damages, liabilities, and expenses arising from:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Your use of the website</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any law or third-party rights</li>
              <li>Fraudulent, abusive, or unlawful conduct</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              22. Privacy
            </h2>
            <p>
              Your use of the website is also governed by our Privacy Policy, which explains how we collect, use, and store personal data.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              23. Changes to Terms
            </h2>
            <p>
              We may update these Terms at any time. Changes will become effective when posted on the website, unless a different date is stated. Your continued use of the website after changes are posted means you accept the updated Terms.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              24. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and interpreted in accordance with the laws of [Insert Country/State]. Any disputes shall be handled in the courts or legal forums of that jurisdiction, unless otherwise required by law.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              25. Contact Us
            </h2>
            <p>If you have any questions about these Terms and Conditions, contact us at:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Email: <a href="mailto:[Insert Email Address]" className="text-primary hover:underline">[Insert Email Address]</a></li>
              <li>Telegram: [Insert Telegram Support Handle]</li>
              <li>Address: [Insert Business Address, if applicable]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
