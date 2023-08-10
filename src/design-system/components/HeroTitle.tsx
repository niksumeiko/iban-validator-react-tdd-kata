import type { ReactNode } from 'react';

interface Props {
    title: ReactNode;
}

export const HeroTitle = ({ title }: Props) => (
    <h2 className="-mt-11 mb-8 text-4xl font-extrabold leading-[3.5rem] tracking-wide text-center">
        <span className="px-4 py-1 bg-amber-100">
            <span className="bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent uppercase ">
                {title}
            </span>
        </span>
    </h2>
);
