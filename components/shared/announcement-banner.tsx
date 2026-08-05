import { prisma } from "@/lib/prisma";
import { CopyButton } from "./copy-button";

/**
 * Extract just the discount code from text like:
 * "CODE: SUMMER25" → "SUMMER25"
 * "Use code SUMMER25 for 20% off" → "SUMMER25"
 * "SUMMER25" → "SUMMER25"
 */
function extractCode(text: string): string {
  // Remove common prefixes
  const cleaned = text
    .replace(/^(use\s+)?code\s*:?\s*/i, "")
    .trim();
  // Take only the first word (the code itself)
  const firstWord = cleaned.split(/\s+/)[0];
  return firstWord || cleaned;
}

export async function AnnouncementBanner() {
  let setting;
  try {
    setting = await prisma.siteSettings.findUnique({
      where: { key: "ANNOUNCEMENT_BANNER" },
    });
  } catch {
    // Gracefully handle DB errors during prerender/build
    return null;
  }

  if (!setting || !setting.value) return null;

  const { isActive, text, actionText } = setting.value as {
    isActive?: boolean;
    text?: string;
    actionText?: string;
  };

  if (!isActive || !text) return null;

  return (
    <div className="w-full bg-[#26FF5E] text-[#0a0a0a] py-2.5 px-4 flex items-center justify-center text-xs sm:text-sm font-semibold z-[100] relative border-b border-[#0a0a0a]/10">
      <div className="flex flex-col sm:flex-row items-center gap-2 max-w-7xl mx-auto text-center">
        <span className="tracking-wide uppercase">{text}</span>
        {actionText && (
          <div className="flex items-center gap-2 sm:ml-2 sm:pl-2 sm:border-l border-[#0a0a0a]/20">
            <span className="font-bold tracking-wider">{actionText}</span>
            <CopyButton 
              textToCopy={extractCode(actionText)} 
              className="bg-[#0a0a0a]/10 hover:bg-[#0a0a0a]/20 text-[#0a0a0a]" 
            />
          </div>
        )}
      </div>
    </div>
  );
}
