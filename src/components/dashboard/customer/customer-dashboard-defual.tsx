
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  House,
  Heart,
  CalendarCheck,
  MessageCircle,
  Bell,
  MapPin,
  BedDouble,
  Bath,
  ArrowUpRight,
  Menu,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { label: "Overview", href: "/customer" },
  { label: "Saved Properties", href: "/customer/saved-properties" },
  { label: "My Bookings", href: "/customer/bookings" },
  { label: "Requests", href: "/customer/property-requests" },
  { label: "Messages", href: "/customer/messages" },
];

const stats = [
  { title: "Saved Properties", value: "12", icon: Heart },
  { title: "Active Bookings", value: "04", icon: CalendarCheck },
  { title: "Property Requests", value: "03", icon: House },
  { title: "Unread Messages", value: "08", icon: MessageCircle },
];

const properties = [
  {
    id: 1,
    title: "Luxury Modern Apartment",
    location: "Gulshan, Dhaka",
    price: "৳85,00,000",
    image: "/properties/property-1.jpg",
    beds: 3,
    baths: 2,
  },
  {
    id: 2,
    title: "Premium Family House",
    location: "Uttara, Dhaka",
    price: "৳1,20,00,000",
    image: "/properties/property-2.jpg",
    beds: 4,
    baths: 3,
  },
];

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top Navigation */}
   

      {/* Main Dashboard */}
      <main className="mx-auto max-w-[1500px] space-y-9 px-4 py-8 md:px-8">

        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-600 p-7 text-white md:p-10">
          <div className="relative z-10 max-w-2xl">
            <Badge className="border-white/20 bg-white/15 text-white">
              Customer Dashboard
            </Badge>

            <h1 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
              Welcome Back!
              <br />
              Find Your Dream Home.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-emerald-50 md:text-base">
              Manage your properties, track your bookings,
              and discover your perfect home with HOME NESTY.
            </p>

            <Button  className="mt-6 bg-white text-emerald-800 hover:bg-emerald-50">
              <Link href="/property">
                Explore Properties
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <House className="absolute -bottom-16 -right-8 h-72 w-72 text-white/10" />
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-800">
              Dashboard Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track your housing activities.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <Card key={stat.title} className="border-none shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <p className="text-sm text-slate-500">
                        {stat.title}
                      </p>
                      <h3 className="mt-3 text-3xl font-bold text-slate-800">
                        {stat.value}
                      </h3>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-600">
                      <Icon size={25} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Saved Properties */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Recently Saved Properties
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your favorite homes in one place.
              </p>
            </div>

            <Button variant="outline" >
              <Link href="/property">
                View All
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="group overflow-hidden border-none shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <Badge className="absolute left-4 top-4 bg-white text-emerald-700">
                    Saved Property
                  </Badge>

                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-4 top-4 rounded-full"
                    aria-label="Saved property"
                  >
                    <Heart className="fill-red-500 text-red-500" size={18} />
                  </Button>
                </div>

                <CardContent className="space-y-4 p-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {property.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={16} />
                      {property.location}
                    </p>
                  </div>

                  <div className="flex gap-5 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <BedDouble size={17} />
                      {property.beds} Beds
                    </span>
                    <span className="flex items-center gap-2">
                      <Bath size={17} />
                      {property.baths} Baths
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <p className="text-lg font-bold text-emerald-700">
                      {property.price}
                    </p>
                    <Button  size="sm">
                      <Link href="/property">
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
