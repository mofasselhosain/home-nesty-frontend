"use client";

import {
  CalendarDays,
  House,
  Users,
  Clock,
  ReceiptText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useGetBooking, usePayBooking } from "@/hooks";
import { toast } from "@/components/ui/toast";

export interface IBooking {
  id: string;
  propertyId: string;
  customerId: string;
  bookingNumber: string;
  startDate: string;
  endDate: string | null;
  guests: number;
  totalAmount: string | number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "ONGOING"
    | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}

interface BookingListResponse {
  data: IBooking[];
}

const statusStyles: Record<IBooking["status"], string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
  ONGOING: "bg-blue-100 text-blue-800 border-blue-200",
  COMPLETED: "bg-gray-100 text-gray-700 border-gray-200",
};

/**
 * Format dates consistently between the server and browser.
 * UTC avoids differences caused by local time zones.
 */
function formatDate(date: string | null | undefined): string {
  if (!date) return "Not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
}

/**
 * Use a fixed locale and an explicit currency symbol
 * to reduce server/client formatting differences.
 */
function formatMoney(amount: string | number): string {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return "৳0";
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(numericAmount);

  return `৳${formattedAmount}`;
}

function getNights(
  startDate: string,
  endDate: string | null,
): number | null {
  if (!endDate) return null;

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return null;
  }

  return Math.max(
    0,
    Math.round((end - start) / (1000 * 60 * 60 * 24)),
  );
}

function getBookings(
  response: unknown,
): IBooking[] {
  if (!response || typeof response !== "object") {
    return [];
  }

  const result = response as {
    data?: unknown;
  };

  // Supports: { data: [...] }
  if (Array.isArray(result.data)) {
    return result.data as IBooking[];
  }

  // Supports: { data: { data: [...] } }
  if (result.data && typeof result.data === "object") {
    const nested = result.data as {
      data?: unknown;
    };

    if (Array.isArray(nested.data)) {
      return nested.data as IBooking[];
    }
  }

  return [];
}

export default function BookingList() {
  const {
    data: bookings,
    isLoading,
    isError,
    refetch,
  } = useGetBooking();

  const {
    mutate: payBooking,
    isPending,
  } = usePayBooking();

  const handlePay = (bookingId: string) => {
    payBooking(
      { bookingId },
      {
        onSuccess: (response: unknown) => {
          console.log(response)
          const res = response as {
            data?: {
              paymentUrl?: string;
              data?: {
                paymentUrl?: string;
              };
            };
            paymentUrl?: string;
          };

          const paymentUrl =
            res?.data?.paymentUrl ??
            res?.paymentUrl ??
            res?.data?.data?.paymentUrl;

          // Validate the URL before redirecting to an external gateway.
          if (
            typeof paymentUrl !== "string" ||
            !/^https?:\/\//i.test(paymentUrl)
          ) {
            toast.add({
              title: "Payment Failed",
              description:
                "Unable to get a valid payment URL from the server.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Payment Initialized",
            description:
              "Redirecting you to the payment gateway...",
            type: "success",
          });
console.log(paymentUrl,)
          // Correct for an external payment gateway such as bKash.
          window.location.assign(paymentUrl);
        },

        onError: (error: Error) => {
          toast.add({
            title: "Payment Failed",
            description:
              error.message || "Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Loading bookings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-red-600">
          Failed to load bookings.
        </p>

        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => refetch()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  const bookingData: IBooking[] = getBookings(
    bookings as BookingListResponse | undefined,
  );

  if (bookingData.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {bookingData.map((booking) => {
        const nights = getNights(
          booking.startDate,
          booking.endDate,
        );

        const canPay = booking.status === "PENDING";

        return (
          <Card
            key={booking.id}
            className="overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                    <House className="size-5 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <CardTitle className="text-base">
                      Property Booking
                    </CardTitle>

                    <p className="mt-1 break-all text-xs text-muted-foreground">
                      {booking.bookingNumber}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={
                    statusStyles[booking.status] ??
                    "bg-muted text-muted-foreground"
                  }
                >
                  {booking.status}
                </Badge>
              </div>

              <div className="rounded-xl bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                  Total booking amount
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight">
                  {formatMoney(booking.totalAmount)}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-4" />
                    Check-in
                  </p>

                  <p className="text-sm font-semibold">
                    {formatDate(booking.startDate)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-4" />
                    Check-out
                  </p>

                  <p className="text-sm font-semibold">
                    {formatDate(booking.endDate)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  Guests
                </div>

                <span className="text-sm font-medium">
                  {booking.guests}{" "}
                  {booking.guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>

              {nights !== null && (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    Duration
                  </div>

                  <span className="text-sm font-medium">
                    {nights}{" "}
                    {nights === 1 ? "night" : "nights"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ReceiptText className="size-4" />
                  Booked on
                </div>

                <span className="text-sm">
                  {formatDate(booking.createdAt)}
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button
                type="button"
                className="w-full"
                disabled={!canPay || isPending}
                onClick={() => handlePay(booking.id)}
              >
                {!canPay
                  ? booking.status === "CANCELLED"
                    ? "Booking Cancelled"
                    : booking.status === "COMPLETED"
                      ? "Booking Completed"
                      : "Payment Unavailable"
                  : isPending
                    ? "Processing..."
                    : "Pay Now"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}