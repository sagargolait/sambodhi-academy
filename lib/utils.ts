import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function objectToArray(obj: object) {
  return Object.values(obj);
}

export const isValidURL = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    console.log(_);
    return false;
  }
};

export const extractLocaleFromPath = (pathname: string) => {
  const pathSegments = pathname.split("/");
  const potentialLocale = pathSegments[1];

  return potentialLocale;
};
