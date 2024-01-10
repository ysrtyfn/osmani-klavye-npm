import { MetniTertipleVazifesi } from './MetniTertipleVazifesi';
import { Metin } from '@/osmaniKlavye/ihtisas/nevler/Metin';

export const MetniKopyalaVazifesi = (mevcutMetin: Metin): Metin => {
    const tertipliMetin = MetniTertipleVazifesi(mevcutMetin);

    navigator.clipboard.writeText(tertipliMetin).then(
        () => {
            // toast.success('Kopyalandı.');
            console.log('Kopyalandı.');
        },
        () => {
            // toast.error('Kopyalanamadı!');
            console.log('Kopyalanamadı.');
        }
    );

    return tertipliMetin;
};
