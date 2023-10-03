import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function IndexPage() {
  return (
    <>
    <SiteHeader/>
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Event Sathi: Unlock the World of Events 
          {/* Your Event, Our Platform */}
        </h1>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          Bridging the gap between organizers and attendees - Your central portal for Eventful experiences
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.startNow}
          rel="noreferrer"
          className={buttonVariants()}
        >
          Start now
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          Learn more
        </Link>
      </div>
    </section>
    </>
  )
}
