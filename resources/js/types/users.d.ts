
export type User = {
    id: number
    name: string
    email: string
    role: "guest" | "user" | "admin"
    isSpeaker: boolean
}

export type UsersPageProps = {
    users: User[]
}
