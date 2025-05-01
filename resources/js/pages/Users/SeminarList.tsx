import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'List Seminars',
        href: '/seminars',
    },
];

interface Seminar {
    id: number;
    title: string;
    description: string;
    eventDate: string;
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
                            <CardHeader>
                                <CardTitle>{seminar.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">{seminar.description}</p>
                                <p className="text-sm">📅 {seminar.eventDate}</p>
                                {seminar.speaker && (
                                    <p className="text-sm">🎤 Pembicara: {seminar.speaker.name}</p>
                                )}
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
