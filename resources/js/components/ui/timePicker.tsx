"use client"

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { timeOptions } from "@/lib/timeOptions"

type Props = {
    value: string
    onChange: (val: string) => void
    placeholder?: string
}

export function TimePicker({ value, onChange, placeholder = "Pick a time" }: Props) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            {/* Large list: bungkus ScrollArea supaya bisa discroll */}
            <SelectContent className="max-h-60">
                {timeOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                        {t}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
