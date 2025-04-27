import { format, parseISO, isValid } from "date-fns";
import { id } from "date-fns/locale";

export function formatDateTime(
  dateString: string,
  timeString: string,
  options?: { use12Hour?: boolean }
): string {
  try {
    if (!dateString || !timeString) return "-";

    // CLEAN TIME STRING
    let cleanTime = timeString;

    // Kalau timeString malah ISO timestamp
    if (timeString.includes("T")) {
      const dateObj = new Date(timeString);
      if (isValid(dateObj)) {
        const hours = dateObj.getHours().toString().padStart(2, "0");
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");
        cleanTime = `${hours}:${minutes}`; // contoh "01:00"
      } else {
        return "-";
      }
    }

    const combined = parseISO(`${dateString}T${cleanTime}`);
    if (!isValid(combined)) return "-";

    const datePart = format(combined, "EEEE, d MMMM yyyy", { locale: id });
    const timePart = options?.use12Hour
      ? format(combined, "hh:mm a")
      : format(combined, "HH:mm");

    return `${datePart} — ${timePart} WIB`;
  } catch {
    return "-";
  }
}
