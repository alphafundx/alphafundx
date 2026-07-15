import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AlphaFundX Privacy Policy - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Privacy Policy
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
              This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website and related services. By using this website, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              1. Introduction
            </h2>
            <p>
              We provide a funded trading challenge platform that allows users to register, purchase funding packages, submit Telegram usernames, view account information, request withdrawals, and communicate with administrators.
            </p>
            <p>
              This website does not execute trades directly. Trading activities take place outside the website through third-party platforms such as MetaTrader 5 and Telegram.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              2. Information We Collect
            </h2>
            <p>We may collect the following types of information:</p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">A. Information You Provide Directly</h3>
            <p>When you register, purchase a package, or use the dashboard, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Full name</li>
              <li>Email address</li>
              <li>Username</li>
              <li>Password</li>
              <li>Telegram username</li>
              <li>Billing or payment details</li>
              <li>Withdrawal details</li>
              <li>Account preferences</li>
              <li>Any messages or support requests you send us</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">B. Payment Information</h3>
            <p>If you make a purchase, payment data may be collected and processed by our third-party payment providers. We may receive limited payment-related information such as:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Transaction ID</li>
              <li>Payment status</li>
              <li>Payment confirmation</li>
              <li>Billing name</li>
              <li>Last four digits of a payment method, depending on the provider</li>
            </ul>
            <p>We do not intentionally store full card details unless handled by a secure payment processor.</p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">C. Automatically Collected Information</h3>
            <p>When you visit the website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Date and time of access</li>
              <li>Referring website</li>
              <li>Cookies and similar tracking data</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">D. Telegram and Communication Data</h3>
            <p>If you submit your Telegram username or contact us through Telegram, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Telegram username</li>
              <li>Message content</li>
              <li>Account delivery or support communication details</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              3. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Register and manage your account</li>
              <li>Process package purchases</li>
              <li>Communicate with you about your account</li>
              <li>Send demo or funded account details through Telegram</li>
              <li>Display account status, balance, and profit information</li>
              <li>Process withdrawal requests</li>
              <li>Respond to support inquiries</li>
              <li>Prevent fraud, abuse, or unauthorized activity</li>
              <li>Improve website functionality and user experience</li>
              <li>Comply with legal or regulatory obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              4. Legal Basis for Processing
            </h2>
            <p>Depending on your location, we may process your personal data based on one or more of the following:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Your consent</li>
              <li>Performance of a contract</li>
              <li>Legitimate business interests</li>
              <li>Compliance with legal obligations</li>
              <li>Fraud prevention and security</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              5. Sharing of Information
            </h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">A. Service Providers</h3>
            <p>We may share data with trusted third-party providers that help us operate the website, such as:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Payment processors</li>
              <li>Hosting providers</li>
              <li>Analytics providers</li>
              <li>Email or messaging services</li>
              <li>Telegram communication tools</li>
              <li>Security and fraud-prevention tools</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">B. Admin and Internal Staff</h3>
            <p>Your information may be accessed by administrators and authorized staff for:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Account verification</li>
              <li>Package delivery</li>
              <li>Profit updates</li>
              <li>Withdrawal handling</li>
              <li>Customer support</li>
              <li>Fraud monitoring</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">C. Legal Compliance</h3>
            <p>We may disclose your information if required to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Comply with law or legal process</li>
              <li>Respond to government or regulatory requests</li>
              <li>Protect our rights, users, or property</li>
              <li>Investigate fraud, abuse, or security incidents</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              6. Telegram Username and Communication
            </h2>
            <p>If you submit a Telegram username, you consent to us using it for:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Sending demo account details</li>
              <li>Sending funded account details</li>
              <li>Support communication</li>
              <li>Withdrawal-related communication</li>
              <li>Service updates and account notifications</li>
            </ul>
            <p>You are responsible for ensuring that the Telegram username you provide is correct and that you can receive messages from our support/admin team.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              7. Cookies and Tracking Technologies
            </h2>
            <p>We may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Keep you logged in</li>
              <li>Remember preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve performance and functionality</li>
              <li>Detect suspicious activity</li>
            </ul>
            <p>You may disable cookies in your browser settings, but some features of the website may not work properly.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              8. Data Retention
            </h2>
            <p>We retain your information for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Provide services to you</li>
              <li>Maintain your account history</li>
              <li>Process purchases and withdrawals</li>
              <li>Comply with legal, tax, or regulatory obligations</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p>If you request deletion, we may still retain certain data where required by law or for legitimate business purposes.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              9. Data Security
            </h2>
            <p>We take reasonable administrative, technical, and organizational measures to protect your data, including:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Secure account access controls</li>
              <li>Encryption where appropriate</li>
              <li>Restricted admin access</li>
              <li>Monitoring for suspicious activity</li>
            </ul>
            <p>However, no system is completely secure. We cannot guarantee absolute security of your data transmitted over the internet.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              10. Third-Party Services
            </h2>
            <p>Our website may use or link to third-party services, including:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>MetaTrader 5</li>
              <li>Telegram</li>
              <li>Payment gateways</li>
              <li>Hosting providers</li>
              <li>Analytics tools</li>
            </ul>
            <p>These third parties have their own privacy policies and terms. We are not responsible for their practices or content.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              11. International Data Transfers
            </h2>
            <p>If you access the website from outside our operating country, your information may be transferred to and processed in other countries where data protection laws may differ.</p>
            <p>By using the website, you consent to such transfers where permitted by law.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              12. Your Rights
            </h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to certain processing</li>
              <li>Restrict processing</li>
              <li>Request a copy of your data</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p>To exercise these rights, contact us at <a href="mailto:[Insert Email Address]" className="text-primary hover:underline">[Insert Email Address]</a>.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              13. Children&apos;s Privacy
            </h2>
            <p>Our website is not intended for children under 18 years of age, or the legal age of majority in your jurisdiction.</p>
            <p>We do not knowingly collect personal data from children. If we become aware that such information has been collected, we will take appropriate steps to delete it.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              14. Marketing Communications
            </h2>
            <p>We may send you service-related messages such as:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
              <li>Purchase confirmations</li>
              <li>Account delivery updates</li>
              <li>Withdrawal updates</li>
              <li>Policy updates</li>
              <li>Important service announcements</li>
            </ul>
            <p>If we send promotional messages, you may opt out where required by law.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              15. Changes to This Privacy Policy
            </h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
            <p>Your continued use of the website after updates means you accept the revised policy.</p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              16. Contact Us
            </h2>
            <p>If you have any questions about this Privacy Policy or how your data is handled, contact us at:</p>
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
