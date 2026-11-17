
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";


const agents = [
  {
    id: 1,
    name: "James Wilson",
    role: "Senior Property Agent",
    location: "Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&crop=faces",
    rating: "4.9",
    properties: 120,
    experience: "8+ Years",
    phone: "+880 1712-345678",
    email: "james@homenesty.com",
    specialty: "Luxury Apartments",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Property Consultant",
    location: "Chattogram, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=faces",
    rating: "4.8",
    properties: 95,
    experience: "6+ Years",
    phone: "+880 1812-345678",
    email: "sarah@homenesty.com",
    specialty: "Family Homes",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Rental Specialist",
    location: "Sylhet, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop&crop=faces",
    rating: "5.0",
    properties: 85,
    experience: "5+ Years",
    phone: "+880 1912-345678",
    email: "michael@homenesty.com",
    specialty: "Rental Properties",
  },
];


export default function AgentSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          <Badge
            variant="secondary"
            className="mb-4 rounded-full px-4 py-1.5"
          >
            <Users className="mr-2 size-4" />
            OUR PROFESSIONAL TEAM
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Meet Our Trusted{" "}
            <span className="text-primary">
              Real Estate Agents
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
            Our experienced property experts are dedicated to
            helping you find your perfect home. Get professional
            guidance and personalized support at every step.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl"
            >
              {/* Agent Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">

                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <Badge className="absolute left-4 top-4 gap-1">
                  <BadgeCheck className="size-3.5" />
                  Verified Agent
                </Badge>

                <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-background/95 px-3 py-1.5 text-sm font-semibold shadow">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  {agent.rating}
                </div>
              </div>

              <CardContent className="space-y-5 p-5">

                {/* Name and Role */}
                <div>
                  <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                    {agent.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {agent.role}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    {agent.location}
                  </div>
                </div>

                {/* Agent Statistics */}
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-3">

                  <div>
                    <p className="text-lg font-bold">
                      {agent.properties}+
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Properties
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-bold">
                      {agent.experience}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Experience
                    </p>
                  </div>

                </div>

                {/* Specialty */}
                <div className="flex items-center gap-2 text-sm">
                  <BriefcaseBusiness className="size-4 text-primary" />
                  <span className="text-muted-foreground">
                    Speciality:
                  </span>
                  <span className="font-medium">
                    {agent.specialty}
                  </span>
                </div>

                {/* Contact Buttons */}
                <div className="grid grid-cols-2 gap-3 border-t pt-4">

                  <Button  className="w-full py-6">
                    <a href={`tel:${agent.phone}`}>
                      <Phone className="mr-2 size-4" />
                      Call Agent
                    </a>
                  </Button>

                  <Button
                    
                    variant="outline"
                    className="w-full py-6"
                  >
                    <a href={`mailto:${agent.email}`}>
                      <Mail className="mr-2 size-4" />
                      Email
                    </a>
                  </Button>

                </div>

                {/* Profile Link */}
                <Button
                  
                  variant="ghost"
                  className="w-full text-primary"
                >
                  <Link href={`/agents/${agent.id}`}>
                    View Full Profile
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

              </CardContent>
            </Card>
          ))}

        </div>

        {/* View All Agents */}
        <div className="mt-12 text-center">
          <Button  size="lg" className="rounded-full py-6 px-8">
            <Link href="/agents">
              Explore All Agents
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Become An Agent CTA */}
        <div className="relative mt-20 overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground md:px-14 md:py-16">

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

            <div className="max-w-xl">
              <Badge
                variant="secondary"
                className="mb-4"
              >
                JOIN OUR TEAM
              </Badge>

              <h3 className="text-2xl font-bold md:text-4xl">
                Are You a Real Estate Professional?
              </h3>

              <p className="mt-4 text-sm leading-7 text-primary-foreground/80 md:text-base">
                Grow your business with Home Nesty. Join our
                trusted agent network and connect with people
                searching for their dream homes.
              </p>
            </div>

            <Button
              
              size="lg"
              variant="secondary"
              className="shrink-0 rounded-full px-8 py-6"
            >
              <Link href="/become-agent">
                Become an Agent
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

          </div>

          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full border border-primary-foreground/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full border border-primary-foreground/10" />

        </div>

      </div>
    </section>
  );
}
