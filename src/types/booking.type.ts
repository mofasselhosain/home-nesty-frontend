export interface ICreateBookingPayload {
  propertyId: string;
  startDate: string;
  endDate?: string;
  guests: number;
}
export interface IPayBookingPayload {
  bookingId: string;

}