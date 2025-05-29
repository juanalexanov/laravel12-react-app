import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage, router } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" },
];

type Seminar = {
    id: number;
    title: string;
    eventDate: string;
    eventTime: string;
};

type DashboardProps = {
    stats: {
        totalUsers: number;
        totalSeminars: number;
        totalPayments: number;
        totalSpeakers: number;
    };
    chart: {
        labels: string[];
        data: number[];
    };
    upcomingSeminars: Seminar[];
    notifications: {
        seminarsWithoutSpeaker: number;
        pendingSpeakerApplications: number;
    };
    reminderSeminars: {
        today: Seminar[];
        tomorrow: Seminar[];
    };
};

export default function Dashboard() {
    const { stats, chart, upcomingSeminars, notifications, reminderSeminars } = usePage<DashboardProps>().props;
    const [range, setRange] = useState("7d");
    const [textColor, setTextColor] = useState("#000");

    useEffect(() => {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTextColor(isDark ? "#fff" : "#000");
    }, []);

    const changeRange = (newRange: string) => {
        setRange(newRange);
        router.get("/dashboard", { range: newRange }, { preserveState: true });
    };

    const chartData = {
        labels: chart.labels,
        datasets: [
            {
                label: "Pendaftaran",
                data: chart.data,
                borderColor: "rgba(59, 130, 246, 1)",
                backgroundColor: "rgba(59, 130, 246, 1)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                onClick: () => { },
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColor,
                },
            },
            y: {
                ticks: {
                    color: textColor,
                },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4 p-4">
                {/* Notifikasi Seminar Hari Ini / Besok */}
                {reminderSeminars.today.length > 0 && (
                    <div className="p-3 border-l-4 border-red-500 bg-red-100 text-red-800 rounded">
                        {reminderSeminars.today.map((s) => (
                            <div key={s.id}>
                                📣 Seminar “{s.title}” akan berlangsung <strong>HARI INI</strong> pukul {s.eventTime}
                            </div>
                        ))}
                    </div>
                )}
                {reminderSeminars.tomorrow.length > 0 && (
                    <div className="p-3 border-l-4 border-orange-500 bg-orange-100 text-orange-800 rounded">
                        {reminderSeminars.tomorrow.map((s) => (
                            <div key={s.id}>
                                ⏰ Seminar “{s.title}” akan dimulai pada pukul {s.eventTime} WIB
                            </div>
                        ))}
                    </div>
                )}

                {/* Notifikasi lainnya */}
                {notifications.seminarsWithoutSpeaker > 0 && (
                    <div className="p-3 border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800 rounded">
                        ⚠️ {notifications.seminarsWithoutSpeaker} seminar belum memiliki pembicara.
                    </div>
                )}
                {notifications.pendingSpeakerApplications > 0 && (
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-100 text-blue-800 rounded">
                        📬 {notifications.pendingSpeakerApplications} aplikasi pembicara menunggu peninjauan.
                    </div>
                )}

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Users</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">{stats.totalUsers}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Seminars</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">{stats.totalSeminars}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Payments</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">{stats.totalPayments}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Speakers</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">{stats.totalSpeakers}</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Statistik Pendaftaran</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Button variant={range === "7d" ? "default" : "outline"} onClick={() => changeRange("7d")}>Last 7 Days</Button>
                            <Button variant={range === "1m" ? "default" : "outline"} onClick={() => changeRange("1m")}>Last Month</Button>
                            <Button variant={range === "1y" ? "default" : "outline"} onClick={() => changeRange("1y")}>Last 1 Year</Button>
                        </div>
                        <div style={{ height: "300px" }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Seminar Terdekat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {upcomingSeminars.length > 0 ? (
                                upcomingSeminars.map((seminar) => (
                                    <li key={seminar.id} className="border p-2 rounded-md">
                                        <div className="font-semibold">{seminar.title}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {format(new Date(seminar.eventDate), "dd MMM yyyy")} jam {seminar.eventTime}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div className="text-sm text-muted-foreground">Tidak ada seminar terdekat.</div>
                            )}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
