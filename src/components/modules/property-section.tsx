
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  BedDouble,
  Bath,
  Heart,
  ArrowUpDown,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Home,
  Sofa,
  X,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IPropertyDemo } from "@/types";
import { number } from "zod";
import { useGetProperty } from "@/hooks";



// const properties: IPropertyDemo[] = [
//   {
//     id: "1",
//     title: "Luxury Modern Family Apartment",
//     description: "Beautiful apartment with modern facilities.",
//     propertyType: "APARTMENT",
//     category: "RENT",
//     address: "Road 12, Dhanmondi",
//     city: "Dhaka",
//     area: "Dhanmondi",
//     rent: 35000,
//     bedrooms: 3,
//     bathrooms: 2,
//     availableRooms: 3,
//     furnished: "FURNISHED",
//     imageUrl: "/properties/property-1.jpg",
//     status: "AVAILABLE",
//   },
//   {
//     id: "2",
//     title: "Premium Family Residence",
//     description: "Spacious residence in a peaceful location.",
//     propertyType: "HOUSE",
//     category: "RENT",
//     address: "Gulshan Avenue",
//     city: "Dhaka",
//     area: "Gulshan",
//     rent: 55000,
//     bedrooms: 4,
//     bathrooms: 3,
//     availableRooms: 4,
//     furnished: "SEMI_FURNISHED",
//     imageUrl: "/properties/property-2.jpg",
//     status: "AVAILABLE",
//   },
//   {
//     id: "3",
//     title: "Contemporary City Apartment",
//     description: "Elegant apartment with a city view.",
//     propertyType: "APARTMENT",
//     category: "RENT",
//     address: "Uttara Sector 10",
//     city: "Dhaka",
//     area: "Uttara",
//     rent: 22000,
//     bedrooms: 2,
//     bathrooms: 2,
//     furnished: "UNFURNISHED",
//     imageUrl: "/properties/property-3.jpg",
//     status: "AVAILABLE",
//   },
//   {
//     id: "4",
//     title: "Elegant Modern Duplex",
//     description: "A beautiful duplex for family living.",
//     propertyType: "DUPLEX",
//     category: "RENT",
//     address: "Bashundhara R/A",
//     city: "Dhaka",
//     area: "Bashundhara",
//     rent: 65000,
//     bedrooms: 4,
//     bathrooms: 4,
//     furnished: "FURNISHED",
//     imageUrl: "/properties/property-4.jpg",
//     status: "AVAILABLE",
//   },
// ];

const propertyTypes = [
  "APARTMENT",
  "HOUSE",
  "DUPLEX",
  "VILLA",
  "ROOM",
];

const formatPrice = (price: number) =>
  `৳${price.toLocaleString("en-BD")}`;

export default function PropertiesPage() {
  const {data,isLoading}= useGetProperty()
  const properties = data?.data || []
  console.log(data)
  const [search, setSearch] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([10000, 100000]);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [bedrooms, setBedrooms] = React.useState("any");
  const [bathrooms, setBathrooms] = React.useState("any");
  const [furnished, setFurnished] = React.useState("any");
  const [sort, setSort] = React.useState("newest");
  const [page, setPage] = React.useState(1);
  const [mobileFilters, setMobileFilters] = React.useState(false);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const pageSize = 6;

  const filteredProperties = React.useMemo(() => {
    let result = properties.filter((property:any) => {
      const searchMatch = [
        property.title,
        property.city,
        property.area,
        property.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        searchMatch &&
        property.rent >= priceRange[0] &&
        property.rent <= priceRange[1] &&
        (selectedTypes.length === 0 ||
          selectedTypes.includes(property.propertyType)) &&
        (bedrooms === "any" ||
          property.bedrooms >= Number(bedrooms)) &&
        (bathrooms === "any" ||
          property.bathrooms >= Number(bathrooms)) &&
        (furnished === "any" ||
          property.furnished === furnished)
      );
    });

    if (sort === "low") result.sort((a:any, b:any) => a.rent - b.rent);
    if (sort === "high") result.sort((a:any, b:any) => b.rent - a.rent);
    // if (sort === "newest")
    //   result.sort(
    //     (a, b) =>
    //       (b.createdA?.getTime() ?? 0) -
    //       (a.createdAt?.getTime() ?? 0)
    //   );

    return result;
  }, [
    search,
    priceRange,
    selectedTypes,
    bedrooms,
    bathrooms,
    furnished,
    sort,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / pageSize)
  );

  const currentProperties = filteredProperties.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, priceRange, selectedTypes, bedrooms, bathrooms, furnished, sort]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setPriceRange([10000, 100000]);
    setSelectedTypes([]);
    setBedrooms("any");
    setBathrooms("any");
    setFurnished("any");
    setSort("newest");
    setPage(1);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-primary"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-4">
        <h4 className="font-semibold">Monthly Rent</h4>

       <Slider
  min={0}
  max={200000}
  step={1000}
  value={priceRange}
  onValueChange={(value) => {
    if (Array.isArray(value)) {
      setPriceRange([...value]);
    }
  }}
