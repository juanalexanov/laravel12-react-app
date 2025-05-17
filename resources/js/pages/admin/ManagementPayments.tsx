import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { type Payment } from "@/types/payment";

const breadcrumbs = [{ title: "Management Payments", href: "/management-payments" }];

type PageProps = {
    payments: Payment[];
};

export default function ManagementPayments() {
    const { payments } = usePage<PageProps>().props;


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Management Payments" />
            <div className="flex flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pembayaran Sukses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama User</TableHead>
                                    <TableHead>Seminar</TableHead>
                                    <TableHead>Metode</TableHead>
                                    <TableHead>Jumlah</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.length > 0 ? (
                                    payments.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell>{payment.user?.name}</TableCell>
                                            <TableCell>{payment.seminar?.title}</TableCell>
                                            <TableCell>{payment.paymentMethod}</TableCell>
                                            <TableCell>Rp {Number(payment.amount).toLocaleString("id-ID")}</TableCell>
                                            <TableCell>{new Date(payment.paymentDate).toLocaleDateString("id-ID")}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            Tidak ada pembayaran ditemukan.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
