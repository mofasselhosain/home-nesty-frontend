
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Home,
  KeyRound,
  Sparkles,
  Tags,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const offers = [
  {
    id: "rent",
    title: "Rent a Property",
    description:
      "Find your perfect home with affordable rental options that match your lifestyle and budget.",
    icon: KeyRound,
    label: "Find Your Home",
    features: ["Verified properties", "Flexible rental options", "Easy booking"],
    href: "/properties?purpose=RENT",
    gradient: "from-blue-500/10 to-cyan-500/5",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    id: "buy",
    title: "Buy a Property",
    description:
      "Discover your dream property and make a smart investment for your future.",
    icon: Home,
    label: "Explore Properties",
    features: ["Premium listings", "Property comparisons", "Direct connections"],
    href: "/properties?purpose=BUY",
    gradient: "from-violet-500/10 to-purple-500/5",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    id: "sell",
    title: "Sell Your Property",
    description:
      "Reach potential buyers, showcase your property, and manage your listings easily.",
    icon: Tags,
    label: "List Your Property",
    features: ["Easy property listing", "Reach more customers", "Manage inquiries"],
    href: "/provider-dashboard",
    gradient: "from-emerald-500/10 to-teal-500/5",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
];

export default function OffersSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-purple-100/50 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-blue-700"
          >
            <Building2 className="mr-2 size-3.5" />
            Your Property, Your Choice
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            What Are You Looking
            <span className="block text-blue-600">For Today?</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Whether you want to rent, buy, or sell a property, Home Nesty
            makes your real-estate journey simple, secure, and convenient.
          </p>
        </div>

        {/* Offers cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => {
            const Icon = offer.icon;

            return (
              <Card
                key={offer.id}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${offer.gradient} shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl`}
              >
                <CardHeader className="space-y-5 p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl ${offer.iconBg} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`size-7 ${offer.iconColor}`} />
                    </div>

                    <Badge
                      variant="outline"
                      className="rounded-full border-white/80 bg-white/70 text-xs"
                    >
                      Home Nesty
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-2xl">
                      {offer.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {offer.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 px-6 sm:px-7">
                  <div className="space-y-3">
                    {offer.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-6 sm:px-7">
                  <Button
                    
                    className="h-11 w-full rounded-xl bg-slate-900 text-white transition-all duration-300 hover:bg-blue-600"
                  >
                    <Link href="/property">
                      {offer.label}
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* AI property finder banner */}
        <div className="relative mt-12 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-10 lg:p-12">
          <div className="absolute -right-20 -top-24 size-72 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <Badge className="mb-5 border border-blue-400/30 bg-blue-500/15 text-blue-300 hover:bg-blue-500/20">
                <Sparkles className="mr-2 size-3.5" />
                AI-Powered Property Finder
              </Badge>

              <h3 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Find Your Perfect Property
                <span className="text-blue-400"> With AI.</span>
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                Tell us your budget, preferred location, and lifestyle.
                Our AI-powered assistant helps you discover properties
                that match your needs.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-300 sm:text-sm">
                <span className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-blue-400" />
                  Smart recommendations
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="size-4 text-blue-400" />
                  Personalized search
                </span>
              </div>
            </div>

            <div className="w-full lg:w-auto lg:shrink-0">
              <Button
                
                size="lg"
                className="h-12 w-full rounded-xl bg-blue-600 px-7 text-white hover:bg-blue-500 lg:w-auto"
              >
                <Link href="/property">
                  <Sparkles className="mr-2 size-4" />
                  Explore AI Finder
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom trust message */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
          <span>Trusted property platform</span>
          <span className="hidden size-1 rounded-full bg-slate-300 sm:block" />
          <span>Simple property management</span>
          <span className="hidden size-1 rounded-full bg-slate-300 sm:block" />
          <span>Better real-estate experience</span>
        </div>
      </div>
    </section>
  );
}