/>

        <div className="flex justify-between gap-2">
          <div className="rounded-lg border p-2">
            <p className="text-xs text-muted-foreground">Minimum</p>
            <p className="font-semibold">
              {formatPrice(priceRange[0])}
            </p>
          </div>
          <div className="rounded-lg border p-2">
            <p className="text-xs text-muted-foreground">Maximum</p>
            <p className="font-semibold">
              {formatPrice(priceRange[1])}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Property Type */}
      <div className="space-y-3">
        <h4 className="font-semibold">Property Type</h4>
        {propertyTypes.map((type) => (
          <div key={type} className="flex items-center gap-3">
            <Checkbox
              id={type}
              checked={selectedTypes.includes(type)}
              onCheckedChange={() => toggleType(type)}
            />
            <label
              htmlFor={type}
              className="cursor-pointer text-sm text-muted-foreground"
            >
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </label>
          </div>
        ))}
      </div>

      <Separator />

      {/* Bedrooms */}
      <div className="space-y-3">
        <h4 className="font-semibold">Bedrooms</h4>
        <Select value={bedrooms} onValueChange={(value)=>setBedrooms(value ?? "Any bedrooms")}>
          <SelectTrigger>
            <SelectValue placeholder="Any bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any bedrooms</SelectItem>
            {[1, 2, 3, 4, 5].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}+ Bedrooms
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Bathrooms */}
      <div className="space-y-3">
        <h4 className="font-semibold">Bathrooms</h4>
        <Select value={bathrooms} onValueChange={(value)=>setBathrooms(value ?? "Any bathrooms")}>
          <SelectTrigger>
            <SelectValue placeholder="Any bathrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any bathrooms</SelectItem>
            {[1, 2, 3, 4].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}+ Bathrooms
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Furnishing */}
      <div className="space-y-3">
        <h4 className="font-semibold">Furnishing</h4>
        <Select value={furnished} onValueChange={(value)=>setFurnished(value ?? "Any furnishing")}>
          <SelectTrigger>
            <SelectValue placeholder="Any furnishing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="FURNISHED">Furnished</SelectItem>
            <SelectItem value="SEMI_FURNISHED">
              Semi Furnished
            </SelectItem>
            <SelectItem value="UNFURNISHED">Unfurnished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={() => setMobileFilters(false)} className="w-full">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50/70">
      {/* Page Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Badge className="mb-3">Find Your Perfect Home</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Discover Your Dream Property
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Explore premium rental properties and find a place
            that perfectly matches your lifestyle.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by property, city or location..."
                className="h-12 bg-white pl-11"
              />
            </div>
            <Button className="h-12 px-8">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">

          {/* Desktop Sidebar */}
          <aside className="hidden rounded-xl border bg-white p-5 lg:sticky lg:top-24 lg:block">
            <FilterContent />
          </aside>

          <div className="min-w-0">
            {/* Listing Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Available Properties</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Showing {filteredProperties.length} properties
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter */}
                <Sheet
                  open={mobileFilters}
                  onOpenChange={setMobileFilters}
                >
                  <SheetTrigger >
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[320px] overflow-y-auto">
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sort} onValueChange={(value)=>setSort(value ?? "newest")}>
                  <SelectTrigger className="w-[165px] bg-white">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="low">Price: Low to High</SelectItem>
                    <SelectItem value="high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Property Grid */}
            {currentProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {currentProperties.map((property:any) => (
                  <Card
                    key={property.id}
                    className="group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {property.imageUrl && (
                        <Image
                          src={property.imageUrl}
                          alt={property.title}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}

                      <Badge className="absolute left-3 top-3">
                        {property.propertyType}
                      </Badge>

                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => toggleFavorite(property.id!)}
                        className="absolute right-3 top-3 rounded-full bg-white/90 hover:bg-white"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(property.id!)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-3">
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(property.rent)}
                          <span className="text-xs font-normal text-muted-foreground">
                            {" "}/ month
                          </span>
                        </p>

                        <h3 className="mt-2 line-clamp-1 text-base font-bold">
                          {property.title}
                        </h3>

                        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {property.area || property.city}, {property.city}
                        </p>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <BedDouble className="h-4 w-4" />
                          {property.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bath className="h-4 w-4" />
                          {property.bathrooms} Baths
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Sofa className="h-4 w-4" />
                          {property.furnished === "FURNISHED"
                            ? "Furnished"
                            : property.furnished === "SEMI_FURNISHED"
                              ? "Semi"
                              : "Unfurnished"}
                        </span>
                      </div>

                      <Button variant="outline" className="w-full" >
                        <a href={`/properties/${property.id}`}>
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border bg-white py-20 text-center">
                <Home className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-bold">
                  No properties found
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try changing your search or filters.
                </p>
                <Button onClick={resetFilters} className="mt-5">
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  {(page - 1) * pageSize + 1} to{" "}
                  {Math.min(page * pageSize, filteredProperties.length)} of{" "}
                  {filteredProperties.length} properties
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from(
                    { length: totalPages },
                    (_, i) => i + 1
                  ).map((n) => (
                    <Button
                      key={n}
                      size="icon"
                      variant={page === n ? "default" : "outline"}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
