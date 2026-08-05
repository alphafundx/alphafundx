"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import {
  Loader2,
  Upload,
  CheckCircle,
  Copy,
  ArrowLeft,
  Shield,
  Clock,
  ImageIcon,
  X,
  Tag,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PackageData {
  id: string;
  name: string;
  accountSize: number;
  originalPrice: number;
  discountedPrice: number | null;
  discountPercentage: number | null;
  features: string[];
  currency: string;
}

interface CryptoSettings {
  walletAddress: string;
  networkChain: string;
}

interface AppliedDiscount {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  discountAmount: number;
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const packageId = params.packageId as string;

  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [cryptoSettings, setCryptoSettings] = useState<CryptoSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Discount code state
  const [discountInput, setDiscountInput] = useState("");
  const [discountLoading, setDiscountLoading] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);
  const [discountError, setDiscountError] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push(`/login?callbackUrl=/checkout/${packageId}`);
    }
  }, [sessionStatus, router, packageId]);

  // Fetch package details and crypto settings
  const fetchData = useCallback(async () => {
    try {
      const [pkgRes, settingsRes] = await Promise.all([
        fetch("/api/packages"),
        fetch("/api/settings/crypto"),
      ]);

      if (pkgRes.ok) {
        const packages = await pkgRes.json();
        const found = packages.find((p: PackageData) => p.id === packageId);
        if (found) setPkg(found);
        else {
          toast.error("Package not found");
          router.push("/#packages");
        }
      }

      if (settingsRes.ok) {
        const settings = await settingsRes.json();
        setCryptoSettings(settings);
      }
    } catch {
      toast.error("Failed to load checkout data");
    } finally {
      setLoading(false);
    }
  }, [packageId, router]);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      fetchData();
    }
  }, [sessionStatus, fetchData]);

  // Base price before discount code
  const basePrice = pkg?.discountedPrice ?? pkg?.originalPrice ?? 0;

  // Final price after discount code
  const finalPrice = appliedDiscount
    ? Math.max(0, Math.round((basePrice - appliedDiscount.discountAmount) * 100) / 100)
    : basePrice;

  // Apply discount code
  const applyDiscountCode = async () => {
    const code = discountInput.trim();
    if (!code) {
      setDiscountError("Please enter a discount code");
      return;
    }

    setDiscountLoading(true);
    setDiscountError("");

    try {
      const res = await fetch("/api/discount-codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, orderAmount: basePrice, packageId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setDiscountError(data.error || "Invalid discount code");
        setAppliedDiscount(null);
        return;
      }

      setAppliedDiscount({
        id: data.id,
        code: data.code,
        type: data.type,
        value: data.value,
        discountAmount: data.discountAmount,
      });
      setDiscountError("");
      toast.success(`Discount code "${data.code}" applied!`);
    } catch {
      setDiscountError("Failed to validate code. Please try again.");
    } finally {
      setDiscountLoading(false);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountInput("");
    setDiscountError("");
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, and WEBP images are allowed");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewUrl(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload the file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const { url } = await res.json();
      setScreenshotUrl(url);
      toast.success("Screenshot uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
      setPreviewUrl("");
    } finally {
      setUploading(false);
    }
  };

  // Copy wallet address
  const copyAddress = () => {
    if (cryptoSettings?.walletAddress) {
      navigator.clipboard.writeText(cryptoSettings.walletAddress);
      setCopied(true);
      toast.success("Wallet address copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Submit the order
  const handleSubmit = async () => {
    if (!screenshotUrl) {
      toast.error("Please upload a screenshot of your payment");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          paymentMethod: "CRYPTO",
          paymentScreenshot: screenshotUrl,
          discountCodeId: appliedDiscount?.id || null,
          discountAmount: appliedDiscount?.discountAmount || 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit order");
      }

      setSubmitted(true);
      toast.success("Payment submitted! Admin will verify shortly.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading states
  if (sessionStatus === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0e0d11] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#26FF5E]" />
      </div>
    );
  }

  if (!session) return null;

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0e0d11] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-[#26FF5E]/10 flex items-center justify-center">
            <CheckCircle className="size-10 text-[#26FF5E]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Payment Submitted!</h1>
          <p className="text-white/50 text-lg">
            Your payment proof has been submitted successfully. Our admin team
            will verify the transfer and activate your package shortly.
          </p>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Package</span>
              <span className="text-white font-semibold">{pkg?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Amount</span>
              <span className="text-[#26FF5E] font-semibold">
                ${finalPrice.toFixed(2)}
              </span>
            </div>
            {appliedDiscount && (
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Discount</span>
                <span className="text-[#26FF5E] font-semibold">
                  -{appliedDiscount.type === "PERCENTAGE" ? `${appliedDiscount.value}%` : `$${appliedDiscount.discountAmount.toFixed(2)}`}
                  {" "}({appliedDiscount.code})
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Status</span>
              <span className="text-yellow-400 font-semibold">Pending Verification</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/dashboard">
              <Button className="w-full bg-[#26FF5E] text-[#0a0a0a] hover:bg-[#26FF5E]/90 font-semibold h-12 text-base">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full h-12 text-base border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.04]"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0d11] relative">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#26FF5E]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/#packages"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="size-4" />
            Back to Packages
          </Link>
          <Logo size="sm" />
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Secure Checkout
          </h1>
          <p className="text-white/40 text-base">
            Complete your payment to activate your trading challenge
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6">
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
            Order Summary
          </h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-bold text-white">{pkg?.name}</p>
              <p className="text-white/40 text-sm">
                ${((pkg?.accountSize ?? 0) / 1000).toFixed(0)}K Account
              </p>
            </div>
            <div className="text-right">
              {pkg?.discountedPrice && pkg.discountPercentage ? (
                <>
                  <p className="text-sm text-white/30 line-through">
                    ${pkg.originalPrice.toFixed(2)}
                  </p>
                  <p className="text-2xl font-bold text-[#26FF5E]">
                    ${pkg.discountedPrice.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-bold text-[#26FF5E]">
                  ${(pkg?.originalPrice ?? 0).toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Discount Code Applied */}
          {appliedDiscount && (
            <div className="flex items-center justify-between py-2 border-t border-white/[0.06]">
              <span className="text-white/50 text-sm flex items-center gap-1.5">
                <Tag className="size-3.5 text-[#26FF5E]" />
                Discount ({appliedDiscount.code})
              </span>
              <span className="text-[#26FF5E] font-medium text-sm">
                −${appliedDiscount.discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="border-t border-white/[0.06] pt-3 flex justify-between">
            <span className="text-white/50 font-medium">Total</span>
            <span className="text-xl font-bold text-white">${finalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Discount Code Input */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="size-4 text-[#26FF5E]" />
            <h2 className="text-base font-bold text-white">
              Have a Discount Code?
            </h2>
          </div>

          {appliedDiscount ? (
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#26FF5E]/5 border border-[#26FF5E]/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-4 text-[#26FF5E]" />
                <span className="text-sm font-semibold text-[#26FF5E]">
                  {appliedDiscount.code}
                </span>
                <span className="text-xs text-white/40">
                  ({appliedDiscount.type === "PERCENTAGE"
                    ? `${appliedDiscount.value}% off`
                    : `$${appliedDiscount.value.toFixed(2)} off`})
                </span>
              </div>
              <button
                onClick={removeDiscount}
                className="p-1 rounded hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors"
                title="Remove discount"
              >
                <XCircle className="size-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountInput}
                  onChange={(e) => {
                    setDiscountInput(e.target.value.toUpperCase());
                    setDiscountError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && applyDiscountCode()}
                  placeholder="Enter code"
                  className="flex-1 h-10 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#26FF5E]/40 font-mono uppercase tracking-wider"
                />
                <Button
                  onClick={applyDiscountCode}
                  disabled={discountLoading || !discountInput.trim()}
                  className="bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.08] h-10 px-5 text-sm shrink-0"
                >
                  {discountLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
              {discountError && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <XCircle className="size-3" />
                  {discountError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="rounded-2xl border border-[#26FF5E]/20 bg-[#26FF5E]/[0.03] p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-[#26FF5E]/10 flex items-center justify-center">
              <Shield className="size-5 text-[#26FF5E]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Cryptocurrency Payment
              </h2>
              <p className="text-white/40 text-sm">
                Send the exact amount to the wallet address below
              </p>
            </div>
          </div>

          {/* Network Chain */}
          {cryptoSettings?.networkChain && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#26FF5E] uppercase tracking-wider mb-1">
                Network / Chain
              </p>
              <div className="rounded-lg bg-[#26FF5E]/10 border border-[#26FF5E]/20 px-4 py-2.5">
                <p className="text-lg font-bold text-[#26FF5E]">
                  {cryptoSettings.networkChain}
                </p>
              </div>
            </div>
          )}

          {/* Wallet Address */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
              Wallet Address
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.08] px-4 py-3 font-mono text-sm text-white break-all">
                {cryptoSettings?.walletAddress || "Loading..."}
              </div>
              <button
                onClick={copyAddress}
                className="shrink-0 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
                title="Copy address"
              >
                {copied ? (
                  <CheckCircle className="size-5 text-[#26FF5E]" />
                ) : (
                  <Copy className="size-5 text-white/50" />
                )}
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="rounded-lg bg-white/[0.04] border border-white/[0.08] p-4 flex items-center justify-between">
            <span className="text-white/50 text-sm">Amount to Send</span>
            <span className="text-xl font-bold text-white">
              ${finalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Upload Screenshot */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6">
          <h2 className="text-base font-bold text-white mb-1">
            Upload Payment Proof
          </h2>
          <p className="text-white/40 text-sm mb-4">
            Take a screenshot of your completed transaction and upload it below
          </p>

          {previewUrl ? (
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
              <Image
                src={previewUrl}
                alt="Payment screenshot"
                width={600}
                height={400}
                className="w-full h-auto max-h-[300px] object-contain"
              />
              <button
                onClick={() => {
                  setPreviewUrl("");
                  setScreenshotUrl("");
                }}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
              >
                <X className="size-4 text-white" />
              </button>
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="size-8 animate-spin text-[#26FF5E]" />
                </div>
              )}
              {screenshotUrl && !uploading && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#26FF5E]/20 text-[#26FF5E] text-xs font-semibold">
                  <CheckCircle className="size-3.5" />
                  Uploaded
                </div>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed border-white/[0.1] hover:border-[#26FF5E]/30 bg-white/[0.01] hover:bg-[#26FF5E]/[0.02] cursor-pointer transition-all">
              <div className="w-14 h-14 rounded-full bg-white/[0.04] flex items-center justify-center">
                {uploading ? (
                  <Loader2 className="size-6 animate-spin text-[#26FF5E]" />
                ) : (
                  <ImageIcon className="size-6 text-white/30" />
                )}
              </div>
              <div className="text-center">
                <p className="text-white/60 text-sm font-medium">
                  Click to upload screenshot
                </p>
                <p className="text-white/30 text-xs mt-1">
                  PNG, JPG, or WEBP (max 5MB)
                </p>
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          )}
        </div>

        {/* Important Notes */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="size-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-white">Important Notes</h3>
          </div>
          <ul className="space-y-2 text-sm text-white/40">
            <li className="flex items-start gap-2">
              <span className="text-[#26FF5E] mt-0.5">•</span>
              Send the exact amount shown above to the wallet address.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#26FF5E] mt-0.5">•</span>
              Make sure you are sending on the correct network/chain.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#26FF5E] mt-0.5">•</span>
              Upload a clear screenshot showing the completed transaction.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#26FF5E] mt-0.5">•</span>
              Verification usually takes 1–24 hours. You will be notified once approved.
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={submitting || !screenshotUrl}
          className="w-full bg-[#26FF5E] text-[#0a0a0a] hover:bg-[#26FF5E]/90 font-bold h-14 text-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="size-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Upload className="size-5 mr-2" />
              Submit Payment — ${finalPrice.toFixed(2)}
            </>
          )}
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-white/20 mt-6">
          © {new Date().getFullYear()} AlphaFundX. All rights reserved.
        </p>
      </div>
    </div>
  );
}
