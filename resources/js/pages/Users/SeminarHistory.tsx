import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbItem } from "@/types";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seminar History',
        href: '/seminars/history',
    },
];

interface Seminar {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  eventTime: string;
  price: string;
  registrationDate: string;
  speaker?: {
    name: string;
  };
}

interface Props {
  seminars: Seminar[];
}

export default function SeminarHistory() {
  const { seminars } = usePage().props as unknown as Props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Riwayat Seminar" />
      <div className="max-w-full mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Riwayat Pembelian Seminar</h1>

        {seminars.length === 0 ? (
          <p className="text-muted-foreground text-center">
            Belum ada seminar yang diikuti.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {seminars.map((seminar) => (
              <Card key={seminar.id}>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{seminar.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      📅 {seminar.eventDate} | ⏰ {seminar.eventTime}
                    </p>
                  </div>
                  <Badge variant={parseFloat(seminar.price) > 0 ? "default" : "outline"} className="bg-green-300">
                    {parseFloat(seminar.price) > 0 ? "Berbayar" : "Gratis"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{seminar.description}</p>
                  {seminar.speaker && (
                    <p className="text-sm mb-1">🎤 Pembicara: {seminar.speaker.name}</p>
                  )}
                  <p className="text-sm font-medium">
                    📝 Tanggal Daftar: {new Date(seminar.registrationDate).toLocaleDateString("id-ID")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
