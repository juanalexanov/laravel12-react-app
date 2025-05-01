import { Head, usePage } from '@inertiajs/react';

interface Seminar {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    speaker?: {
        name: string;
    };
}

export default function SeminarHistory() {
    const { seminars } = usePage().props as unknown as { seminars: Seminar[] };

    return (
        <>
            <Head title="History Seminar" />
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Riwayat Seminar</h1>
                {seminars.length === 0 ? (
                    <p className="text-gray-500">Kamu belum pernah mengikuti seminar.</p>
                ) : (
                    <div className="grid gap-4">
                        {seminars.map((seminar) => (
                            <div key={seminar.id} className="border p-4 rounded-lg shadow-sm">
                                <h2 className="text-lg font-semibold">{seminar.title}</h2>
                                <p className="text-sm text-gray-600">{seminar.description}</p>
                                <p className="text-sm mt-1">📅 {seminar.eventDate}</p>
                                {seminar.speaker && (
                                    <p className="text-sm mt-1">🎤 Pembicara: {seminar.speaker.name}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
