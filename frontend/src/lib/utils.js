import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { format, parseISO, isValid } from "date-fns";

export const formatDate = (dateString) => {
	const date = parseISO(dateString);
	return isValid(date) ? format(date, "MMM yyyy") : "Present";
};