"use client"

import { track } from "@vercel/analytics"
import Link from "next/link"
import { useEffect, type ComponentProps } from "react"

type TrackedServiceLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  href: string
  serviceSlug: string
  eventName: string
}

export function ServicePageAnalytics({ serviceSlug }: { serviceSlug: string }) {
  useEffect(() => {
    track("service_page_visit", { service: serviceSlug })
  }, [serviceSlug])

  return null
}

export function ServiceTrackedLink({ href, serviceSlug, eventName, children, ...props }: TrackedServiceLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => track(eventName, { service: serviceSlug })}
      {...props}
    >
      {children}
    </Link>
  )
}
