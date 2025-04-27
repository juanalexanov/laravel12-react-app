"use client";

import { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { formatDateTime } from "@/lib/formatDate";
import {
    Plus,
    Pencil,
    Trash,
    ChevronsLeft,
    ChevronsRight,
    ChevronLeft,
    ChevronRight,
    CalendarIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Seminar } from "@/types/seminars";
import {
    Form as FormRoot,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { TimePicker } from "@/components/ui/timePicker";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Management Seminars",
        href: "/management-seminars",
    },
];

type PageProps = {
    seminars: Seminar[];
    currentPage: number;
    totalPages: number;
    perPage: number;
    speakers: { id: number; name: string }[];
};

const SeminarFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    price: z.string().optional(),
    googleMeetLink: z.string().optional(),
    eventDate: z.date({ required_error: "Event Date is required" }),
    eventTime: z.string().min(1, "Event Time is required"),
    speakerIds: z.array(z.string()).optional(),
});

export default function ManagementSeminars() {
    // const { seminars = [], currentPage = 1, totalPages = 1 } = usePage<PageProps>().props;
    const { seminars = [], currentPage = 1, totalPages = 1, speakers = [] } = usePage<PageProps>().props;

    const [openDialog, setOpenDialog] = useState(false);
    const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
    const [search, setSearch] = useState("");

    const seminarForm = useForm<z.infer<typeof SeminarFormSchema>>({
        resolver: zodResolver(SeminarFormSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "0",
            googleMeetLink: "",
            eventDate: new Date(),
            eventTime: "00:00",
        },
    });

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get('/management-seminars', { search, page: 1 }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search]);


    function onSubmit(values: z.infer<typeof SeminarFormSchema>) {
        const payload = {
            title: values.title,
            description: values.description,
            price: values.price || "0",
            googleMeetLink: values.googleMeetLink,
            eventDate: format(values.eventDate, "yyyy-MM-dd"),
            eventTime: values.eventTime,
            speaker_ids: values.speakerIds?.map(id => parseInt(id)) || [],
        };

        if (editingSeminar) {
            router.put(`/seminars/${editingSeminar.id}`, payload, {
                onSuccess: () => {
                    toast.success("Seminar updated successfully!");
                    setOpenDialog(false);
                },
            });
        } else {
            router.post("/seminars", payload, {
                onSuccess: () => {
                    toast.success("Seminar created successfully!");
                    setOpenDialog(false);
                },
            });
        }
    }


    function openCreateDialog() {
        setEditingSeminar(null);

        seminarForm.reset({
            title: "",
            description: "",
            price: "0",
            googleMeetLink: "",
            eventDate: new Date(),   // selalu default ke hari ini
            eventTime: "00:00",      // default 00:00
        });

        setOpenDialog(true);
    }


    function openEditDialog(seminar: Seminar) {
        setEditingSeminar(seminar);

        let eventDate: Date;
        let eventTime: string = "00:00"; // fallback default

        // Handle parsing eventDate
        if (seminar.eventDate) {
            const parsedDate = new Date(seminar.eventDate);
            eventDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
        } else {
            eventDate = new Date();
        }

        // Handle parsing eventTime
        if (seminar.eventTime) {
            // kalau eventTime ada detik (01:00:00), ambil jam-menit saja
            eventTime = seminar.eventTime.length > 5 ? seminar.eventTime.slice(0, 5) : seminar.eventTime;
        }

        seminarForm.reset({
            title: seminar.title,
            description: seminar.description ?? "",
            price: seminar.price ?? "0",
            googleMeetLink: seminar.googleMeetLink ?? "",
            eventDate,
            eventTime,
            speakerIds: seminar.speakers?.map(s => String(s.id)) || [],
        });

        setOpenDialog(true);
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Management Seminars" />
            <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold">Manage Seminars</h1>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search seminars..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9"
                        />
                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-4 w-4" /> Add Seminar
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seminars.map((seminar) => (
                        <Card key={seminar.id}>
                            <CardHeader>
                                <CardTitle>{seminar.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <p className="text-sm text-muted-foreground">{seminar.description ?? "No description"}</p>
                                <p className="text-sm">
                                    {formatDateTime(seminar.eventDate, seminar.eventTime)}
                                </p>
                                {seminar.speakers && seminar.speakers.length > 0 && (
                                    <p className="text-sm">
                                        Speakers: {seminar.speakers.map((s) => s.name).join(", ")}
                                    </p>
                                )}

                                <p className="text-sm">Price: {Number(seminar.price) === 0 ? "Free" : `Rp${seminar.price}`}</p>
                                {seminar.googleMeetLink && (
                                    <a href={seminar.googleMeetLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                                        Join Google Meet
                                    </a>
                                )}
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button size="sm" variant="outline" onClick={() => openEditDialog(seminar)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="sm" variant="destructive">
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to delete {seminar.title}?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => {
                                                        router.delete(`/seminars/${seminar.id}`, {
                                                            onSuccess: () => toast.success("Seminar deleted!"),
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Pagination className="mt-6 justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={() => router.get("/management-seminars", { page: 1, search }, { preserveState: true, preserveScroll: true })}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={() =>
                                    router.get("/management-seminars", { page: Math.max(currentPage - 1, 1), search }, { preserveState: true, preserveScroll: true })
                                }
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </PaginationLink>
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={() =>
                                        router.get("/management-seminars", { page, search }, { preserveState: true, preserveScroll: true })
                                    }
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={() =>
                                    router.get("/management-seminars", { page: Math.min(currentPage + 1, totalPages), search }, { preserveState: true, preserveScroll: true })
                                }
                            >
                                <ChevronRight className="h-4 w-4" />
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={() =>
                                    router.get("/management-seminars", { page: totalPages, search }, { preserveState: true, preserveScroll: true })
                                }
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingSeminar ? "Edit Seminar" : "Create Seminar"}</DialogTitle>
                        </DialogHeader>

                        <FormProvider {...seminarForm}>
                            <FormRoot {...seminarForm}>
                                <form onSubmit={seminarForm.handleSubmit(onSubmit)} className="space-y-6">

                                    <FormField
                                        control={seminarForm.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={seminarForm.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={seminarForm.control}
                                        name="eventDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Event Date</FormLabel>
                                                <Popover modal={true}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value instanceof Date && !isNaN(field.value.getTime())
                                                                    ? format(field.value, "PPP")
                                                                    : "Pick a date"}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={(date) => field.onChange(date!)}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={seminarForm.control}
                                        name="eventTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Event Time</FormLabel>
                                                <FormControl>
                                                    <TimePicker
                                                        value={field.value}           // string "HH:mm"
                                                        onChange={field.onChange}     // update react-hook-form
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={seminarForm.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl><Input type="number" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={seminarForm.control}
                                        name="googleMeetLink"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Google Meet Link</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={seminarForm.control}
                                        name="speakerIds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Speakers</FormLabel>
                                                <FormControl>
                                                    <Popover modal={true}>
                                                        <PopoverTrigger asChild>
                                                            <Button variant="outline" className="w-full justify-start text-left">
                                                                {field.value && field.value.length > 0
                                                                    ? field.value.map(id => speakers.find(s => s.id === parseInt(id))?.name).join(", ")
                                                                    : "Select Speakers"}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[300px] p-2">
                                                            <div className="flex flex-col gap-1">
                                                                {speakers.map((speaker) => (
                                                                    <label key={speaker.id} className="flex items-center gap-2">
                                                                        <input
                                                                            type="checkbox"
                                                                            value={speaker.id}
                                                                            checked={field.value?.includes(String(speaker.id))}
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    field.onChange([...(field.value || []), e.target.value]);
                                                                                } else {
                                                                                    field.onChange((field.value || []).filter(val => val !== e.target.value));
                                                                                }
                                                                            }}
                                                                        />
                                                                        {speaker.name}
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                        <Button type="submit">Save</Button>
                                    </div>
                                </form>
                            </FormRoot>
                        </FormProvider>
                    </DialogContent>
                </Dialog>

            </div>
        </AppLayout>
    );
}
