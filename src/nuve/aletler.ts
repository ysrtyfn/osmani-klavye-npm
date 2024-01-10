import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function değiştirMevkidekiHarfi(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

export function ihtivaEdiyorMu(dizi: string[], harf: string) {
    for (var i = 0; i < dizi.length; i++) {
        if (dizi[i] === harf) {
            return true;
        }
    }
    return false;
}

export function kelimeBaşıMı(sonHarf: string) {
    if (
        sonHarf === ' ' ||
        sonHarf === '' ||
        sonHarf === '(' ||
        sonHarf === '\n' ||
        sonHarf === '\r' ||
        sonHarf === '\r\n'
    ) {
        return true;
    }
    return false;
}
