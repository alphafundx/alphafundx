"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownRight, Wallet, Bitcoin, CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

const withdrawals = [
  { id: "WTH-9281", date: "Oct 24, 2023", amount: 1250.00, method: "Crypto (USDT)", status: "Completed" },
  { id: "WTH-8172", date: "Sep 15, 2023", amount: 800.00, method: "Bank Transfer", status: "Completed" },
  { id: "WTH-7364", date: "Aug 02, 2023", amount: 2100.00, method: "Crypto (BTC)", status: "Completed" },
  { id: "WTH-6253", date: "Jul 10, 2023", amount: 500.00, method: "Bank Transfer", status: "Rejected" },
];

export default function WithdrawalsPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("crypto");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success("Withdrawal request submitted successfully");
    setAmount("");
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "Completed":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-medium"><CheckCircle2 className="size-3" /> Completed</span>;
      case "Pending":
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-medium"><Clock className="size-3" /> Pending</span>;
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
                <p className="text-2xl font-bold text-foreground">$4,100.00</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                  <Input 
                    id="amount" 
                    type="number" 
                    min="100"
                    max="4100"
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
                    onClick={() => setMethod("crypto")}
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
                    onClick={() => setMethod("bank")}
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
                  <Input id="address" placeholder="T..." className="bg-white/[0.02]" required />
                </div>
              )}

              {method === "bank" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label htmlFor="iban">IBAN / Account Number</Label>
                  <Input id="iban" placeholder="Enter details..." className="bg-white/[0.02]" required />
                </div>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
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
                      <td className="px-6 py-4 font-medium text-foreground">{w.id}</td>
                      <td className="px-6 py-4 text-muted-foreground">{w.date}</td>
                      <td className="px-6 py-4 text-muted-foreground">{w.method}</td>
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
    </div>
  );
}
