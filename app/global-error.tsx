"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import FuzzyText from "@/components/FuzzyText";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col items-center justify-center bg-[#0a0d12] text-white font-sans">
        <div className="text-center space-y-6 px-4 max-w-md">
          <div className="font-black tracking-tighter">
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover
              fontSize="clamp(4rem, 10vw, 8rem)"
              fontWeight={900}
              color="#ef4444"
            >
              ERROR
            </FuzzyText>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">Critical Error</h2>
            <p className="text-zinc-400 text-sm">
              A critical error has occurred. We apologize for the inconvenience.
            </p>
          </div>

          {error.digest && (
            <p className="text-xs text-zinc-600 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              onClick={reset}
              className="bg-[#26FF5E] text-black font-semibold hover:bg-[#26FF5E]/90 rounded-full px-6 gap-2"
            >
              <RefreshCw className="size-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="rounded-full px-6 gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 w-full"
              >
                <Home className="size-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
