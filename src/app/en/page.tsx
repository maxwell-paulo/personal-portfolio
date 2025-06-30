'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocaleStore } from '@/providers/use-locale-store';

export default function EnglishPage() {
    const router = useRouter();
    const { setLocale } = useLocaleStore();

    useEffect(() => {
        // Define o idioma como inglês
        setLocale('en');

        // Redireciona para a home
        router.push('/');
    }, [setLocale, router]);

    // Mostra uma tela de loading enquanto redireciona
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Setting language to English...</p>
            </div>
        </div>
    );
} 