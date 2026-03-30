'use client';

import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || inView) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: '50px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, inView]);

    return [ref, inView];
}
