import { ihtivaEdiyorMu, değiştirMevkidekiHarfi } from '@/osmaniKlavye/nuve/aletler';
import { Metin } from '@/osmaniKlavye/ihtisas/nevler/Metin';

export const MetniTertipleVazifesi = (mevcutMetin: Metin): Metin => {
    let tertipliMetin = mevcutMetin;

    for (let i = 0; i < mevcutMetin.length; i++) {
        if (mevcutMetin.charAt(i) === 'ي') {
            if (i + 1 === mevcutMetin.length) {
                tertipliMetin = değiştirMevkidekiHarfi(tertipliMetin, i, 'ى');
            } else if (mevcutMetin.charAt(i + 1) === '.') {
                tertipliMetin = değiştirMevkidekiHarfi(tertipliMetin, i, 'ى');
            } else if (mevcutMetin.charAt(i + 1) === '،') {
                tertipliMetin = değiştirMevkidekiHarfi(tertipliMetin, i, 'ى');
            } else if (mevcutMetin.charAt(i + 1) === ')') {
                tertipliMetin = değiştirMevkidekiHarfi(tertipliMetin, i, 'ى');
            } else if (mevcutMetin.charAt(i + 1) === '\u200C') {
                tertipliMetin = değiştirMevkidekiHarfi(tertipliMetin, i, 'ى');
            } else if (mevcutMetin.charAt(i + 1) === ' ') {
                tertipliMetin = değiştirMevkidekiHarfi(tertipliMetin, i, 'ى');
            }
        } else if (mevcutMetin.charAt(i) === 'ى' && i + 1 !== mevcutMetin.length) {
            let tedkikHarfleri = ['.', '،', ')', '\u200C', ' '];
            if (!ihtivaEdiyorMu(tedkikHarfleri, mevcutMetin.charAt(i + 1))) {
                tertipliMetin = değiştirMevkidekiHarfi(tertipliMetin, i, 'ي');
            }
        }
    }

    return tertipliMetin; // en dıştaki metin burada kullanılabilir, bu hali de makbul
};
