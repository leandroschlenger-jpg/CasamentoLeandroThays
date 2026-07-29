import { destinos, type Destino } from "./destinos";

export interface Photo {
  src: string;
  alt: string;
}

const coupleFileNames = Array.from({ length: 35 }, (_, i) =>
  String(i + 1).padStart(3, "0")
);

export const couplePhotos: Photo[] = coupleFileNames.map((n) => ({
  src: `/${n}.jpg`,
  alt: "Leandro e Thays",
}));

export const ilhabelaPhotos: Photo[] = [
  { src: "/ilhabela-01.jpg", alt: "Praia de Castelhanos" },
  { src: "/ilhabela-02.jpg", alt: "Praia do Curral" },
  { src: "/ilhabela-03.jpg", alt: "Praia do Indaiaúba" },
];

export const maritacasPhotos: Photo[] = [
  { src: "/maritacas-01.jpg", alt: "Casa Maritacas - Vista" },
  { src: "/maritacas-02.jpg", alt: "Casa Maritacas - Ambiente" },
  { src: "/maritacas-03.jpg", alt: "Casa Maritacas - Espaço" },
];

export const destinoPhotos: Photo[] = destinos
  .filter((d): d is Destino & { photo: string } => Boolean(d.photo))
  .map((d) => ({ src: d.photo, alt: d.name }));

export const allPhotos: Photo[] = [
  ...couplePhotos,
  ...ilhabelaPhotos,
  ...maritacasPhotos,
  ...destinoPhotos,
];

export const ilhabelaStartIndex = couplePhotos.length;
export const maritacasStartIndex = couplePhotos.length + ilhabelaPhotos.length;
export const destinoStartIndex =
  couplePhotos.length + ilhabelaPhotos.length + maritacasPhotos.length;

/** Posição da foto de cada destino dentro de `allPhotos`, para abrir o lightbox. */
export const destinoPhotoIndex: (number | null)[] = (() => {
  let n = 0;
  return destinos.map((d) => (d.photo ? destinoStartIndex + n++ : null));
})();
