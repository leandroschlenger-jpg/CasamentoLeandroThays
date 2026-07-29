"use client";

export interface BoardDestination {
  name: string;
  value: number;
  icon: string;
  /** Nome curto usado dentro da casa do tabuleiro; cai no `name` se ausente. */
  short?: string;
  /** Foto de fundo da casa do destino; sem ela a casa mostra só o ícone. */
  photo?: string;
}

const VB_W = 1200;
const X0 = 70;
const Y0 = 78;

interface Tile {
  dest?: BoardDestination;
  destIndex?: number;
  plainNumber?: number;
}

/**
 * Os primeiros destinos ganham uma casa vazia de intervalo (o começo é mais
 * "caminhada"); da metade para o fim os destinos ficam colados, para o trecho
 * final virar uma sequência de conquistas.
 */
function buildTiles(destinations: BoardDestination[]) {
  const comFolga = Math.ceil(destinations.length * 0.6);
  const tiles: Tile[] = [];
  const destTileIndex: number[] = [];
  let plain = 0;

  destinations.forEach((dest, i) => {
    if (i < comFolga) {
      plain += 1;
      tiles.push({ plainNumber: plain });
    }
    destTileIndex.push(tiles.length);
    tiles.push({ dest, destIndex: i });
  });

  return { tiles, destTileIndex };
}

function layoutFor(totalTiles: number) {
  const cols = totalTiles <= 12 ? 4 : totalTiles <= 30 ? 6 : 8;
  const colStep = (VB_W - 2 * X0) / cols;
  const tileW = Math.round(colStep * 0.95);
  const tileH = Math.round(tileW * 0.66);
  /** Sobra suficiente entre fileiras para a trilha aparecer em volta das casas. */
  const rowStep = tileH + 44;
  const rows = Math.ceil(totalTiles / cols);
  const oceanY = Y0 + (rows - 1) * rowStep + tileH + 52;

  return {
    cols,
    colStep,
    tileW,
    tileH,
    rowStep,
    rows,
    totalTiles,
    oceanY,
    vbH: oceanY + 92,
  };
}

type Layout = ReturnType<typeof layoutFor>;

function tileRect(i: number, L: Layout) {
  const row = Math.floor(i / L.cols);
  const inRow = i % L.cols;
  const col = row % 2 === 0 ? inRow : L.cols - 1 - inRow;
  return { x: X0 + col * L.colStep, y: Y0 + row * L.rowStep };
}

function tileCenter(i: number, L: Layout) {
  const r = tileRect(i, L);
  return { x: r.x + L.tileW / 2, y: r.y + L.tileH / 2 };
}

/** O peão pousa exatamente sobre a casa do destino quando a meta é atingida. */
function amountToTile(
  amount: number,
  destinations: BoardDestination[],
  destTileIndex: number[]
) {
  const anchors = [
    { amount: 0, tile: 0 },
    ...destinations.map((d, i) => ({ amount: d.value, tile: destTileIndex[i] })),
  ];
  const last = anchors[anchors.length - 1];
  if (amount >= last.amount) return last.tile;
  if (amount <= 0) return 0;

  for (let i = 0; i < anchors.length - 1; i++) {
    const from = anchors[i];
    const to = anchors[i + 1];
    if (amount >= from.amount && amount <= to.amount) {
      const p = (amount - from.amount) / (to.amount - from.amount);
      return from.tile + p * (to.tile - from.tile);
    }
  }
  return 0;
}

function pinPoint(t: number, L: Layout) {
  const i = Math.min(Math.floor(t), L.totalTiles - 1);
  const frac = t - i;
  const a = tileCenter(i, L);
  const b = tileCenter(Math.min(i + 1, L.totalTiles - 1), L);
  return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac };
}

function Palm({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.9">
      <path d="M0 0 C -4 -30, -6 -60, -2 -86" stroke="#8B6F47" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M-2 -86 C -26 -104, -46 -100, -56 -88 C -38 -94, -18 -92, -2 -80 Z" fill="#3F7A4A" />
      <path d="M-2 -86 C 20 -106, 42 -102, 52 -90 C 34 -96, 14 -94, -2 -80 Z" fill="#4A8F55" />
      <path d="M-2 -86 C -18 -112, -8 -128, 6 -132 C -2 -118, -2 -102, 0 -84 Z" fill="#3F7A4A" />
      <path d="M-2 -86 C 14 -112, 30 -116, 40 -110 C 24 -108, 8 -100, 0 -84 Z" fill="#55A061" />
      <circle cx="-6" cy="-80" r="5" fill="#8B6F47" />
      <circle cx="4" cy="-76" r="5" fill="#A07C52" />
    </g>
  );
}

