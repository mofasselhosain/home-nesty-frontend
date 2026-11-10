
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Building2,
  CheckCircle2,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";

import { useGetHomeBanner } from "@/hooks/home.banner";

// ----------------------------------
// Types
// ----------------------------------

interface HomeBanner {
  id: number | string;
  title: string;
  description: string;
  image: string;
  subtitle?: string;
  location?: string;
  buttonText?: string;
}

// ----------------------------------
// Default banners
// ----------------------------------

const defaultSlides: HomeBanner[] = [
  {
    id: 1,
    title: "Find Your Perfect Place to Call Home",
    subtitle: "DISCOVER YOUR DREAM PROPERTY",
    description:
      "Explore beautiful homes, modern apartments, and premium properties designed around your lifestyle.",
    image: "/tope-image--.jpg",
    location: "Dhaka, Bangladesh",
    buttonText: "Explore Properties",
  },
  {
    id: 2,
    title: "A Better Home. A Better Lifestyle.",
    subtitle: "PREMIUM LIVING EXPERIENCE",
    description:
      "Discover exceptional properties with modern architecture, comfort, and beautiful surroundings.",
    image: "/tope-image-2-2.jpg",
    location: "Chattogram, Bangladesh",
    buttonText: "Discover Homes",
  },
  {
    id: 3,
    title: "Your Dream Home Starts Here",
    subtitle: "FIND YOUR IDEAL PROPERTY",
    description:
      "From stylish apartments to luxury family homes, find the right property for your future.",
    image: "/tope-image-3.jpg",
    location: "Sylhet, Bangladesh",
    buttonText: "Find Your Home",
  },
  {
    id: 4,
    title: "Invest in a Place You Love",
    subtitle: "SMART PROPERTY INVESTMENT",
    description:
      "Discover quality real estate opportunities and find a property that fits your goals.",
    image: "/tope-image-4.jpg",
    location: "Dhaka, Bangladesh",
    buttonText: "View Properties",
  },
];

// ----------------------------------
// Component
// ----------------------------------

export default function HomeHero() {
  const { data, isLoading } = useGetHomeBanner();

  const homeData: HomeBanner[] =
    data?.data?.length > 0
      ? data.data
      : defaultSlides;

  const autoplay = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // Loading state
  if (isLoading) {
    return (
      <section className="container mx-auto px-3 py-5 sm:px-5 lg:px-8">
        <div className="grid min-h-[420px] animate-pulse overflow-hidden rounded-3xl bg-muted lg:grid-cols-2">
          <div className="space-y-5 p-8 sm:p-12">
            <div className="h-5 w-40 rounded bg-muted-foreground/10" />
            <div className="h-12 w-full rounded bg-muted-foreground/10" />
            <div className="h-5 w-3/4 rounded bg-muted-foreground/10" />
            <div className="h-12 w-40 rounded bg-muted-foreground/10" />
          </div>
          <div className="min-h-[250px] bg-muted-foreground/10" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full overflow-hidden py-4 sm:py-6 lg:py-8">
      <div className="container mx-auto px-3 sm:px-5 lg:px-8 xl:px-10">

        <Carousel
          opts={{
            align: "start",
            loop: homeData.length > 1,
          }}
          plugins={homeData.length > 1 ? [autoplay.current] : []}
          className="group relative w-full"
        >
          <CarouselContent className="-ml-0">

            {homeData.map((slide, index) => (
              <CarouselItem
                key={slide.id}
                className="pl-0"
              >
                <div className="relative grid min-h-[570px] grid-cols-1 overflow-hidden rounded-2xl border bg-background shadow-xl shadow-black/5 sm:min-h-[620px] sm:rounded-3xl md:min-h-[600px] lg:min-h-[570px] lg:grid-cols-2 xl:min-h-[650px]">

                  {/* LEFT CONTENT */}

                  <div className="relative z-10 order-2 flex flex-col justify-center px-5 py-10 sm:px-9 sm:py-12 md:px-12 lg:order-1 lg:px-10 xl:px-16 2xl:px-20">

                    {/* Background decoration */}

                    <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

                    {/* Badge */}

                    <div className="relative mb-5">
                      <Badge
                        variant="secondary"
                        className="gap-2 rounded-full px-4 py-2 text-[10px] font-bold tracking-[0.15em] text-primary sm:text-xs"
                      >
                        <Building2 className="h-4 w-4" />
                        {slide.subtitle || "FIND YOUR DREAM HOME"}
                      </Badge>
                    </div>

                    {/* Heading */}

                    <h1 className="relative max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                      {slide.title}
                    </h1>

                    {/* Description */}

                    <p className="relative mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:text-lg">
                      {slide.description}
                    </p>

                    {/* Location */}

                    <div className="relative mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>
                        {slide.location || "Find properties across Bangladesh"}
                      </span>
                    </div>

                    {/* Buttons */}

                    <div className="relative mt-8 flex flex-wrap items-center gap-3">

                      <Button
                        
                        size="lg"
                        className="h-12 rounded-xl px-6 font-semibold shadow-lg shadow-primary/20"
                      >
                        <Link href="/property">
                          {slide.buttonText || "Explore Properties"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        
                        variant="outline"
                        size="lg"
                        className="h-12 rounded-xl px-6"
                      >
                        <Link href="/property">
                          <Search className="mr-2 h-4 w-4" />
                          Search Homes
                        </Link>
                      </Button>

                    </div>

                    {/* Trust information */}

                    <div className="relative mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t pt-6">

                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                          Trusted Properties
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                          Verified Listings
                        </span>
                      </div>

                    </div>

                  </div>

                  {/* RIGHT IMAGE */}

                  <div className="relative order-1 min-h-[260px] overflow-hidden bg-muted sm:min-h-[320px] md:min-h-[360px] lg:order-2 lg:min-h-full">

                    <Image
                      src={slide.image}
                      alt={slide.title || "Featured property"}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Image overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-background/10" />

                    {/* Property label */}

                    <div className="absolute left-4 top-4 sm:left-7 sm:top-7">
                      <Badge className="rounded-full border border-white/30 bg-white/95 px-4 py-2 text-xs font-semibold text-gray-900 shadow-lg hover:bg-white">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                        Featured Property
                      </Badge>
                    </div>

                    {/* Floating property card */}

                    <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-white/95 p-4 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-auto sm:w-[300px] sm:p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Discover your next home
                          </p>

                          <h3 className="mt-1 text-base font-bold text-gray-900">
                            Beautiful Living Spaces
                          </h3>
                        </div>

                        <div className="rounded-xl bg-primary/10 p-2">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>

                      </div>

                      <div className="mt-4 flex items-center justify-between border-t pt-3">

                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <BedDouble className="h-4 w-4 text-primary" />
                          Modern Homes
                        </div>

                        <Link
                          href="/properties"
                          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          Explore
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>

                      </div>

                    </div>

                  </div>

                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* Desktop navigation */}

          {homeData.length > 1 && (
            <>
              <CarouselPrevious className="left-3 top-1/2 z-20 hidden h-11 w-11 border-0 bg-background/90 shadow-lg transition hover:bg-primary hover:text-white sm:flex lg:left-5" />

              <CarouselNext className="right-3 top-1/2 z-20 hidden h-11 w-11 border-0 bg-background/90 shadow-lg transition hover:bg-primary hover:text-white sm:flex lg:right-5" />
            </>
          )}

        </Carousel>

      </div>
    </section>
  );
}
