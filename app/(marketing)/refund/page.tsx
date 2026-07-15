import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "AlphaFundX Refund Policy - Learn about our refund guidelines.",
};

export default function RefundPage() {
  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Refund Policy
          </h1>
          <p className="text-muted-foreground">
            Effective Date: <span className="text-foreground">[Insert Date]</span>
          </p>
        </div>

        <div className="mt-8 text-left">
          <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
            
            <div className="mb-8 space-y-1">
              <p className="mb-1"><span className="font-semibold text-foreground">Website Name:</span> AlphaFundX</p>
              <p className="mb-1"><span className="font-semibold text-foreground">Company Name:</span> [Insert Company Name]</p>
              <p><span className="font-semibold text-foreground">Contact Email:</span> <a href="mailto:[Insert Email Address]" className="text-primary hover:underline">[Insert Email Address]</a></p>
            </div>
            
            <p className="text-foreground font-medium text-lg border-l-2 border-primary pl-4 py-1">
              This Refund Policy explains when refunds may or may not be issued for purchases made on AlphaFundX.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              1. General Policy
            </h2>
            <p>
              All purchases of funded trading challenge packages are treated as final unless otherwise stated at the time of purchase or required by law.
            </p>
            <p>By purchasing a package, you acknowledge that:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Your purchase gives you access to a trading evaluation or challenge program</li>
              <li>Package delivery, activation, or admin processing may begin shortly after payment</li>
              <li>Some fees may be non-refundable once processing has started</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              2. Non-Refundable Items
            </h2>
            <p>Unless explicitly stated otherwise, the following are generally non-refundable:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Challenge/package purchase fees after order confirmation</li>
              <li>Processing fees and payment gateway fees</li>
              <li>Activated or delivered challenge accounts</li>
              <li>Accounts already assigned, issued, or manually sent to the user</li>
              <li>Fees related to rule violations, account suspension, or breach of terms</li>
              <li>Charges associated with withdrawal processing, if applicable and disclosed</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              3. Eligible Refund Cases
            </h2>
            <p>Refunds may be considered only in limited situations, such as:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>A duplicate payment was made accidentally</li>
              <li>The payment was successfully captured but the order was not created</li>
              <li>A technical error occurred on our side and no package was delivered</li>
              <li>A refund is required under applicable consumer protection law</li>
              <li>The payment was taken without authorization, subject to verification</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              4. Refund Conditions
            </h2>
            <p>To be eligible for review, refund requests must:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Be submitted from the registered email address</li>
              <li>Include the payment reference / transaction ID</li>
              <li>Be made within a reasonable time after purchase, typically within 3 to 7 days, unless local law requires otherwise</li>
              <li>Be supported by evidence if the issue is technical or payment-related</li>
            </ul>
            <p>We may deny refund requests if:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>The package or account has already been delivered</li>
              <li>The challenge was already accessed or used</li>
              <li>A user violated Terms and Conditions or Prohibited Trading Practices</li>
              <li>A chargeback, dispute, or payment reversal was initiated</li>
              <li>Fraud, abuse, or suspicious activity is detected</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              5. Chargebacks and Payment Disputes
            </h2>
            <p>Users agree not to initiate chargebacks or payment reversals except in cases of genuine unauthorized transactions.</p>
            <p>If a chargeback or dispute is filed:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>The user account may be suspended immediately</li>
              <li>Access to the dashboard and related services may be restricted</li>
              <li>Pending withdrawals or profits may be paused during review</li>
              <li>AlphaFundX reserves the right to contest the dispute with supporting evidence</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              6. Refund Processing Time
            </h2>
            <p>If a refund is approved, the processing time depends on the original payment method and payment provider.</p>
            <p>Typical processing time:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>3 to 10 business days, depending on the provider and banking network</li>
            </ul>
            <p>AlphaFundX is not responsible for delays caused by:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Banks</li>
              <li>Card processors</li>
              <li>Crypto network confirmations</li>
              <li>Third-party payment providers</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              7. Partial Refunds
            </h2>
            <p>Partial refunds may be issued only at our discretion in exceptional cases, such as:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>A service error occurred after partial delivery</li>
              <li>A package was upgraded, downgraded, or manually adjusted</li>
              <li>A custom arrangement was made by support or admin</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              8. Admin Review
            </h2>
            <p>All refund requests are subject to manual review by AlphaFundX administrators.</p>
            <p>We reserve the right to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Approve</li>
              <li>Reject</li>
              <li>Request additional information</li>
              <li>Offer store credit or account adjustment instead of cash refund</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              9. Contact for Refund Requests
            </h2>
            <p>To request a refund, contact:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Email: <a href="mailto:[Insert Email Address]" className="text-primary hover:underline">[Insert Email Address]</a></li>
              <li>Telegram: [Insert Telegram Support Handle]</li>
            </ul>
            <p>Please include:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Full name</li>
              <li>Registered email address</li>
              <li>Order ID / transaction ID</li>
              <li>Reason for the request</li>
              <li>Any supporting screenshots or documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
