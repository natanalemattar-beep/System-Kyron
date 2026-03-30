'use client';

import { useEffect } from 'react';
import { useRouter } from '@/navigation';

export default function RegisterRRHHPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/register/asesoria-contable' as any);
    }, [router]);
    return null;
}
