
"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  MapPin,
  BedDouble,
  Wallet,
  Home,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DreamHomeSection() {
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const request = {
      name: formData.get("name"),
      email: formData.get("email"),
      location: formData.get("location"),
      propertyType,
      budget,
      bedrooms,
      message: formData.get("message"),
    };

    console.log("Property Request:", request);

    // Connect your backend API here.
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
      {/* Background effects */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
              <Sparkles size={16} />
              Personalized Property Service
            </div>

            <div className="space-y-5">
              <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Your Dream Home
                <span className="block text-blue-400">
                  Starts Here.
                </span>
              </h2>

              <p className="max-w-lg text-base leading-8 text-slate-400 md:text-lg">
                Tell us what you are looking for. Our property
                experts will help you discover a home that
                perfectly matches your lifestyle and budget.
              </p>
            </div>

            <div className="space-y-5">
              {[
                "Personalized property recommendations",
                "Verified properties and trusted listings",
                "Expert guidance throughout your journey",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-8 border-t border-white/10 pt-7">
              <div>
                <h3 className="text-3xl font-bold text-white">24/7</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Customer Support
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">100%</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Dedicated Service
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">1:1</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Expert Assistance
                </p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl md:p-9">
            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <Building2 size={25} />
              </div>

              <h3 className="text-2xl font-bold text-white">
                Request Your Property
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Complete the form and let us find your perfect home.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="name"
                  placeholder="Full Name"
                  required
                  className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                />

                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="h-12 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-blue-400" />
                <Input
                  name="location"
                  placeholder="Preferred Location"
                  required
                  className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500"
                />
              </div>

              <Select
                value={propertyType}
                onValueChange={(value)=>setPropertyType(value ?? "Select Property Type")}
                required
              >
                <SelectTrigger className="h-12 border-white/10 bg-white/5 text-white">
                  <Home className="mr-2 h-4 w-4 text-blue-400" />
                  <SelectValue placeholder="Select Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid gap-4 sm:grid-cols-2">
                <Select value={budget} onValueChange={(value)=>setBudget(value ?? "Your Budget")}>
                  <SelectTrigger className="h-12 border-white/10 bg-white/5 text-white">
                    <Wallet className="mr-2 h-4 w-4 text-blue-400" />
                    <SelectValue placeholder="Your Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under 50 Lac">Under 50 Lac</SelectItem>
                    <SelectItem value="50 Lac - 1 Crore">50 Lac - 1 Crore</SelectItem>
                    <SelectItem value="1 - 2 Crore">1 - 2 Crore</SelectItem>
                    <SelectItem value="2 - 5 Crore">2 - 5 Crore</SelectItem>
                    <SelectItem value="5 Crore+">5 Crore+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={bedrooms} onValueChange={(value)=>setBedrooms(value ?? "Bedrooms")}>
                  <SelectTrigger className="h-12 border-white/10 bg-white/5 text-white">
                    <BedDouble className="mr-2 h-4 w-4 text-blue-400" />
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4 Bedrooms</SelectItem>
                    <SelectItem value="5+">5+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                name="message"
                placeholder="Tell us more about your dream property..."
                className="min-h-28 resize-none border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              />

              <Button
                type="submit"
                className="h-12 w-full bg-blue-600 text-base font-semibold text-white hover:bg-blue-500"
              >
                Submit Property Request
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-xs text-slate-500">
                Your information is safe and will only be used
                to assist with your property search.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
