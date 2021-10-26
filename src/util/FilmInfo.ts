import {Filmmaker} from "./FilmmakerInfo";

export type FilmInfo = {
    title: string;
    description: string;
    creator: Filmmaker;
    previewPath: string;
    url: URL;
    release: Date;
    credits: Record<number, CreditLine[]>;
}

export type CreditLine  = {
    name: string;
    role: string;
}
