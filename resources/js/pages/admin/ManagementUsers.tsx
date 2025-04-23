import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Plus, Trash, ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react"
import { router, Head, usePage } from "@inertiajs/react"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"

import { type BreadcrumbItem } from "@/types"
import { type User } from "@/types/users"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Management Users",
        href: "/management-users",
    },
]

const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().optional(),
    role: z.enum(["guest", "user", "admin"]),
    isSpeaker: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

type PageProps = {
    users: User[]
    currentPage: number
    totalPages: number
    perPage: number
}

export default function ManagementUsers() {
    const { users = [], currentPage = 1, totalPages = 1, perPage = 10 } = usePage<PageProps>().props
    const [open, setOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [selectedPerPage, setSelectedPerPage] = useState(perPage.toString())
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "user",
            isSpeaker: false,
        },
    })

    useEffect(() => {
        if (editingUser) {
            form.reset({
                name: editingUser.name,
                email: editingUser.email,
                password: "", // keep empty for update mode
                role: editingUser.role,
                isSpeaker: editingUser.isSpeaker,
            })
        } else {
            form.reset({
                name: "",
                email: "",
                password: "",
                role: "user",
                isSpeaker: false,
            })
        }
    }, [editingUser, form])

    function onSubmit(data: FormData) {
        if (editingUser) {
            const payload: Partial<FormData> = {
                name: data.name,
                email: data.email,
                role: data.role,
                isSpeaker: data.isSpeaker,
            }
            if (data.password && data.password.trim() !== "") {
                payload.password = data.password
            }

            router.put(`/users/${editingUser.id}`, payload, {
                onSuccess: () => {
                    toast.success("User updated successfully")
                    setOpen(false)
                    setEditingUser(null)
                },
            })
        } else {
            router.post("/users", data, {
                onSuccess: () => {
                    toast.success("User created successfully")
                    setOpen(false)
                    form.reset()
                },
            })
        }
    }



    function onDelete(user: User) {
        router.delete(`/users/${user.id}`, {
            onSuccess: () => toast.success(`User ${user.name} deleted successfully`),
        })
    }

    function changePage(page: number) {
        router.get("/management-users", { page, perPage: selectedPerPage })
    }

    function changePerPage(value: string) {
        setSelectedPerPage(value)
        router.get("/management-users", { page: 1, perPage: value })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Management Users" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle className="text-xl font-bold">User Management</CardTitle>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="perPage" className="text-sm">Show</Label>
                                <Select
                                    value={selectedPerPage}
                                    onValueChange={(value) => changePerPage(value)}
                                >
                                    <SelectTrigger id="perPage" className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Dialog
                                open={open}
                                onOpenChange={(state) => {
                                    setOpen(state)
                                    if (!state) setEditingUser(null)
                                }}
                            >
                                <DialogTrigger asChild>
                                    <Button onClick={() => setOpen(true)}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add User
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input {...form.register("name" as const)} id="name" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input {...form.register("email" as const)} id="email" type="email" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">
                                                Password{" "}
                                                {editingUser && (
                                                    <span className="text-xs text-muted-foreground">(optional)</span>
                                                )}
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    {...form.register("password")}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="role">Role</Label>
                                            <Select
                                                onValueChange={(value) => form.setValue("role", value as FormData["role"])}
                                                defaultValue={form.getValues("role")}
                                            >
                                                <SelectTrigger id="role">
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="guest">Guest</SelectItem>
                                                    <SelectItem value="user">User</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="isSpeaker"
                                                checked={form.watch("isSpeaker")}
                                                onCheckedChange={(checked) => form.setValue("isSpeaker", !!checked)}
                                            />
                                            <Label htmlFor="isSpeaker">Is Speaker?</Label>
                                        </div>
                                        <div className="flex justify-end pt-2">
                                            <Button type="submit">Save</Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Speaker</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.isSpeaker ? "Yes" : "No"}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                onClick={() => {
                                                    setEditingUser(user)
                                                    setOpen(true)
                                                }}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button size="lg" variant="destructive">
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you sure you want to delete {user.name}?
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => onDelete(user)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Pagination className="mt-6 justify-center">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationLink href="#" onClick={() => changePage(1)}>
                                        <ChevronsLeft className="h-4 w-4" />
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        onClick={() => changePage(Math.max(currentPage - 1, 1))}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </PaginationLink>
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            isActive={page === currentPage}
                                            onClick={() => changePage(page)}
                                            href="#"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" onClick={() => changePage(totalPages)}>
                                        <ChevronsRight className="h-4 w-4" />
                                    </PaginationLink>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
