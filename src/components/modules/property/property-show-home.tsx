// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import {
//   Bath,
//   BedDouble,
//   DoorOpen,
//   Home,
//   MapPin,
//   Phone,
//   Mail,
//   UserRound,
//   Wallet,
//   CalendarDays,
//   Pencil,
// } from "lucide-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { IProperty } from "@/types";
// import { CreateBookingDialog } from "@/components/form/booking/booking-form";

// // Import your edit dialog if you have one.
// // import PropertyEditDialog from "./PropertyEditDialog";

// interface PropertyDetailsTableProps {
//   property: IProperty;
// }

// export default function PropertyDetailsTable({
//   property,
// }: PropertyDetailsTableProps) {
//   const [detailsOpen, setDetailsOpen] = useState(false);

//   const formatPrice = (price: number | string | null | undefined) =>
//     Number(price || 0).toLocaleString("en-BD");

//   const address = [
//     property.address,
//     property.area,
//     property.city,
//   ]
//     .filter(Boolean)
//     .join(", ");

//   return (
    
//       <Dialog open={detailsOpen} onOpenChange={setDetailsOpen} >
//         <DialogTrigger  >
        
//        <div    
//             className="group relative block aspect-video w-full overflow-hidden bg-muted text-left"
//             aria-label={`View details for ${property.title}`}>
//              {property.imageUrl ? (
//               <Image
//                 src={property.imageUrl}
//                 alt={property.title || "Property"}
//                 fill
//                 unoptimized
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 className="object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//             ) : (
//               <div className="flex h-full items-center justify-center">
//                 <Home className="size-12 text-muted-foreground" />
//               </div>
//             )}
//        </div>

//             <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-3 py-1.5 text-xs font-medium text-white">
//               View Details
//             </span>
          
//         </DialogTrigger>

//         <DialogContent className="max-h-[90dvh] w-[calc(100%-1rem)] max-w-4xl overflow-y-auto p-4 sm:p-6">
//           <DialogHeader>
//             <DialogTitle className="pr-6 text-xl sm:text-2xl">
//               {property.title}
//             </DialogTitle>

//             <DialogDescription className="flex items-start gap-2">
//               <MapPin className="mt-0.5 size-4 shrink-0" />
//               <span>{address || "Address not provided"}</span>
//             </DialogDescription>
//           </DialogHeader>

//           {/* Property Image */}
//           {property.imageUrl && (
//             <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-lg bg-muted">
//               <Image
//                 src={property.imageUrl}
//                 alt={property.title || "Property"}
//                 fill
//                 unoptimized
//                 sizes="(max-width: 768px) 100vw, 800px"
//                 className="object-cover"
//               />
//             </div>
//           )}

//           {/* Rent */}
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Monthly Rent
//               </p>
//               <p className="text-2xl font-bold text-primary">
//                 ৳{formatPrice(property.rent)}
//                 <span className="text-sm font-normal text-muted-foreground">
//                   {" "}/ month
//                 </span>
//               </p>
//             </div>

//             <span className="rounded-full bg-muted px-3 py-1 text-sm">
//               {property.status || "N/A"}
//             </span>
//           </div>

//           <Separator />

//           {/* Description */}
//           <section className="space-y-2">
//             <h3 className="font-semibold">Description</h3>
//             <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
//               {property.description || "No description available."}
//             </p>
//           </section>

//           <Separator />

//           {/* Property Features */}
//           <section className="space-y-3">
//             <h3 className="font-semibold">Property Features</h3>

//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//               <Feature
//                 icon={<BedDouble className="size-5" />}
//                 label="Bedrooms"
//                 value={property.bedrooms ?? 0}
//               />

//               <Feature
//                 icon={<Bath className="size-5" />}
//                 label="Bathrooms"
//                 value={property.bathrooms ?? 0}
//               />

//               <Feature
//                 icon={<DoorOpen className="size-5" />}
//                 label="Available Rooms"
//                 value={property.availableRooms ?? 0}
//               />

//               <Feature
//                 icon={<Home className="size-5" />}
//                 label="Furnished"
//                 value={property.furnished || "N/A"}
//               />
//             </div>
//           </section>

//           <Separator />

//           {/* Additional Details */}
//           <section className="space-y-3">
//             <h3 className="font-semibold">Additional Details</h3>

//             <Detail
//               label="Property Type"
//               value={property.propertyType}
//             />

//             <Detail
//               label="Category"
//               value={property.category || "N/A"}
//             />

//             <Detail
//               label="Security Deposit"
//               value={`৳${formatPrice(property.securityDeposit)}`}
//             />

//             {/* <Detail
//               label="Available From"
//               value={
//                 property.availableFrom
//                   ? new Date(property.availableFrom).toLocaleDateString(
//                       "en-GB"
//                     )
//                   : "Not specified"
//               }
//             /> */}

