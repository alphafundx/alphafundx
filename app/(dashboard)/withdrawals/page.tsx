"use client";

import { useEffect, useState, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowDownRight,
  Wallet,
  Bitcoin,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Loader2,
  ArrowDownUp,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface UserWithdrawal {
  id: string;
  amount: number;
  paymentMethod: string;
  paymentDetails: Record<string, string> | null;
  status: string;
  adminNote: string | null;
  createdAt: string;
  userPackage: { package: { name: string; accountSize: number } } | null;
}

interface UserPackage {
  id: string;
  packageName: string;
  accountSize: number;
  currentProfit: number;
  status: string;
}

export default function WithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<UserWithdrawal[]>([]);
  const [packages, setPackages] = useState<UserPackage[]>([]);
  const [loading, setLoading] = useState(true);

  // Request form
  const [showForm, setShowForm] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("CRYPTO");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [wRes, dRes] = await Promise.all([
        fetch("/api/withdrawals"),
        fetch("/api/users/me/dashboard"),
      ]);

      if (wRes.ok) {
        const wData = await wRes.json();
        setWithdrawals(wData);
      }

      if (dRes.ok) {
        const dData = await dRes.json();
        setPackages(
          (dData.packages || [])
            .filter((p: { status: string }) => p.status === "ACTIVE")
            .map((p: { id: string; packageName: string; accountSize: number; currentProfit: number; status: string }) => ({
              id: p.id,
              packageName: p.packageName,
              accountSize: p.accountSize,
              currentProfit: p.currentProfit,
              status: p.status,
            }))
        );
      }
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRequestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPackageId) {
      toast.error("Please select a package");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/withdrawals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPackageId: selectedPackageId,
          amount: Number(amount),
          paymentMethod: method,
          paymentDetails: { walletAddress: walletAddress || "N/A" },
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to submit withdrawal");
        return;
      }

      toast.success("Withdrawal request submitted successfully!");
      setAmount("");
      setWalletAddress("");
      setShowForm(false);
      fetchData();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "PAID":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-medium"><CheckCircle2 className="size-3" /> Paid</span>;
      case "APPROVED":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium"><CheckCircle2 className="size-3" /> Approved</span>;
      case "PENDING":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-medium"><Clock className="size-3" /> Pending</span>;
      case "REJECTED":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 text-xs font-medium"><XCircle className="size-3" /> Rejected</span>;
      default:
        return <span className="text-xs text-muted-foreground">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader title="Withdrawals" description="Loading..." />
        <div className="h-[300px] rounded-xl border border-white/[0.06] bg-card animate-pulse" />
      </div>
    );
  }

  const selectedPkg = packages.find((p) => p.id === selectedPackageId);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Withdrawals"
        description="Request payouts and view your withdrawal history."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Request Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground">Request Payout</h3>
            </div>

            {packages.length === 0 ? (
              <div className="p-6 text-center">
                <ArrowDownUp className="size-8 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No active packages with available profit.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestWithdrawal} className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label>Select Package</Label>
                  <select
                    className="w-full h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-foreground text-sm px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={selectedPackageId}
                    onChange={(e) => setSelectedPackageId(e.target.value)}
                  >
                    <option value="">Choose a package</option>
                    {packages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.packageName} (${p.accountSize.toLocaleString()}) — Profit: ${p.currentProfit.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedPkg && (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm">
                    <p className="text-muted-foreground">Available profit: <span className="text-primary font-semibold">${selectedPkg.currentProfit.toLocaleString()}</span></p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Amount ($)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={1}
                    max={selectedPkg?.currentProfit || 99999}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMethod("CRYPTO")}
                      className={`flex items-center gap-2 p-3 rounded-lg border text-sm transition-all ${
                        method === "CRYPTO"
                          ? "border-primary/40 bg-primary/5 text-primary"
                          : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:border-white/10"
                      }`}
                    >
                      <Bitcoin className="size-4" /> Crypto
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod("BANK_TRANSFER")}
                      className={`flex items-center gap-2 p-3 rounded-lg border text-sm transition-all ${
                        method === "BANK_TRANSFER"
                          ? "border-primary/40 bg-primary/5 text-primary"
                          : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:border-white/10"
                      }`}
                    >
                      <Wallet className="size-4" /> Bank
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{method === "CRYPTO" ? "Wallet Address" : "Bank Details"}</Label>
                  <Input
                    placeholder={method === "CRYPTO" ? "Enter wallet address (USDT TRC-20)" : "Enter IBAN or bank details"}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedPackageId || !amount}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin mr-2" />
                  ) : (
                    <ArrowDownRight className="size-4 mr-2" />
                  )}
                  {isSubmitting ? "Submitting..." : "Request Withdrawal"}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
            <div className="border-b border-white/[0.06] px-6 py-4">
              <h3 className="text-lg font-semibold text-foreground">Withdrawal History</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Package</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Method</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center">
                        <DollarSign className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm">No withdrawals yet</p>
                      </td>
                    </tr>
                  ) : (
                    withdrawals.map((w) => (
                      <tr key={w.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors">
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(w.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {w.userPackage?.package.name || "—"}
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">${w.amount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-muted-foreground">{w.paymentMethod}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={w.status} />
                          {w.adminNote && (
                            <p className="text-xs text-muted-foreground mt-1 italic">Note: {w.adminNote}</p>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
