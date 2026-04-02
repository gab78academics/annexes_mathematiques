// const x = BigInt(1234567890123456789); // commentaire temporaire
import { useState } from "react";

const W = 320,
  H = 200,
  cx = 160,
  cy = 120;

function axes(color = "#ccc") {
  return (
    <>
      <line
        x1={20}
        y1={cy}
        x2={W - 20}
        y2={cy}
        stroke={color}
        strokeWidth={1.5}
        markerEnd="url(#arr)"
      />
      <line
        x1={cx}
        y1={H - 10}
        x2={cx}
        y2={10}
        stroke={color}
        strokeWidth={1.5}
        markerEnd="url(#arr)"
      />
    </>
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="arr"
        markerWidth="6"
        markerHeight="6"
        refX="3"
        refY="3"
        orient="auto"
      >
        <path d="M0,0 L6,3 L0,6 Z" fill="#aaa" />
      </marker>
    </defs>
  );
}

// Case 1 : k pair, a_k > 0 → courbe AU DESSUS de la tangente (comme x²)
function CasePairPos() {
  const pts = [];
  for (let px = 30; px <= W - 30; px++) {
    const t = (px - cx) / 60;
    const y = cy - (40 * t + 18 * t * t); // tangente + t² term
    pts.push(`${px},${y}`);
  }
  const tangPts = [];
  for (let px = 30; px <= W - 30; px++) {
    const t = (px - cx) / 60;
    const y = cy - 40 * t;
    tangPts.push(`${px},${y}`);
  }
  return (
    <svg
      width={W}
      height={H}
      style={{
        background: "#fafafa",
        borderRadius: 10,
        border: "1px solid #e0e0e0",
      }}
    >
      <Defs />
      {axes()}
      <polyline
        points={tangPts.join(" ")}
        fill="none"
        stroke="#e07b39"
        strokeWidth={2}
        strokeDasharray="6,3"
      />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#3a5fd9"
        strokeWidth={2.5}
      />
      <circle cx={cx} cy={cy} r={5} fill="#3a5fd9" />
      <text
        x={cx + 6}
        y={cy - 8}
        fontSize={12}
        fill="#3a5fd9"
        fontStyle="italic"
      >
        x₀
      </text>
      <text x={W - 60} y={cy - 50} fontSize={11} fill="#e07b39">
        tangente
      </text>
      <text x={30} y={40} fontSize={11} fill="#3a5fd9">
        courbe
      </text>
      <text x={60} y={H - 8} fontSize={11} fill="#555">
        ⬆ courbe AU-DESSUS des deux côtés
      </text>
    </svg>
  );
}

// Case 2 : k pair, a_k < 0 → courbe EN DESSOUS
function CasePairNeg() {
  const pts = [];
  for (let px = 30; px <= W - 30; px++) {
    const t = (px - cx) / 60;
    const y = cy - (40 * t - 18 * t * t);
    pts.push(`${px},${y}`);
  }
  const tangPts = [];
  for (let px = 30; px <= W - 30; px++) {
    const t = (px - cx) / 60;
    const y = cy - 40 * t;
    tangPts.push(`${px},${y}`);
  }
  return (
    <svg
      width={W}
      height={H}
      style={{
        background: "#fafafa",
        borderRadius: 10,
        border: "1px solid #e0e0e0",
      }}
    >
      <Defs />
      {axes()}
      <polyline
        points={tangPts.join(" ")}
        fill="none"
        stroke="#e07b39"
        strokeWidth={2}
        strokeDasharray="6,3"
      />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#3a5fd9"
        strokeWidth={2.5}
      />
      <circle cx={cx} cy={cy} r={5} fill="#3a5fd9" />
      <text
        x={cx + 6}
        y={cy - 8}
        fontSize={12}
        fill="#3a5fd9"
        fontStyle="italic"
      >
        x₀
      </text>
      <text x={W - 60} y={cy - 50} fontSize={11} fill="#e07b39">
        tangente
      </text>
      <text x={30} y={H - 25} fontSize={11} fill="#3a5fd9">
        courbe
      </text>
      <text x={50} y={H - 8} fontSize={11} fill="#555">
        ⬇ courbe EN-DESSOUS des deux côtés
      </text>
    </svg>
  );
}

// Case 3 : k impair → traverse la tangente
function CaseImpair() {
  const pts = [];
  for (let px = 30; px <= W - 30; px++) {
    const t = (px - cx) / 60;
    const y = cy - (40 * t + 18 * t * t * t);
    pts.push(`${px},${y}`);
  }
  const tangPts = [];
  for (let px = 30; px <= W - 30; px++) {
    const t = (px - cx) / 60;
    const y = cy - 40 * t;
    tangPts.push(`${px},${y}`);
  }
  return (
    <svg
      width={W}
      height={H}
      style={{
        background: "#fafafa",
        borderRadius: 10,
        border: "1px solid #e0e0e0",
      }}
    >
      <Defs />
      {axes()}
      <polyline
        points={tangPts.join(" ")}
        fill="none"
        stroke="#e07b39"
        strokeWidth={2}
        strokeDasharray="6,3"
      />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#3a5fd9"
        strokeWidth={2.5}
      />
      <circle cx={cx} cy={cy} r={5} fill="#3a5fd9" />
      <text
        x={cx + 6}
        y={cy - 8}
        fontSize={12}
        fill="#3a5fd9"
        fontStyle="italic"
      >
        x₀
      </text>
      <text x={W - 70} y={45} fontSize={11} fill="#3a5fd9">
        courbe
      </text>
      <text x={W - 70} y={cy - 30} fontSize={11} fill="#e07b39">
        tangente
      </text>
      <text x={20} y={H - 8} fontSize={11} fill="#555">
        ✕ courbe TRAVERSE la tangente en x₀
      </text>
    </svg>
  );
}

