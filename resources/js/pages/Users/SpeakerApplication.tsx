import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { BreadcrumbItem } from '@/types';
import { useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Speaker Application',
        href: '/seminars/speaker_applications',
    },
];

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs';


export default function SpeakerApplication() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, reset } = useForm({
        remarks: '',
        cv: null as File | null,
    });

    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('cv', file);
            setPageNumber(1); // Reset to first page
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('seminars.speaker_submit'), {
            onSuccess: () => {
                toast.success('Berhasil mengajukan sebagai pembicara!');
                reset();
                setPageNumber(1);
                setNumPages(0);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onError: () => {
                toast.error('Gagal mengirim data.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Pembicara" />
            <div className="max-w-full px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">Daftar sebagai Pembicara</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium">CV (PDF)</label>
                        <Input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                        />
                    </div>

                    {data.cv && (
                        <div className="border rounded-md overflow-hidden shadow p-4">
                            <Document
                            file={data.cv ? URL.createObjectURL(data.cv) : null}
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            onLoadError={(err) => {
                                console.error('PDF Load Error:', err.message);
                                toast.error('Gagal memuat file PDF.');
                            }}
                            >
                            <Page pageNumber={pageNumber} />
                            </Document>

                            {numPages > 1 && (
                                <div className="flex items-center justify-between mt-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pageNumber <= 1}
                                        onClick={() => setPageNumber((prev) => prev - 1)}
                                    >
                                        ⬅️ Sebelumnya
                                    </Button>
                                    <p className="text-sm text-muted-foreground">
                                        Halaman {pageNumber} dari {numPages}
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pageNumber >= numPages}
                                        onClick={() => setPageNumber((prev) => prev + 1)}
                                    >
                                        Selanjutnya ➡️
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 font-medium">Keterangan Tambahan</label>
                        <Textarea
                            rows={4}
                            placeholder="Tulis sesuatu jika perlu..."
                            value={data.remarks}
                            onChange={(e) => setData('remarks', e.target.value)}
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Kirim Lamaran
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
