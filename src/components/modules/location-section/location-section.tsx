
"use client";

import { useState } from "react";
import {
  MapPin,
  Search,
  Sparkles,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Bus,
  Trees,
  ArrowUpRight,
  Navigation,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const locations = [
  {
    name: "Dhanmondi",
    city: "Dhaka",
    description:
      "A well-established residential neighborhood with educational institutions, healthcare facilities, restaurants, and shopping opportunities.",
    type: "Family Friendly",
    properties: 48,
    highlights: [
      "Educational institutions",
      "Healthcare facilities",
      "Shopping and dining",
    ],
  },
  {
    name: "Uttara",
    city: "Dhaka",
    description:
      "A planned urban neighborhood offering residential communities, shopping facilities, and access to major transport connections.",
    type: "Modern Lifestyle",
    properties: 65,
    highlights: [
      "Shopping centers",
      "Transport connections",
      "Residential communities",
    ],
  },
  {
    name: "Zindabazar",
    city: "Sylhet",
    description:
      "A busy commercial and residential area with access to shopping, dining, and essential city services.",
    type: "Urban Living",
    properties: 32,
    highlights: [
      "Local markets",
      "Restaurants",
      "City amenities",
    ],
  },
];

const amenities = [
  { name: "Schools", icon: GraduationCap },
  { name: "Hospitals", icon: Hospital },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Transport", icon: Bus },
  { name: "Parks", icon: Trees },
];

export default function LocationInsights() {
  const [search, setSearch] = useState("");
  const [activeLocation, setActiveLocation] = useState("Dhanmondi");
  const [activeAmenity, setActiveAmenity] = useState("Schools");

  const selectedLocation = locations.find(
    (location) => location.name === activeLocation
  )!;

  const filteredLocations = locations.filter((location) =>
    `${location.name} ${location.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="bg-[#f7f9f6] py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <Badge className="mb-5 gap-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            <Sparkles className="h-3.5 w-3.5" />
            LOCATION INTELLIGENCE
          </Badge>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
            Find your place in the
            <span className="text-emerald-600">
              {" "}right neighborhood.
            </span>
          </h2>

          <p className="mt-5 leading-7 text-gray-500 md:text-lg">
            Explore neighborhoods, discover nearby essentials,
            and find a location that fits your lifestyle.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.5fr]">

          {/* Location Sidebar */}
          <Card className="rounded-3xl border-gray-100 p-5 shadow-sm md:p-7">

            <h3 className="text-xl font-bold text-gray-900">
              Explore locations
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Discover popular neighborhoods.
            </p>

            {/* Search */}
            <div className="relative mt-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city or area..."
                className="h-11 rounded-xl pl-10"
              />
            </div>

            {/* Location List */}
            <div className="mt-5 space-y-3">
              {filteredLocations.map((location) => (
                <button
                  key={location.name}
                  onClick={() => setActiveLocation(location.name)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all ${
                    activeLocation === location.name
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-100 bg-white hover:border-emerald-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {location.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {location.city}, Bangladesh
                      </p>
                    </div>

                    <MapPin
                      className={`h-5 w-5 ${
                        activeLocation === location.name
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {location.type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {location.properties} properties
                    </span>
                  </div>
                </button>
              ))}

              {filteredLocations.length === 0 && (
                <p className="py-8 text-center text-sm text-gray-500">
                  No matching locations found.
                </p>
              )}
            </div>
          </Card>

          {/* Location Details */}
          <div className="space-y-5">

            {/* Map Placeholder */}
            <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-[#e8eee7] md:min-h-[430px]">

              <div className="absolute inset-0 opacity-40">
                <svg
                  viewBox="0 0 700 450"
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <path
                    d="M-20 90 L720 350 M-20 350 L720 80 M150 -20 L500 470 M520 -20 L180 470"
                    stroke="#a4bca6"
                    strokeWidth="24"
                    fill="none"
                  />
                  <path
                    d="M-20 200 L720 200 M300 -20 L300 470"
                    stroke="white"
                    strokeWidth="13"
                    fill="none"
                  />
                  <path
                    d="M-20 410 L720 40"
                    stroke="#ffffff"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Map Center */}
              <div className="relative z-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-emerald-700 text-white shadow-xl">
                  <MapPin className="h-8 w-8" />
                </div>

                <div className="rounded-2xl bg-white px-5 py-3 shadow-lg">
                  <p className="font-bold text-gray-900">
                    {selectedLocation.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedLocation.city}, Bangladesh
                  </p>
                </div>
              </div>

              <div className="absolute left-5 top-5 rounded-xl bg-white/90 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                <Navigation className="mr-2 inline h-4 w-4 text-emerald-600" />
                Neighborhood view
              </div>

              <div className="absolute bottom-5 right-5">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-xl"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        selectedLocation.name + " " + selectedLocation.city
                      )}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Open Google Maps
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* AI Insights */}
            <Card className="rounded-3xl border-gray-100 p-6 shadow-sm md:p-8">

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-100 p-3">
                  <Sparkles className="h-5 w-5 text-emerald-700" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    AI Neighborhood Insights
                  </h3>
                  <p className="text-xs text-gray-500">
                    Location overview
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                {selectedLocation.description}
              </p>

              <div className="mt-6">
                <p className="mb-3 text-xs font-bold tracking-wider text-gray-400">
                  NEIGHBORHOOD HIGHLIGHTS
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedLocation.highlights.map((highlight) => (
                    <Badge
                      key={highlight}
                      variant="secondary"
                      className="rounded-full px-3 py-2"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-7 border-t pt-6">
                <p className="mb-4 text-xs font-bold tracking-wider text-gray-400">
                  EXPLORE NEARBY AMENITIES
                </p>

                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity) => {
                    const Icon = amenity.icon;

                    return (
                      <button
                        key={amenity.name}
                        onClick={() =>
                          setActiveAmenity(amenity.name)
                        }
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition ${
                          activeAmenity === amenity.name
                            ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                            : "border-gray-200 text-gray-600 hover:border-emerald-300"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {amenity.name}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-xs text-gray-400">
                  Selected category: {activeAmenity}. Connect a places
                  data provider to display verified nearby facilities.
                </p>
              </div>

            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-emerald-800 p-7 text-white md:flex-row md:px-10">
          <div>
            <h3 className="text-xl font-bold">
              Ready to discover your next neighborhood?
            </h3>
            <p className="mt-2 text-sm text-emerald-100">
              Explore available properties in your favorite locations.
            </p>
          </div>

          <Button
            className="rounded-xl bg-white text-emerald-800 hover:bg-emerald-50"
            onClick={() => {
              window.location.href = "/properties";
            }}
          >
            Explore Properties
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

      </div>
    </section>
  );
}