const cases = [
  {
    label: "k pair, aₖ > 0",
    subtitle: "Courbe au-dessus",
    color: "#d4edda",
    border: "#28a745",
    Schema: CasePairPos,
    expl: [
      "f(x) − tangente(x) ∼ aₖ(x−x₀)ᵏ",
      "k pair → (x−x₀)ᵏ > 0 des DEUX côtés",
      "aₖ > 0 → f(x) − tangente > 0",
      "→ la courbe est AU-DESSUS de sa tangente",
      "Exemple : f(x) = x², x₀ = 0, tangente = 0",
    ],
    exemple: "f(x) = x² en x₀ = 0",
  },
  {
    label: "k pair, aₖ < 0",
    subtitle: "Courbe en-dessous",
    color: "#fde8e8",
    border: "#dc3545",
    Schema: CasePairNeg,
    expl: [
      "k pair → (x−x₀)ᵏ > 0 des DEUX côtés",
      "aₖ < 0 → f(x) − tangente < 0",
      "→ la courbe est EN-DESSOUS de sa tangente",
      "Exemple : f(x) = −x², x₀ = 0, tangente = 0",
    ],
    exemple: "f(x) = −x² en x₀ = 0",
  },
  {
    label: "k impair",
    subtitle: "Traverse la tangente",
    color: "#fff3cd",
    border: "#ffc107",
    Schema: CaseImpair,
    expl: [
      "k impair → (x−x₀)ᵏ change de signe en x₀",
      "x < x₀ : (x−x₀)ᵏ < 0",
      "x > x₀ : (x−x₀)ᵏ > 0",
      "→ la courbe TRAVERSE sa tangente : point d'inflexion",
      "Exemple : f(x) = x³, x₀ = 0, tangente = 0",
    ],
    exemple: "f(x) = x³ en x₀ = 0",
  },
];

export default function App() {
  const [active, setActive] = useState(0);
  const cas = cases[active];
  const Schema = cas.Schema;

  return (
    <div
      style={{
        fontFamily: "Georgia,serif",
        maxWidth: 380,
        margin: "0 auto",
        padding: "20px 14px",
        background: "#fdfaf4",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1a1a2e",
          color: "#f0e6c8",
          borderRadius: 12,
          padding: "14px 18px",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: 0.55,
            marginBottom: 5,
          }}
        >
          gab92i
        </div>
        <div style={{ fontSize: 15, fontWeight: "bold", lineHeight: 1.4 }}>
          Position de la courbe par rapport à sa tangente
        </div>
      </div>

      {/* Idée clé */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5ddc8",
          borderRadius: 10,
          padding: "12px 14px",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: "bold",
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#777",
            marginBottom: 8,
          }}
        >
          L'idée clé
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.75, color: "#333" }}>
          La différence <strong>f(x) − tangente(x)</strong> se comporte comme{" "}
          <strong>aₖ(x−x₀)ᵏ</strong> près de x₀.
          <br />
          Tout se ramène donc au signe de ce terme.
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {cases.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              flex: 1,
              padding: "8px 4px",
              fontSize: 11,
              fontWeight: "bold",
              borderRadius: 8,
              border: active === i ? `2px solid ${c.border}` : "1px solid #ddd",
              background: active === i ? c.color : "#fff",
              cursor: "pointer",
              color: "#333",
              transition: "all 0.2s",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Schema */}
      <div style={{ marginBottom: 14 }}>
        <Schema />
      </div>

      {/* Explication */}
      <div
        style={{
          background: cas.color,
          border: `2px solid ${cas.border}`,
          borderRadius: 10,
          padding: "14px 16px",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: 13,
            marginBottom: 10,
            color: "#333",
          }}
        >
          📐 {cas.subtitle}
        </div>
        {cas.expl.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#333",
              paddingLeft: line.startsWith("→") ? 0 : 8,
              fontWeight: line.startsWith("→") ? "bold" : "normal",
            }}
          >
            {line}
          </div>
        ))}
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "#555",
            fontStyle: "italic",
          }}
        >
          Exemple classique : {cas.exemple}
        </div>
      </div>

      {/* Réflexe */}
      <div
        style={{
          background: "#eef2ff",
          borderLeft: "4px solid #3a5fd9",
          borderRadius: "0 8px 8px 0",
          padding: "12px 14px",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            color: "#3a5fd9",
            marginBottom: 4,
            fontSize: 13,
          }}
        >
          ⚡ Réflexe X
        </div>
        <div style={{ color: "#333", lineHeight: 1.75, fontSize: 13 }}>
          Dans un DL, après f(x₀) + f'(x₀)(x−x₀), le{" "}
          <strong>premier terme non nul suivant</strong> d'ordre k détermine
          tout :
          <br />• k pair → <strong>pas de traversée</strong> (extremum ou point
          de rebroussement)
          <br />• k impair → <strong>traversée</strong> (inflexion)
        </div>
      </div>
    </div>
  );
}
