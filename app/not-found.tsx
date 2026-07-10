import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground selection:bg-primary/30">
      <div className="space-y-6 text-center flex flex-col items-center">
        <div className="font-black tracking-tighter">
          <FuzzyText 
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover
            fontSize="clamp(6rem, 15vw, 12rem)"
            fontWeight={900}
            color="#26FF5E"
          >
            404
          </FuzzyText>
        </div>
        <div className="font-medium">
          <FuzzyText 
            baseIntensity={0.1}
            hoverIntensity={0.4}
            enableHover
            fontSize="1.125rem"
            fontWeight={500}
            color="#a1a1aa"
          >
            Page not found
          </FuzzyText>
        </div>
        
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
