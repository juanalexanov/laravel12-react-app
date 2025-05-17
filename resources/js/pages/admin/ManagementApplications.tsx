import { Head, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { toast } from "sonner";
import { type SpeakerApplication } from "@/types/application";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import { Badge } from "@/components/ui/badge";

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs';

type PageProps = {
    applications: SpeakerApplication[];
    currentPage: number;
    totalPages: number;
    statusFilter?: string;
};

export default function ManagementApplications() {
    const { applications, currentPage, totalPages, statusFilter } = usePage<PageProps>().props;
    const [cvPreview, setCvPreview] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const filterOptions = ["all", "pending", "approved", "rejected"];

    const handleAction = (id: number, action: "approve" | "reject") => {
        router.put(`/management-applications/${id}/${action}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Application ${action}d successfully`);
            },
        });
    };

    const handleFilterChange = (filter: string) => {
        router.get("/management-applications", { status: filter === "all" ? undefined : filter }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handlePagination = (page: number) => {
        router.get("/management-applications", {
            page,
            status: statusFilter,
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    function getStatusClass(status: string) {
        switch (status) {
            case "pending":
                return "bg-yellow-200 text-yellow-800 border-yellow-200";
            case "approved":
                return "bg-green-200 text-green-800 border-green-200";
            case "rejected":
                return "bg-red-400 text-red-800 border-red-400";
            default:
                return "";
        }
    }


    return (
        <AppLayout breadcrumbs={[{ title: "Management Applications", href: "/management-applications" }]}>
            <Head title="Management Applications" />
            <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h1 className="text-2xl font-bold">Speaker Applications</h1>
                    <div className="flex gap-2">
                        {filterOptions.map((filter) => (
                            <Button
                                key={filter}
                                variant={filter === (statusFilter || "all") ? "default" : "outline"}
                                onClick={() => handleFilterChange(filter)}
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {applications.map((app) => (
                        <Card key={app.id}>
                            <CardHeader>
                                <CardTitle>{app.user.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p>Email: {app.user.email}</p>
                                <p>Remarks: {app.remarks || "–"}</p>
                                <p className="flex items-center gap-2">
                                    Status:
                                    <Badge variant="outline" className={getStatusClass(app.status)}>
                                        {app.status}
                                    </Badge>
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <Button variant="outline" onClick={() => {
                                        setPageNumber(1);
                                        setCvPreview(`/storage/cv_speakers/cv_${app.user.id}_${app.id}.pdf`);
                                    }}>
                                        View CV
                                    </Button>
                                    {app.status === 'pending' && (
                                        <>
                                            <Button onClick={() => handleAction(app.id, "approve")} className="bg-green-500 hover:bg-green-600">Approve</Button>
                                            <Button onClick={() => handleAction(app.id, "reject")}  className="bg-red-500 hover:bg-red-700">Reject</Button>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Pagination className="mt-6 justify-center">
                    <PaginationContent>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={() => handlePagination(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>

                <Dialog open={!!cvPreview} onOpenChange={() => setCvPreview(null)}>
                    <DialogContent className="max-w-6xl w-full">
                        <DialogHeader><DialogTitle>CV Preview</DialogTitle></DialogHeader>
                        {cvPreview && (
                            <div className="max-h-[70vh] overflow-y-auto px-4">
                                <Document
                                    file={cvPreview}
                                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                    onLoadError={() => toast.error("Failed to load PDF")}
                                >
                                    <Page pageNumber={pageNumber} width={500} />
                                </Document>
                                {numPages > 1 && (
                                    <div className="flex justify-between mt-2">
                                        <Button variant="outline" disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</Button>
                                        <span>Page {pageNumber} of {numPages}</span>
                                        <Button variant="outline" disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
