
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  MapPin,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    location: "Dhanmondi, Dhaka",
    property: "Family Apartment",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
    rating: 5,
    date: "October 2026",
    review:
      "Finding a perfect family apartment used to be stressful. Home Nesty made everything simple. I found a beautiful apartment in my preferred location without wasting time.",
  },
  {
    id: 2,
    name: "Rakib Hasan",
    location: "Uttara, Dhaka",
    property: "Modern Studio",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    rating: 5,
    date: "September 2026",
    review:
      "I was looking for an affordable place near my workplace. Home Nesty helped me compare properties and connect with the right owner. The experience was excellent!",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    location: "Zindabazar, Sylhet",
    property: "Luxury Apartment",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces",
    rating: 5,
    date: "August 2026",
    review:
      "The property search experience was smooth and convenient. I could explore different apartments, check details, and find a home that perfectly matched my needs.",
  },
];


export default function ClientStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = testimonials[activeIndex];

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#f8f9f7] py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold tracking-[0.2em] text-emerald-700">
            CLIENT STORIES
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            People who found their
            <span className="text-emerald-600"> place with us.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-500 md:text-lg">
            Every home has a story. Discover how we help people
            find spaces where life feels a little more special.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 md:grid-cols-2">

          {/* Left Side */}
          <div className="relative flex min-h-[380px] flex-col justify-between bg-emerald-700 p-8 text-white md:p-12">
            <Quote
              className="absolute right-8 top-8 h-20 w-20 text-white/10"
              strokeWidth={1}
            />

            <div>
              <div className="mb-8 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="relative z-10 text-xl font-medium leading-9 md:text-2xl">
                "{active.review}"
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{active.name}</p>
                <p className="mt-1 text-sm text-emerald-100">
                  {active.date}
                </p>
              </div>

              <BadgeCheck className="h-8 w-8 text-emerald-200" />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col justify-center p-8 md:p-12">

            <div className="relative mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-emerald-50">
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>

            <div className="text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <BadgeCheck className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  Verified Client
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                {active.name}
              </h3>

              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 text-emerald-600" />
                {active.location}
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                <Home className="h-4 w-4 text-emerald-600" />
                {active.property}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between border-t pt-6">
              <div className="flex gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={activeIndex === index}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === index
                        ? "w-8 bg-emerald-600"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={previous}
                  aria-label="Previous testimonial"
                  className="rounded-full"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Trust Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Your next chapter starts with finding the right place.
          </p>
        </div>

      </div>
    </section>
  );
}
