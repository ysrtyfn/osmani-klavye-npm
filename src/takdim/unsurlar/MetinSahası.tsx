import React, { useEffect, useId, useRef, useState } from 'react';
import { KaretNevi, alKaretİlkHalini } from '@/osmaniKlavye/merkez/nevler/KaretNevi';
import { MetinTatbikati } from '@/osmaniKlavye/iskele/kalipTatbikatlari/MetinTatbikati';
import { MetinSahasıMuavini } from '@/osmaniKlavye/takdim/muavinler/MetinSahasıMuavini';
import { MetinSahasıHususiyetleri } from './MetinSahasıHususiyetleri';
import { Metin, alBoşMetni } from '@/osmaniKlavye/ihtisas/nevler/Metin';
import { cn } from '@/osmaniKlavye/nuve/aletler';

import '../tarz/tarzAhir.css';

const metinTatbikati = new MetinTatbikati();
const { tuşaBasılınca, tuşBırakılınca } = MetinSahasıMuavini(metinTatbikati);

export const MetinSahası: React.FunctionComponent<MetinSahasıHususiyetleri> = (hususiyetler) => {
    const { className } = hususiyetler;
    const [metin, metniDeğiştir] = useState<Metin>(alBoşMetni());
    // mevki değişmediğinde metnin sonuna gidiyor, yeniden çizmeli
    const [karetİbresi, değiştirKaretİbresini] = useState<number>(0);
    const karetMevkisiİması = useRef<KaretNevi>(alKaretİlkHalini());
    const id_osmaniMetinSahası = useId();

    useEffect(() => {
        let tuşaBasılıncaÜst = async (hadise: KeyboardEvent) => {
            const metinSahası: HTMLTextAreaElement = hadise.target as HTMLTextAreaElement;
            const seçiliKısımBaşı = metinSahası.selectionStart;
            const seçiliKısımSonu = metinSahası.selectionEnd;

            const [harfEklenmişMetin, karetHareketMiktarı] = await tuşaBasılınca(
                hadise,
                seçiliKısımBaşı,
                seçiliKısımSonu
            );

            // CTRL tuşuna basılınca harf eklenmiyor ama seçili kısım kaybediliyor, buna mani olmak için
            if (karetHareketMiktarı === 0) {
                karetMevkisiİması.current = {
                    başMevki: seçiliKısımBaşı,
                    sonMevki: seçiliKısımSonu
                };
            } else {
                karetMevkisiİması.current = {
                    başMevki: seçiliKısımBaşı + karetHareketMiktarı,
                    sonMevki: seçiliKısımBaşı + karetHareketMiktarı
                };
            }

            değiştirKaretİbresini((ibre) => ibre + 1);
            metniDeğiştir(harfEklenmişMetin);
        };

        const metinSahası: HTMLTextAreaElement = document.getElementById(id_osmaniMetinSahası) as HTMLTextAreaElement;
        metinSahası.focus();
        metinSahası.addEventListener('keydown', tuşaBasılıncaÜst, false);
        metinSahası.addEventListener('keyup', tuşBırakılınca, false);

        return () => {
            metinSahası.removeEventListener('keydown', tuşaBasılıncaÜst);
            metinSahası.removeEventListener('keyup', tuşBırakılınca);
        };
    }, [id_osmaniMetinSahası, metniDeğiştir, tuşBırakılınca, tuşaBasılınca]);

    useEffect(() => {
        const metinSahası: HTMLTextAreaElement = document.getElementById(id_osmaniMetinSahası) as HTMLTextAreaElement;

        metinSahası.focus();
        metinSahası.setSelectionRange(karetMevkisiİması.current.başMevki, karetMevkisiİması.current.sonMevki);
    }, [id_osmaniMetinSahası, metin, karetİbresi]);

    return (
        <>
            <label htmlFor={id_osmaniMetinSahası} className="hidden">
                Osmani Metin:
            </label>
            <textarea
                id={id_osmaniMetinSahası}
                className={cn('h-full w-full', className)}
                name="metin"
                dir="rtl"
                disabled={false}
                readOnly={false}
                value={metin}
                onChange={(hadise) => {
                    // tuşBasmaya ekledeğimiz prevent default sebebiyle bu metod çağrılmıyor, bu sayede karet mevkisi muhafaza ediliyor
                    console.log('🚀 ~ file: MetinSahası.tsx:65 ~ onChange:', '');
                }}
            />
        </>
    );
};
