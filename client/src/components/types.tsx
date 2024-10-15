export type Theme = "dark" | "light";

export interface HotelData {
  hotel?: string;
  arrival_date_year?: number;
  arrival_date_month?: string;
  arrival_date_day_of_month?: number;
  adults?: number;
  children?: number;
  babies?: number;
  country?: string | null;
}
