import { Harf } from '@/osmaniKlavye/ihtisas/nevler/Harf';
import { Metin } from '@/osmaniKlavye/ihtisas/nevler/Metin';

export type MetinSahasıMuaviniMukavelesi = {
    // metneHarfEkle: (harf: Harf, seçiliKısımBaşı: number, seçiliKısımSonu: number) => Metin;
    metniSil: () => Metin;
    metniKopyala: () => Metin;
    metniTertiple: () => Metin;
    tuşaBasılınca: (
        hadise: KeyboardEvent,
        seçiliKısımBaşı: number,
        seçiliKısımSonu: number
    ) => Promise<[Metin, number]>;
    tuşBırakılınca: (hadise: KeyboardEvent) => void;
    tuşTıklanınca: (harf: Harf, seçiliKısımBaşı: number, seçiliKısımSonu: number) => [Metin, number];
};
