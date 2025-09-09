import React, { useMemo } from 'react';

const FullSplitSection: React.FC = () => {
    const images = useMemo(
        () => [
            '/images/background/prime-bg/bg-primary1.jpg',
            '/images/background/prime-bg/bg-primary2.jpg',
            '/images/background/prime-bg/bg-primary3.jpg',
            '/images/background/prime-bg/bg-primary4.jpg',
        ],
        [],
    );

    const bgImage = useMemo(() => images[Math.floor(Math.random() * images.length)], [images]);

    return (
        <section className="flex w-screen flex-col overflow-hidden md:h-screen md:flex-row">
            {/* Left dynamic background panel */}
            <div
                className="relative flex h-screen w-full flex-col justify-center bg-cover bg-center px-8 text-white md:h-full md:w-[70vw] md:px-16"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight drop-shadow md:text-6xl">Wynajmij samochód szybciej</h1>
                    <p className="mb-8 max-w-xl text-lg text-white/90 md:text-xl">
                        Prosty i szybki sposób na rezerwację idealnego auta. Bez zbędnych formalności.
                    </p>
                    <div className="flex gap-4">
                        <button className="rounded-md bg-white px-6 py-3 font-semibold text-red-600 shadow transition hover:shadow-lg">
                            Rezerwuj
                        </button>
                        <button className="rounded-md border border-white/70 px-6 py-3 transition hover:bg-white/10">Poznaj ofertę</button>
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex min-h-[60vh] w-full flex-col justify-center bg-neutral-900 px-8 text-neutral-100 md:h-full md:w-[30vw] md:px-10">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Dlaczego my?</h2>
                <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                        Flota nowych i zadbanych aut
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                        Przejrzyste ceny – bez ukrytych opłat
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                        Szybka obsługa i wsparcie 24/7
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default FullSplitSection;
