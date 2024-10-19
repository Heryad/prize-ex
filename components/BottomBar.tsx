'use client'
import { Bookmark, Gamepad, HomeIcon, TicketIcon, User } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomBar() {
    const pathname = usePathname()

    return (
        <main className="h-20 w-screen flex flex-row gap-x-14 mt-auto justify-center items-center bg-white">
            <Link href={pathname == '/dashboard' ? `../dashboard` : '../dashboard'}>
                <HomeIcon size={30} color={pathname == '/dashboard' ? 'black' : 'gray'}/>
            </Link>

            <Link href={pathname == '/dashboard' ? `dashboard/ticket` : '../dashboard/ticket'}>
                <TicketIcon size={30} color={pathname == '/dashboard/ticket' ? 'black' : 'gray'}/>
            </Link>

            <Link href={pathname == '/dashboard' ? `dashboard/bookmark` : '../dashboard/bookmark'}>
                <Bookmark size={30} color={pathname == '/dashboard/bookmark' ? 'black' : 'gray'}/>
            </Link>

            <Link href={pathname == '/dashboard' ? `dashboard/profile` : '../dashboard/profile'}>
                <User size={30} color={pathname == '/dashboard/profile' ? 'black' : 'gray'}/>
            </Link>

            <Link href={pathname == '/dashboard' ? `dashboard/tasks` : '../dashboard/tasks'}>
                <Gamepad size={30} color={pathname == '/dashboard/tasks' ? 'black' : 'gray'}/>
            </Link>
        </main>
    )
}