function Caricatura({
  quem,
  x,
  y,
  delay,
}: {
  quem: "leandro" | "thays";
  x: number;
  y: number;
  delay: number;
}) {
  const bob = { animation: `caricature-bob 2.6s ease-in-out ${delay}s infinite` };

  if (quem === "leandro") {
    return (
      <g style={{ transform: `translate(${x}px, ${y}px)` }}>
        <g style={bob}>
          <clipPath id="cabeca-leandro">
            <circle cx={0} cy={0} r={19} />
          </clipPath>

          <path d="M -16 16 q 16 11 32 0 l 5 22 h -42 Z" fill="#2E3742" />
          <path d="M -3 18 q 3 7 6 0 l 0 20 h -6 Z" fill="#1F2730" />

          <circle cx={-18} cy={1} r={4} fill="#DFA678" />
          <circle cx={18} cy={1} r={4} fill="#DFA678" />
          <circle cx={0} cy={0} r={19} fill="#EDBB8E" />

          <g clipPath="url(#cabeca-leandro)">
            <ellipse cx={0} cy={17} rx={18} ry={16} fill="#3A2A1F" />
            <ellipse cx={0} cy={4} rx={9.5} ry={3.6} fill="#3A2A1F" />
            <path d="M -19 -5 A 19 19 0 0 1 19 -5 Z" fill="#2F3A44" />
            <path d="M -19 -5 A 19 19 0 0 1 0 -19 L 0 -5 Z" fill="#3A4753" />
          </g>

          <path d="M -19 -5 q 21 10 42 -2 l -2 -6 q -19 8 -40 1 Z" fill="#C79455" />
          <path d="M -4 -12 l 4 -6 l 4 6 z" fill="#D9B45B" />

          <path d="M -11 -3 q 4 -3 8 -1" stroke="#3A2A1F" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 3 -4 q 4 -2 8 1" stroke="#3A2A1F" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx={-7} cy={1} r={2.3} fill="#2B2118" />
          <circle cx={7} cy={1} r={2.3} fill="#2B2118" />
          <path d="M -6 10 q 6 5 12 -1" stroke="#FBF8F2" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      </g>
    );
  }

  return (
    <g style={{ transform: `translate(${x}px, ${y}px)` }}>
      <g style={bob}>
        <clipPath id="cabeca-thays">
          <circle cx={0} cy={0} r={18} />
        </clipPath>

        <g fill="#96602F">
          <circle cx={-17} cy={-7} r={9} />
          <circle cx={17} cy={-7} r={9} />
          <circle cx={-19} cy={4} r={8.5} />
          <circle cx={19} cy={4} r={8.5} />
          <circle cx={-14} cy={14} r={8} />
          <circle cx={14} cy={14} r={8} />
          <circle cx={0} cy={-17} r={10} />
          <circle cx={-10} cy={-14} r={9} />
          <circle cx={10} cy={-14} r={9} />
          <circle cx={-16} cy={23} r={7} />
          <circle cx={16} cy={23} r={7} />
        </g>
        <g fill="#A87038" opacity="0.85">
          <circle cx={-12} cy={-18} r={5} />
          <circle cx={13} cy={-16} r={5} />
          <circle cx={-20} cy={10} r={4.5} />
          <circle cx={20} cy={10} r={4.5} />
        </g>

        <path d="M -15 15 q 15 11 30 0 l 5 23 h -40 Z" fill="#7C7C4F" />
        <path d="M -15 15 q 15 11 30 0 l 2 4 q -17 9 -34 0 Z" fill="#6B6B42" />

        <circle cx={0} cy={0} r={18} fill="#F2C49B" />
        <g clipPath="url(#cabeca-thays)">
          <path d="M -18 -4 A 18 18 0 0 1 18 -4 q -9 7 -17 1 q -8 6 -19 -1 Z" fill="#96602F" />
        </g>

        <path d="M -11 -4 q 4 -2 8 0" stroke="#5E3A1C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M 3 -4 q 4 -2 8 0" stroke="#5E3A1C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx={-7} cy={1} r={2.3} fill="#3A2417" />
        <circle cx={7} cy={1} r={2.3} fill="#3A2417" />
        <circle cx={-11} cy={6} r={3} fill="#E79A85" opacity="0.5" />
        <circle cx={11} cy={6} r={3} fill="#E79A85" opacity="0.5" />
        <path d="M -7 8 q 7 8 14 0 Z" fill="#FBF8F2" stroke="#C0714F" strokeWidth="1.4" />
      </g>
    </g>
  );
}

