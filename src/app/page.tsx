import { StickyBar }    from "@/components/layout/StickyBar";
import { StickyAmazonBadge } from "@/components/layout/StickyAmazonBadge";
import { BookHero }     from "@/components/sections/BookHero";
import { AuthorVideoSection } from "@/components/sections/AuthorVideoSection";
import { AuthorSection }    from "@/components/sections/AuthorSection";
import { FrameworkSection } from "@/components/sections/FrameworkSection";
import { BookContents }        from "@/components/sections/BookContents";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { UrgencySection }      from "@/components/sections/UrgencySection";
import { FaqSection }          from "@/components/sections/FaqSection";
import { CtaSection }          from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <StickyBar />
      <StickyAmazonBadge />
      <main>
        <BookHero />
        <AuthorVideoSection />
        <AuthorSection />
        <FrameworkSection />
        <BookContents />
        <TestimonialsSection />
        <UrgencySection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}
