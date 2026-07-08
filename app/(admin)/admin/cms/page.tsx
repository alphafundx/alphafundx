import { PageHeader } from "@/components/shared/page-header";

const cmsBlocks = [
  { key: "hero", title: "Hero Section", description: "Main heading, subtext, and CTA buttons" },
  { key: "features", title: "Features", description: "Feature cards content" },
  { key: "faq", title: "FAQ", description: "Frequently asked questions" },
  { key: "rules", title: "Trading Rules", description: "Challenge rules and specifications" },
  { key: "stats", title: "Statistics", description: "Homepage statistics counters" },
  { key: "contact", title: "Contact Info", description: "Contact details and support info" },
  { key: "footer", title: "Footer", description: "Footer content and links" },
];

export default function AdminCmsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="CMS" description="Edit website content without code changes." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cmsBlocks.map((block) => (
          <button
            key={block.key}
            className="rounded-xl border border-white/[0.06] bg-card p-6 text-left hover:border-primary/20 hover:bg-card/80 transition-all group"
          >
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {block.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{block.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