//             <Detail
//               label="Created At"
//               value={
//                 property.createdAt
//                   ? new Date(property.createdAt).toLocaleDateString(
//                       "en-GB"
//                     )
//                   : "N/A"
//               }
//             />
//           </section>

//           <Separator />

//           {/* Contact Information */}
//           <section className="space-y-3">
//             <h3 className="font-semibold">Contact Information</h3>

//             <ContactDetail
//               icon={<UserRound className="size-4" />}
//               label="Contact Name"
//               value={property.contactName || "Not provided"}
//             />

//             <ContactDetail
//               icon={<Phone className="size-4" />}
//               label="Phone"
//               value={property.contactPhone || "Not provided"}
//             />

//             <ContactDetail
//               icon={<Mail className="size-4" />}
//               label="Email"
//               value={property.contactEmail || "Not provided"}
//             />
//           </section>

//           <Separator />

//           {/* Actions */}
//           <div className="flex flex-wrap justify-end gap-2">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setDetailsOpen(false)}
//             >
//               Close
//             </Button>

//             {/* Open the independent edit dialog here */}
//             {/*
//             <PropertyEditDialog
//               property={property}
//               onSuccess={() => setDetailsOpen(false)}
//             />
//             */}
//             <CreateBookingDialog   property={property} key={property.id}></CreateBookingDialog>

//             {/* <Button
//               type="button"
             
//             >
//               Book Property
//             </Button> */}
//           </div>
//         </DialogContent>

//       </Dialog>
//   );
// }

// /* Reusable feature component */
// function Feature({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string | number;
// }) {
//   return (
//     <div className="rounded-lg border p-3">
//       <div className="mb-2 text-primary">{icon}</div>
//       <p className="text-lg font-semibold">{value}</p>
//       <p className="text-xs text-muted-foreground">{label}</p>
//     </div>
//   );
// }

// /* Reusable detail component */
// function Detail({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | number;
// }) {
//   return (
//     <div className="flex flex-wrap justify-between gap-2 text-sm">
//       <span className="text-muted-foreground">{label}</span>
//       <span className="text-right font-medium">{value}</span>
//     </div>
//   );
// }

// /* Reusable contact component */
// function ContactDetail({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center gap-3 text-sm">
//       <span className="text-primary">{icon}</span>
//       <div className="min-w-0">
//         <p className="text-xs text-muted-foreground">{label}</p>
//         <p className="break-words font-medium">{value}</p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Bath,
  BedDouble,
  DoorOpen,
  Home,
  MapPin,
  Phone,
  Mail,
  UserRound,
  Wallet,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { IProperty } from "@/types";
import { CreateBookingDialog } from "@/components/form/booking/booking-form";

interface PropertyDetailsTableProps {
  property: IProperty;
}

