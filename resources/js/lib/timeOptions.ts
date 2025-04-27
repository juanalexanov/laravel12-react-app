// utils/timeOptions.ts
export const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
    const h = Math.floor(i / 4)
    const m = (i % 4) * 15
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
})
