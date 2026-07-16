import { prisma } from "@/lib/prisma";
import { CopyButton } from "./copy-button";

export async function AnnouncementBanner() {
  // Fetch from database
  const setting = await prisma.siteSettings.findUnique({
    where: { key: "ANNOUNCEMENT_BANNER" },
  });

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
              textToCopy={actionText.replace("CODE:", "").trim()} 
              className="bg-[#0a0a0a]/10 hover:bg-[#0a0a0a]/20 text-[#0a0a0a]" 
            />
          </div>
        )}
      </div>
    </div>
  );
}
