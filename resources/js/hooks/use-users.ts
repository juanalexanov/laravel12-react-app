import { usePage } from "@inertiajs/react"
import { UsersPageProps } from "@/types/users"

export function useUsers() {
    const page = usePage<Partial<UsersPageProps>>()
    return page.props.users ?? [] // fallback array kosong
}