export default function PropertyDetailsTable({
  property,
}: PropertyDetailsTableProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const formatPrice = (
    price: number | string | null | undefined
  ) => Number(price || 0).toLocaleString("en-BD");

  const address = [
    property.address,
    property.area,
    property.city,
  ]
    .filter(Boolean)
    .join(", ");

  return (
   
<Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
  <DialogTrigger render={Button}>
    <button
      type="button"
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-muted text-left"
    >
      {property.imageUrl ? (
        <Image
  src={property.imageUrl}
  alt={property.title || "Property image"}
  fill
  unoptimized
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
  className="object-cover "
/>
      ) : (
        <div className="flex h-full items-center justify-center">
          <Home className="size-12 text-muted-foreground" />
        </div>
      )}

      <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-3 py-2 text-xs text-white">
        View Details
      </span>
    </button>
  </DialogTrigger>

  <DialogContent
    className="
      fixed left-1/2 top-1/2 z-50
      flex -translate-x-1/2 -translate-y-1/2
      flex-col overflow-hidden

      w-[calc(100%-2rem)]
      max-w-5xl
      h-auto
      max-h-[90dvh]

      rounded-2xl
      border
      bg-background
      p-0

      sm:w-[calc(100%-3rem)]
      sm:max-h-[92dvh]

      md:max-w-3xl

      lg:max-w-5xl
      lg:max-h-[90dvh]

      xl:max-w-6xl

      max-sm:left-0
      max-sm:top-0
      max-sm:h-[100dvh]
      max-sm:max-h-[100dvh]
      max-sm:w-full
      max-sm:max-w-none
      max-sm:translate-x-0
      max-sm:translate-y-0
      max-sm:rounded-none
      max-sm:border-0
    "
  >
    {/* FIXED HEADER */}
    <DialogHeader className="shrink-0 border-b bg-background px-4 py-4 text-left sm:px-6">
      <DialogTitle className="pr-7 text-lg font-bold sm:text-xl">
        {property.title}
      </DialogTitle>

      <DialogDescription className="flex items-start gap-2 text-xs sm:text-sm">
        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
        <span className="break-words">
          {address || "Address not provided"}
        </span>
      </DialogDescription>
    </DialogHeader>

    {/* SCROLLABLE CONTENT */}
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE IMAGE */}
        <div className="relative min-w-0 bg-muted">
          <div className="
            relative aspect-[16/9] w-full
            sm:aspect-[16/8]
            lg:sticky lg:top-0 lg:aspect-[4/5]
          ">
            {property.imageUrl ? (
              <Image
                src={property.imageUrl}
                alt={property.title}
                fill
                
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain object-center rounded pl-4"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Home className="size-12 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE ALL DETAILS */}
        <div className="
          min-w-0 space-y-5 p-4
          sm:space-y-6 sm:p-6
          lg:p-7
        ">

          {/* RENT */}
          <section className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Monthly Rent
              </p>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                ৳{formatPrice(property.rent)}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}/ month
                </span>
              </h2>
            </div>

            <Wallet className="size-7 shrink-0 text-primary" />
          </section>

          <Separator />

          {/* DESCRIPTION */}
          <section className="space-y-2">
            <h3 className="font-bold">Description</h3>
            <p className="whitespace-pre-line break-words text-sm leading-7 text-muted-foreground">
              {property.description || "No description available."}
            </p>
          </section>

          <Separator />

          {/* FEATURES */}
          <section className="space-y-3">
            <h3 className="font-bold">Property Features</h3>

            <div className="grid grid-cols-2 gap-3">
              <Feature
                icon={<BedDouble className="size-5" />}
                label="Bedrooms"
                value={property.bedrooms ?? 0}
              />

              <Feature
                icon={<Bath className="size-5" />}
                label="Bathrooms"
                value={property.bathrooms ?? 0}
              />

              <Feature
                icon={<DoorOpen className="size-5" />}
                label="Available Rooms"
                value={property.availableRooms ?? 0}
              />

              <Feature
                icon={<Home className="size-5" />}
                label="Furnished"
                value={property.furnished || "N/A"}
              />
            </div>
          </section>

          <Separator />

          {/* ADDITIONAL DETAILS */}
          <section className="space-y-4">
            <h3 className="font-bold">Additional Details</h3>

            <Detail
              label="Property Type"
              value={property.propertyType}
            />

            <Detail
              label="Category"
              value={property.category || "N/A"}
            />

            <Detail
              label="Security Deposit"
              value={`৳${formatPrice(property.securityDeposit)}`}
            />

            <Detail
              label="Created At"
              value={
                property.createdAt
                  ? new Date(property.createdAt).toLocaleDateString("en-GB")
                  : "N/A"
              }
            />
          </section>

          <Separator />

          {/* CONTACT */}
          <section className="space-y-4">
            <h3 className="font-bold">Contact Information</h3>

            <ContactDetail
              icon={<UserRound className="size-4" />}
              label="Contact Name"
              value={property.contactName || "Not provided"}
            />

            <ContactDetail
              icon={<Phone className="size-4" />}
              label="Phone"
              value={property.contactPhone || "Not provided"}
            />

            <ContactDetail
              icon={<Mail className="size-4" />}
              label="Email"
              value={property.contactEmail || "Not provided"}
            />
          </section>

        </div>
      </div>
    </div>

    {/* FIXED FOOTER */}
    <div className="
      flex shrink-0 flex-col-reverse gap-2
      border-t bg-background p-3
      sm:flex-row sm:justify-center sm:p-4
    ">
      <Button
        type="button"
        variant="outline"
        className="w-full sm:w-auto"
        onClick={() => setDetailsOpen(false)}
      >
        Close
      </Button>

      <div className="w-full sm:w-auto">
        <CreateBookingDialog property={property} key={property.id} />
      </div>
    </div>

  </DialogContent>
</Dialog>

  );
}

/* FEATURE COMPONENT */
function Feature({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:bg-muted/50 sm:p-4">

      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-base font-bold sm:text-lg">
          {value}
        </p>

        <p className="text-xs text-muted-foreground">
          {label}
        </p>
      </div>

    </div>
  );
}

/* DETAIL COMPONENT */
function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-dashed pb-3 text-sm last:border-0 last:pb-0">

      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="max-w-[60%] break-words text-right font-semibold">
        {value}
      </span>

    </div>
  );
}

/* CONTACT COMPONENT */
function ContactDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">

      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="break-all text-sm font-medium">
          {value}
        </p>
      </div>

    </div>
  );
}
