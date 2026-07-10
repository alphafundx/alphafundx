import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground selection:bg-primary/30">
      <div className="space-y-6 text-center flex flex-col items-center">
        <h1 className="text-8xl font-black tracking-tighter">404</h1>
        <p className="text-lg text-muted-foreground font-medium">Page not found</p>
        
        <Link href="/" className="mt-8 inline-block">
          <Button 
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 glow-subtle font-semibold px-8 py-6 h-auto flex items-center gap-2 transition-all"
          >
            Back to Home
            <ArrowRight className="size-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
