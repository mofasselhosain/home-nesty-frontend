
"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  KeyRound,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

type InterestType = "BUY" | "RENT" | "SELL";

const interestOptions = [
  {
    id: "BUY" as const,
    title: "Buy a Property",
    description: "Find your dream home.",
    icon: Home,
  },
  {
    id: "RENT" as const,
    title: "Rent a Property",
    description: "Discover your next home.",
    icon: KeyRound,
  },
  {
    id: "SELL" as const,
    title: "Sell a Property",
    description: "Connect with potential buyers.",
    icon: Building2,
  },
];

export default function CustomerInterestSection() {
  const [interest, setInterest] = useState<InterestType>("BUY");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Connect your backend API here.
      // Example:
      // await api.post("/customer/interests", {
      //   ...formData,
      //   interest,
      // });

      console.log({ ...formData, interest });

      toast.success("Your interest has been submitted!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        propertyType: "",
        budget: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <Badge className="mb-4 border border-blue-100 bg-blue-50 px-4 py-1.5 text-blue-700 hover:bg-blue-50">
            <MessageSquare className="mr-2 h-3.5 w-3.5" />
            CUSTOMER INTEREST
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Let's Find Your
            <span className="text-blue-600"> Perfect Property</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            Whether you want to buy, rent, or sell a property,
            we're here to make your real estate journey simple
            and stress-free.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">

          {/* Left information panel */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
              <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-3">
                <Building2 className="h-7 w-7 text-blue-400" />
              </div>

              <h3 className="text-2xl font-bold sm:text-3xl">
                Your Property Journey Starts Here.
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Share your requirements with us. Our property
                experts will help you find the right opportunity.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Personalized Recommendations",
                    text: "Properties that match your needs.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Trusted Assistance",
                    text: "Reliable support at every step.",
                  },
                  {
                    icon: Phone,
                    title: "Quick Communication",
                    text: "Our team will contact you.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Need direct assistance?
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Talk to our property support team.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">
                    Call our team
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    +880 1XXXXXXXXX
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            <CardContent className="p-5 sm:p-8 lg:p-10">

              <div className="mb-7">
                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Tell Us What You Need
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Complete the form and we'll get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Interest selection */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-slate-800">
                    I'm interested in
                  </label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {interestOptions.map((option) => {
                      const Icon = option.icon;
                      const active = interest === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setInterest(option.id)}
                          aria-pressed={active}
                          className={`rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                            active
                              ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                              : "border-slate-200 bg-white hover:border-blue-300"
                          }`}
                        >
                          <Icon className={`mb-3 h-5 w-5 ${
                            active ? "text-blue-600" : "text-slate-400"
                          }`} />
                          <p className="text-xs font-bold text-slate-900 sm:text-sm">
                            {option.title}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500">
                            {option.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personal information */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Personal Information
                  </h4>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-xs font-medium text-slate-600">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-11 rounded-xl"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-600">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-11 rounded-xl"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="mb-2 block text-xs font-medium text-slate-600">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+880 1XXXXXXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-11 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Property requirements */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Property Requirements
                  </h4>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="location" className="mb-2 block text-xs font-medium text-slate-600">
                        Preferred Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="City or area"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="h-11 rounded-xl pl-9"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="propertyType" className="mb-2 block text-xs font-medium text-slate-600">
                        Property Type
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={(e) => setFormData({
                          ...formData,
                          propertyType: e.target.value,
                        })}
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select property</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="budget" className="mb-2 block text-xs font-medium text-slate-600">
                        {interest === "RENT" ? "Monthly Budget" : "Estimated Budget"}
                      </label>
                      <Input
                        id="budget"
                        name="budget"
                        placeholder="e.g. ৳20,00,000"
                        value={formData.budget}
                        onChange={handleChange}
                        className="h-11 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium text-slate-600">
                    Additional Requirements
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your property requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-28 resize-none rounded-xl"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                >
                  {loading ? "Submitting..." : "Submit Your Interest"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>

                <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  Your information is safe and confidential.
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
