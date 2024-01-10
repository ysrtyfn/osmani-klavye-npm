export type KaretNevi = {
    başMevki: number;
    sonMevki: number;
};

export function alKaretİlkHalini(): KaretNevi {
    return { başMevki: 0, sonMevki: 0 };
}
