import { usePage } from '@inertiajs/react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, History, LayoutGrid, LayoutList, UserRoundPlus } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const isAdmin = user?.role === 'admin';

    const mainNavItems: NavItem[] = isAdmin
        ? [
            { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
            { title: 'Management Users', href: '/management-users', icon: Folder },
            { title: 'Management Seminars', href: '/management-seminars', icon: Folder },
            { title: 'Management Applications', href: '/management-applications', icon: Folder },
            { title: 'Management Payments', href: '/management-payments', icon: Folder },
        ]
        : [
            { title: 'List Seminar', href: '/seminars', icon: LayoutList },
            { title: 'History Seminar', href: '/seminars/history', icon: History },
            { title: 'Daftar Pembicara', href: '/seminars/speaker_applications', icon: UserRoundPlus },
        ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'History',
            href: 'https://laravel.com/docs/starter-kits',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
