export interface Destino {
  name: string;
  value: number;
  icon: string;
  /** Nome curto usado dentro da casa do tabuleiro. */
  short?: string;
  photo?: string;
}

export const destinos: Destino[] = [
  { name: "Ilhabela (SP)", short: "Ilhabela", value: 1000, icon: "🏝️", photo: "/ilhabela-01.jpg" },
  { name: "Fortaleza (CE)", short: "Fortaleza", value: 3500, icon: "🏖️", photo: "/destinos/fortaleza.jpg" },
  { name: "Angra dos Reis (RJ)", short: "Angra", value: 5000, icon: "🐬", photo: "/destinos/angra.jpg" },
  { name: "Litoral Pernambucano", short: "Litoral PE", value: 6500, icon: "🥥", photo: "/destinos/litoral-pe.jpg" },
  { name: "Bahia — Trancoso e Morro", short: "Bahia", value: 8000, icon: "🌴", photo: "/destinos/bahia.jpg" },
  { name: "Chapada Diamantina (BA)", short: "Chapada", value: 9500, icon: "🏞️", photo: "/destinos/chapada.jpg" },
  { name: "Jalapão (TO)", short: "Jalapão", value: 11000, icon: "🏜️", photo: "/destinos/jalapao.jpg" },
  { name: "Amazônia — Alter do Chão", short: "Amazônia", value: 13000, icon: "🌳", photo: "/destinos/amazonia.jpg" },
  { name: "Transpantaneira (MT)", short: "Pantanal", value: 15000, icon: "🐆", photo: "/destinos/pantanal.jpg" },
  { name: "Jamaica", short: "Jamaica", value: 18000, icon: "🌺", photo: "/destinos/jamaica.jpg" },
  { name: "Atacama (Chile)", short: "Atacama", value: 21000, icon: "🌋", photo: "/destinos/atacama.jpg" },
  { name: "Ushuaia — Patagônia", short: "Ushuaia", value: 24000, icon: "🐧", photo: "/destinos/ushuaia.jpg" },
  { name: "Califórnia (EUA)", short: "Califórnia", value: 30000, icon: "🌉", photo: "/destinos/california.jpg" },
  { name: "Ilhas Gregas", short: "Grécia", value: 36000, icon: "🏛️", photo: "/destinos/grecia.jpg" },
  { name: "Bora Bora (Polinésia)", short: "Bora Bora", value: 45000, icon: "⛵", photo: "/destinos/bora-bora.jpg" },
];
