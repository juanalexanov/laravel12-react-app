import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'List Seminars',
        href: '/seminars',
    },
];

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        snap: any;
    }
}
interface Seminar {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    eventTime: string;
    price: number | null;
    speaker?: {
        name: string;
    };
}


interface Props {
    seminars: Seminar[];
    search: string;
    page: number;
    last_page: number;
}

export default function SeminarList() {
    const { seminars, search, page, last_page } = usePage().props as unknown as Props;
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    useEffect(() => {
        router.get('/seminars', { search: debouncedSearch }, { preserveState: true });
    }, [debouncedSearch]);

    const changePage = (pageNumber: number) => {
        router.get('/seminars', { search, page: pageNumber }, { preserveState: true });
    };

    const formatRupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY); // gunakan env
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List Seminar" />
            <div className="max-w-full mx-auto p-10">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Daftar Seminar</h1>
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari seminar..."
                            className="w-64"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {seminars.map((seminar) => (
                        <Card key={seminar.id}>
                            <CardHeader className="flex flex-row justify-between items-start">
                                <div>
                                    <CardTitle>{seminar.title}</CardTitle>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        📅 {seminar.eventDate}
                                    </p>
                                </div>
                                <Badge variant={seminar.price && seminar.price > 0 ? 'default' : 'outline'}>
                                    {seminar.price && seminar.price > 0 ? `Berbayar` : 'Gratis'}
                                </Badge>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">{seminar.description}</p>
                                <p className="text-sm">⌚ Waktu: {seminar.eventTime}</p>
                                {seminar.speaker && (
                                    <><p className="text-sm">🎤 Pembicara: {seminar.speaker.name}</p><p className="text-sm font-semibold text-primary mt-1">
                                        💵 Harga: {seminar.price !== null ? formatRupiah(seminar.price) : 'Gratis'}
                                    </p></>
                                )}

                                <div className="mt-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full">Daftar</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Konfirmasi Pendaftaran</DialogTitle>
                                                <DialogDescription>
                                                    Apakah kamu yakin ingin mendaftar seminar "<strong>{seminar.title}</strong>"?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="gap-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        toast.success('Pendaftaran dibatalkan');
                                                        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                                    }}
                                                >
                                                    Batal
                                                </Button>

                                                <Button
                                                    disabled={isProcessing}
                                                    onClick={async () => {
                                                        if (isProcessing) return;
                                                        setIsProcessing(true);

                                                        try {
                                                            const res = await axios.post(`/seminars/${seminar.id}/register`);
                                                            const snapToken = res.data.token;

                                                            window.snap.pay(snapToken, {
                                                                onSuccess: () => {
                                                                    toast.success('Pembayaran berhasil!');
                                                                },
                                                                onPending: () => {
                                                                    toast('Menunggu pembayaran...');
                                                                },
                                                                onError: () => {
                                                                    toast.error('Pembayaran gagal.');
                                                                },
                                                                onClose: () => {
                                                                    toast('Kamu menutup pembayaran.');
                                                                },
                                                            });
                                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                        } catch (error: any) {
                                                            console.error(error);
                                                            if (error.response?.status === 422) {
                                                                toast.warning(error.response.data.message || 'Kamu sudah mendaftar atau membayar seminar ini.');
                                                            } else {
                                                                toast.error('Gagal memproses pembayaran.');
                                                            }
                                                        } finally {
                                                            setIsProcessing(false);
                                                            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                                                        }
                                                    }}
                                                >
                                                    Konfirmasi
                                                </Button>

                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>

                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    {[...Array(last_page)].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                            <Button
                                key={i}
                                variant={page === pageNum ? 'default' : 'outline'}
                                onClick={() => changePage(pageNum)}
                            >
                                {pageNum}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
