import StudentAdminLayout from '@/components/studentAdminDashboard';
import Dashboard from '@/components/studentAdminDashboard/dashboard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function StudentAdminPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('students-token')?.value;

    if (!token) {
        redirect('/student-login');
    }

    let userJson = null;

    try {
        const req = await fetch(`/api/students/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${token}`,
            },
        });

        if (!req.ok) {
            console.error('Failed to fetch user data:', req.status, req.statusText);
            throw new Error('Failed to fetch user data');
        }

        userJson = await req.json();
    } catch (err) {
        console.error('Error during fetch:', err);
        redirect('/student-login');
        return null; // Prevent further execution
    }

    if (!userJson.user) {
        redirect('/student-login');
    }

    return (
        <StudentAdminLayout>
            <Dashboard userJson={userJson} />
        </StudentAdminLayout>
    );
}