export function PresentesTabuleiro({
  destinations,
  currentAmount,
  onDestinoClick,
}: {
  destinations: BoardDestination[];
  currentAmount: number;
  /** Recebe o índice do destino quando o convidado clica na casa com foto. */
  onDestinoClick?: (destIndex: number) => void;
}) {
  const { tiles, destTileIndex } = buildTiles(destinations);
  const L = layoutFor(tiles.length);
  const t = amountToTile(currentAmount, destinations, destTileIndex);
  const pin = pinPoint(t, L);
  const currentTile = Math.round(t);
  const points = tiles.map((_, i) => tileCenter(i, L));
  const reachedPoints = [
    ...points.slice(0, Math.floor(t) + 1).map((p) => `${p.x},${p.y}`),
    `${pin.x},${pin.y}`,
  ].join(" ");
  const ultimaCasa = tileRect(tiles.length - 1, L);

  /** Primeiro destino ainda não alcançado — ganha anel pulsante e selo "PRÓXIMO". */
  const proximoDestino = destinations.findIndex((d) => currentAmount < d.value);

  const fonteIcone = Math.round(L.tileH * 0.26);
  const fonteNome = Math.round(L.tileW * 0.105);
  const fonteValor = Math.round(L.tileW * 0.088);
  const fonteNumero = Math.round(L.tileH * 0.34);
  const raio = Math.round(L.tileW * 0.1);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${L.vbH}`}
      className="block h-auto w-full min-w-[760px]"
      role="img"
      aria-label={`Tabuleiro da lua de mel: R$ ${currentAmount.toLocaleString("pt-BR")} arrecadados`}
    >
      <defs>
        <linearGradient id="areia" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBEBC6" />
          <stop offset="100%" stopColor="#EFD5A3" />
        </linearGradient>
        <linearGradient id="mar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4DA6B8" />
          <stop offset="100%" stopColor="#1E7B8C" />
        </linearGradient>
        <clipPath id="peao-pilula">
          <rect x={-52} y={-44} width={104} height={72} rx={34} />
        </clipPath>
        <filter id="sombra-casa" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#5A4A2E" floodOpacity="0.28" />
        </filter>
        <filter id="sombra-peao" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#3B4138" floodOpacity="0.35" />
        </filter>
        <filter id="destino-bloqueado">
          <feColorMatrix type="saturate" values="0.22" />
        </filter>
      </defs>

      <rect width={VB_W} height={L.vbH} fill="url(#areia)" />

      <g opacity="0.85">
        <circle cx={1150} cy={46} r={26} fill="#FFD98A" />
        <circle cx={1150} cy={46} r={38} fill="#FFD98A" opacity="0.25" />
      </g>

      {Array.from({ length: 60 }, (_, i) => {
        const x = ((i * 137) % (VB_W - 40)) + 20;
        const y = ((i * 313) % (L.oceanY - 40)) + 20;
        return <circle key={i} cx={x} cy={y} r={2.5} fill="#D9B978" opacity="0.5" />;
      })}

      <Palm x={40} y={L.oceanY - 6} scale={0.62} />
      <Palm x={1178} y={L.oceanY - 18} scale={0.7} />

      <rect x={0} y={L.oceanY} width={VB_W} height={L.vbH - L.oceanY} fill="url(#mar)" />
      <path
        d={`M0 ${L.oceanY} q 40 -14 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 v 20 H0 Z`}
        fill="#7FC4D1"
        opacity="0.55"
      />
      <path
        d={`M0 ${L.oceanY + 34} q 30 -10 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0`}
        stroke="#BFE4EA"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
      <text x={210} y={L.oceanY + 52} fontSize="40" textAnchor="middle">⛵</text>
      <text x={880} y={L.oceanY + 56} fontSize="34" textAnchor="middle">🏄</text>
      <text x={620} y={L.oceanY + 62} fontSize="26" textAnchor="middle">🐠</text>

      {/* trilha: faixa clara contornando as casas + linha pontilhada no meio */}
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#8B6F47"
        strokeWidth={L.tileH + 32}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.18"
      />
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#FFF6E2"
        strokeWidth={L.tileH + 26}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.92"
      />
      <polyline
        points={reachedPoints}
        fill="none"
        stroke="#A9C0A2"
        strokeWidth={L.tileH + 26}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.55"
        style={{ transition: "all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)" }}
      />
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#E9903F"
        strokeWidth={4}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray="10 12"
        opacity="0.55"
      />

      {tiles.map((tile, i) => {
        const r = tileRect(i, L);
        const reached = i < t || Math.abs(i - t) < 0.001;
        const isCurrent = currentTile === i;
        const dest = tile.dest;

        if (dest) {
          const hasPhoto = Boolean(dest.photo);
          const clicavel = hasPhoto && Boolean(onDestinoClick);
          const proximo = tile.destIndex === proximoDestino;
          const abrir = () => {
            if (clicavel && tile.destIndex !== undefined) {
              onDestinoClick?.(tile.destIndex);
            }
          };

          return (
            <g
              key={i}
              className={clicavel ? "casa-destino" : undefined}
              onClick={clicavel ? abrir : undefined}
              onKeyDown={
                clicavel
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        abrir();
                      }
                    }
                  : undefined
              }
              tabIndex={clicavel ? 0 : undefined}
              role={clicavel ? "button" : undefined}
              aria-label={
                clicavel
                  ? `${dest.name} — meta de R$ ${dest.value.toLocaleString("pt-BR")}${
                      reached ? ", conquistado" : ""
                    }. Ver foto ampliada.`
                  : undefined
              }
              style={clicavel ? { cursor: "pointer" } : undefined}
            >
              <clipPath id={`casa-${i}`}>
                <rect x={r.x} y={r.y} width={L.tileW} height={L.tileH} rx={raio} />
              </clipPath>

              <rect
                x={r.x}
                y={r.y}
                width={L.tileW}
                height={L.tileH}
                rx={raio}
                fill={reached ? "#6E8767" : "#F7F2E6"}
                filter="url(#sombra-casa)"
              />

              {hasPhoto && (
                <g clipPath={`url(#casa-${i})`}>
                  <image
                    href={dest.photo}
                    x={r.x}
                    y={r.y}
                    width={L.tileW}
                    height={L.tileH}
                    preserveAspectRatio="xMidYMid slice"
                    filter={reached ? undefined : "url(#destino-bloqueado)"}
                  />
                  <rect
                    x={r.x}
                    y={r.y}
                    width={L.tileW}
                    height={L.tileH}
                    fill={reached ? "#2C3A28" : "#16212B"}
                    opacity={reached ? 0.34 : 0.52}
                  />
                  <rect
                    x={r.x}
                    y={r.y + L.tileH * 0.42}
                    width={L.tileW}
                    height={L.tileH * 0.58}
                    fill="#101A12"
                    opacity="0.34"
                  />
                </g>
              )}

              <rect
                x={r.x}
                y={r.y}
                width={L.tileW}
                height={L.tileH}
                rx={raio}
                fill="none"
                stroke={reached ? "#DCE8D8" : "#FFF6E2"}
                strokeWidth={2}
                opacity="0.75"
              />

              {proximo && (
                <rect
                  className="anel-proximo"
                  x={r.x - 5}
                  y={r.y - 5}
                  width={L.tileW + 10}
                  height={L.tileH + 10}
                  rx={raio + 5}
                  fill="none"
                  stroke="#E9A13F"
                  strokeWidth={4}
                />
              )}

              <rect
                className="anel-foco"
                x={r.x - 8}
                y={r.y - 8}
                width={L.tileW + 16}
                height={L.tileH + 16}
                rx={raio + 8}
                fill="none"
                stroke="#1E7B8C"
                strokeWidth={4}
              />

              <text
                x={r.x + L.tileW / 2}
                y={r.y + L.tileH * 0.33}
                fontSize={fonteIcone}
                textAnchor="middle"
              >
                {dest.icon}
              </text>
              <text
                x={r.x + L.tileW / 2}
                y={r.y + L.tileH * 0.6}
                fontSize={fonteNome}
                fontWeight="bold"
                textAnchor="middle"
                fill={hasPhoto || reached ? "#FFFFFF" : "#3B4138"}
                style={hasPhoto ? { textShadow: "0 1px 4px rgba(0,0,0,0.65)" } : undefined}
              >
                {dest.short ?? dest.name}
              </text>
              <text
                x={r.x + L.tileW / 2}
                y={r.y + L.tileH * 0.82}
                fontSize={fonteValor}
                fontWeight="bold"
                textAnchor="middle"
                fill={hasPhoto || reached ? "#F1F7EE" : "#6E8767"}
                style={hasPhoto ? { textShadow: "0 1px 4px rgba(0,0,0,0.7)" } : undefined}
              >
                R$ {dest.value.toLocaleString("pt-BR")}
              </text>

              {reached && (
                <g>
                  <circle cx={r.x + L.tileW - 20} cy={r.y + 20} r={13} fill="#6E8767" />
                  <path
                    d={`M ${r.x + L.tileW - 26} ${r.y + 20} l 4 5 l 8 -9`}
                    stroke="#FFFFFF"
                    strokeWidth="2.6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}

              {proximo && (
                <g>
                  <rect
                    x={r.x + 8}
                    y={r.y + 8}
                    width={72}
                    height={20}
                    rx={10}
                    fill="#E9A13F"
                  />
                  <text
                    x={r.x + 44}
                    y={r.y + 22}
                    fontSize="11"
                    fontWeight="bold"
                    letterSpacing="1"
                    textAnchor="middle"
                    fill="#3B2A10"
                  >
                    PRÓXIMO
                  </text>
                </g>
              )}
            </g>
          );
        }

        return (
          <g key={i}>
            <rect
              x={r.x}
              y={r.y}
              width={L.tileW}
              height={L.tileH}
              rx={raio}
              fill={reached ? "#C4D4BE" : "#FFFDF7"}
              stroke={isCurrent ? "#E9A13F" : reached ? "#9BB394" : "#EFD9AE"}
              strokeWidth={isCurrent ? 5 : 2.5}
              filter="url(#sombra-casa)"
            />
            <text
              x={r.x + L.tileW / 2}
              y={r.y + L.tileH / 2 + fonteNumero / 3}
              fontSize={fonteNumero}
              fontWeight="bold"
              textAnchor="middle"
              fill={reached ? "#4F6349" : "#D7A55B"}
            >
              {tile.plainNumber}
            </text>
          </g>
        );
      })}

      <text x={X0} y={Y0 - 22} fontSize="22" fontWeight="bold" fill="#3B4138">
        START 🥥
      </text>
      <text
        x={ultimaCasa.x + L.tileW / 2}
        y={ultimaCasa.y + L.tileH + 32}
        fontSize="22"
        fontWeight="bold"
        textAnchor="middle"
        fill="#3B4138"
      >
        FINISH 🎉
      </text>

      <g
        filter="url(#sombra-peao)"
        style={{
          transform: `translate(${pin.x}px, ${pin.y}px)`,
          transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <ellipse cx={0} cy={46} rx={44} ry={9} fill="#3B4138" opacity="0.2" />
        <path d="M0 46 L -13 24 L 13 24 Z" fill="#FBF8F2" stroke="#6E8767" strokeWidth="3" />
        <rect
          x={-52}
          y={-44}
          width={104}
          height={72}
          rx={34}
          fill="#FBF8F2"
          stroke="#6E8767"
          strokeWidth="3"
        />
        <g clipPath="url(#peao-pilula)">
          <Caricatura quem="leandro" x={-23} y={-6} delay={0} />
          <Caricatura quem="thays" x={23} y={-6} delay={0.8} />
        </g>
      </g>
    </svg>
  );
}
