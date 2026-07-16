"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Bitcoin, CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function WithdrawalsPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("crypto");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/withdrawals").then(r => r.json()),
      fetch("/api/users/me/dashboard").then(r => r.json())
    ]).then(([withdrawalsData, dashboardData]) => {
      setWithdrawals(Array.isArray(withdrawalsData) ? withdrawalsData : []);
      if (dashboardData.packages) {
        const active = dashboardData.packages.filter((p: any) => p.status === "ACTIVE");
        setPackages(active);
        if (active.length > 0) setSelectedPackageId(active[0].id);
      }
      setIsLoading(false);
    });
  }, []);

  const selectedPackage = packages.find(p => p.id === selectedPackageId);
  const maxAvailable = selectedPackage ? selectedPackage.currentProfit : 0;

  const handleRequestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackageId) {
      toast.error("No active package selected");
      return;
    }
    const reqAmount = parseFloat(amount);
    if (isNaN(reqAmount) || reqAmount < 100) {
      toast.error("Minimum withdrawal is $100");
      return;
    }
    if (reqAmount > maxAvailable) {
      toast.error("Amount exceeds available profit");
      return;
    }
    if (!details.trim()) {
      toast.error("Please enter payout details");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/withdrawals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPackageId: selectedPackageId,
          amount: reqAmount,
          paymentMethod: method.toUpperCase(),
          paymentDetails: method === "crypto" ? { address: details } : { iban: details }
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit withdrawal");
      }
      toast.success("Withdrawal request submitted successfully");
      setAmount("");
      setDetails("");
      // Refresh withdrawals
      const updated = await fetch("/api/withdrawals").then(r => r.json());
      setWithdrawals(Array.isArray(updated) ? updated : []);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "PAID":
      case "APPROVED":
      case "Completed":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-medium"><CheckCircle2 className="size-3" /> Paid</span>;
      case "PENDING":
      case "Pending":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-medium"><Clock className="size-3" /> Pending</span>;
      case "REJECTED":
      case "Rejected":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 text-xs font-medium"><XCircle className="size-3" /> Rejected</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Withdrawals"
        description="Request payouts and view your withdrawal history."
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
              <div className="border-b border-white/[0.06] px-6 py-4">
                <h3 className="text-lg font-semibold text-foreground">Request Payout</h3>
              </div>
              <form onSubmit={handleRequestWithdrawal} className="p-6 space-y-5">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-2">
                  <p className="text-sm text-muted-foreground mb-1">Available to Withdraw</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${maxAvailable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                {packages.length > 1 && (
                  <div className="space-y-2">
                    <Label>Select Package</Label>
                    <select 
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white/[0.02] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedPackageId}
                      onChange={e => setSelectedPackageId(e.target.value)}
                    >
                      {packages.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#1C1A21]">
                          {p.packageName} (${p.accountSize.toLocaleString()}) - Profit: ${p.currentProfit.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input 
                      id="amount" 
                      type="number" 
                      min="100"
                      max={Math.max(100, maxAvailable)}
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00" 
                      className="pl-7 bg-white/[0.02]" 
                      required 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum withdrawal: $100</p>
                </div>

                <div className="space-y-3 pt-2">
                  <Label>Payout Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => { setMethod("crypto"); setDetails(""); }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-medium transition-colors ${
                        method === "crypto" 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04]"
                      }`}
                    >
                      <Bitcoin className="size-5 mb-2" />
                      Crypto
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMethod("bank"); setDetails(""); }}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-medium transition-colors ${
                        method === "bank" 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:bg-white/[0.04]"
                      }`}
                    >
                      <Wallet className="size-5 mb-2" />
                      Bank
                    </button>
                  </div>
                </div>

                {method === "crypto" && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="address">USDT (TRC20) Address</Label>
                    <Input 
                      id="address" 
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                      placeholder="T..." 
                      className="bg-white/[0.02]" 
                      required 
                    />
                  </div>
                )}

                {method === "bank" && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="iban">IBAN / Account Number</Label>
                    <Input 
                      id="iban" 
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                      placeholder="Enter details..." 
                      className="bg-white/[0.02]" 
                      required 
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting || maxAvailable < 100} 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
                >
                  {isSubmitting ? "Processing..." : "Submit Request"}
                </Button>
              </form>
            </div>
          </div>

          {/* History Table */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/[0.06] bg-card overflow-hidden">
              <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Withdrawal History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-b border-white/[0.06]">
                    <tr>
                      <th className="px-6 py-4 font-medium">ID</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Method</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((w, i) => (
                      <tr key={w.id} className={`border-b border-white/[0.04] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                        <td className="px-6 py-4 font-medium text-foreground">{w.id.split("-")[0].substring(0, 8)}...</td>
                        <td className="px-6 py-4 text-muted-foreground">{new Date(w.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-muted-foreground capitalize">{w.paymentMethod}</td>
                        <td className="px-6 py-4 font-medium text-foreground">${w.amount.toFixed(2)}</td>
                        <td className="px-6 py-4"><StatusBadge status={w.status} /></td>
                      </tr>
                    ))}
                    {withdrawals.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          No withdrawals found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
