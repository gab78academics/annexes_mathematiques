// const x = BigInt(1234567890123456789); // commentaire temporaire
import { useState } from "react";

function factorial(n) {
  let r = 1n;
  for (let i = 2n; i <= BigInt(n); i++) r *= i;
  return Number(r);
}

function stirling(n) {
  return Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n);
}

function stirlingLog(n) {
  // log(n!) ≈ n*log(n) - n + 0.5*log(2πn)
  return 0.5 * Math.log(2 * Math.PI * n) + n * Math.log(n) - n;
}

const nValues = [1, 2, 5, 10, 20, 50, 100];

const sections = ["Intuition", "Formule", "Erreur", "Logarithme"];

export default function App() {
  const [tab, setTab] = useState(0);
  const [n, setN] = useState(10);

  const fact = n <= 20 ? factorial(n) : null;
  const stir = stirling(n);
  const ratio = fact ? (fact / stir) : null;
  const errPct = ratio ? ((ratio - 1) * 100).toFixed(3) : null;

  return (
    <div style={{ fontFamily: "Georgia, serif", maxWidth: 400, margin: "0 auto", padding: "20px 14px", background: "#fdfaf4", minHeight: "100vh", color: "#1a1a1a" }}>

      {/* Header */}
      <div style={{ background: "#1a1a2e", color: "#f0e6c8", borderRadius: 12, padding: "14px 18px", marginBottom: 18 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", opacity: 0.55, marginBottom: 5 }}>gab92i</div>
        <div style={{ fontSize: 18, fontWeight: "bold" }}>Formule de Stirling</div>
        <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>Comprendre n! quand n est grand</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        {sections.map((s, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: "7px 12px", fontSize: 12, fontWeight: "bold",
            borderRadius: 8, border: tab === i ? "2px solid #3a5fd9" : "1px solid #ddd",
            background: tab === i ? "#eef2ff" : "#fff", cursor: "pointer", color: "#333"
          }}>{s}</button>
        ))}
      </div>

      {/* INTUITION */}
      {tab === 0 && (
        <div>
          <div style={{ background: "#fff", border: "1px solid #e5ddc8", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontWeight: "bold", fontSize: 13, color: "#777", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Le problème</div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              n! = 1 × 2 × 3 × ⋯ × n croît <strong>extrêmement vite</strong>.<br />
              Calculer 100! exactement ? Impossible à la main.<br />
              On veut un <strong>équivalent simple</strong>.
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5ddc8", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontWeight: "bold", fontSize: 13, color: "#777", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>L'idée : passer au logarithme</div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              ln(n!) = ln 1 + ln 2 + ⋯ + ln n = <strong>somme de Riemann</strong> de ln !<br /><br />
              On approche cette somme par l'intégrale :
            </div>
            <div style={{ background: "#f0f4ff", borderRadius: 8, padding: "10px 12px", marginTop: 10, textAlign: "center", fontSize: 15 }}>
              ∫₁ⁿ ln(t) dt = n·ln(n) − n + 1 ≈ n·ln(n) − n
            </div>
            <div style={{ fontSize: 13, color: "#666", marginTop: 8, lineHeight: 1.7 }}>
              Donc ln(n!) ≈ n·ln(n) − n, soit en exponentialisant :<br />
              n! ≈ nⁿ · e⁻ⁿ
            </div>
          </div>

          <div style={{ background: "#fff3cd", border: "2px solid #ffc107", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontWeight: "bold", fontSize: 13, marginBottom: 6 }}>⚠️ Mais ce n'est pas assez précis</div>
            <div style={{ fontSize: 14, lineHeight: 1.75 }}>
              La somme de Riemann a une erreur. Une analyse plus fine (formule d'Euler-Maclaurin) donne le facteur correctif <strong>√(2πn)</strong>. C'est le terme le moins intuitif — voir onglet "Formule".
            </div>
          </div>
        </div>
      )}

      {/* FORMULE */}
      {tab === 1 && (
        <div>
          <div style={{ background: "#1a1a2e", color: "#f0e6c8", borderRadius: 10, padding: "16px 18px", marginBottom: 14, textAlign: "center" }}>
            <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>LA FORMULE DE STIRLING</div>
            <div style={{ fontSize: 22, fontWeight: "bold", letterSpacing: 1 }}>n! ~ √(2πn) · (n/e)ⁿ</div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>quand n → +∞</div>
          </div>

          {["√(2πn)", "(n/e)ⁿ"].map((term, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e5ddc8", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
              <div style={{ fontWeight: "bold", fontSize: 15, color: "#3a5fd9", marginBottom: 8 }}>{term}</div>
              <div style={{ fontSize: 14, lineHeight: 1.8, color: "#333" }}>
                {i === 0 ? (
                  <>
                    Terme correctif issu de la <strong>formule d'Euler-Maclaurin</strong>.<br />
                    Il vient de l'intégrale gaussienne ∫e^(-t²)dt = √π.<br />
                    Croît comme √n — lentement comparé à (n/e)ⁿ.<br />
                    <span style={{ color: "#888", fontSize: 12 }}>C'est lui qui "répare" l'approximation de Riemann.</span>
                  </>
                ) : (
                  <>
                    Vient de ln(n!) ≈ n·ln(n) − n.<br />
                    En exponentialisant : e^(n·ln n − n) = nⁿ · e^(−n) = <strong>(n/e)ⁿ</strong>.<br />
                    C'est le terme <strong>dominant</strong> — il explose beaucoup plus vite que √n.
                  </>
                )}
              </div>
            </div>
          ))}

          <div style={{ background: "#eef2ff", borderLeft: "4px solid #3a5fd9", borderRadius: "0 8px 8px 0", padding: "12px 14px" }}>
            <div style={{ fontWeight: "bold", color: "#3a5fd9", fontSize: 13, marginBottom: 6 }}>Forme logarithmique (souvent plus utile)</div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              ln(n!) = n·ln(n) − n + ½·ln(2πn) + o(1)<br /><br />
              ou plus grossièrement :<br />
              <strong>ln(n!) ~ n·ln(n) − n</strong>
            </div>
          </div>
        </div>
      )}

      {/* ERREUR */}
      {tab === 2 && (
        <div>
          <div style={{ background: "#fff", border: "1px solid #e5ddc8", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontWeight: "bold", fontSize: 13, color: "#777", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Calculatrice interactive</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
              {nValues.map(v => (
                <button key={v} onClick={() => setN(v)} style={{
                  padding: "6px 12px", fontSize: 13, borderRadius: 6,
                  border: n === v ? "2px solid #3a5fd9" : "1px solid #ccc",
                  background: n === v ? "#eef2ff" : "#fff", cursor: "pointer"
                }}>n={v}</button>
              ))}
            </div>

            <div style={{ background: "#f8f8f8", borderRadius: 8, padding: "12px 14px" }}>
              {fact && (
                <div style={{ marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: "#666" }}>n! exact :</span><br />
                  <strong>{fact.toExponential(4)}</strong>
                </div>
              )}
              <div style={{ marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: "#666" }}>Stirling :</span><br />
                <strong>{stir.toExponential(4)}</strong>
              </div>
              {ratio && (
                <div style={{ marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: "#666" }}>Ratio n!/Stirling :</span><br />
                  <strong>{ratio.toFixed(6)}</strong>
                </div>
              )}
              {errPct && (
                <div style={{ background: Math.abs(parseFloat(errPct)) < 1 ? "#d4edda" : "#fde8e8", borderRadius: 6, padding: "8px 10px", fontSize: 13 }}>
                  Erreur relative : <strong>{errPct}%</strong>
                </div>
              )}
              {n > 20 && (
                <div style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
                  (n! exact non calculé — trop grand pour JavaScript)
                </div>
              )}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5ddc8", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontWeight: "bold", fontSize: 13, color: "#777", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Ce qu'on observe</div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              Dès n = 10, l'erreur est inférieure à <strong>1%</strong>.<br />
              À n = 100, inférieure à <strong>0.1%</strong>.<br /><br />
              La convergence est en <strong>O(1/n)</strong> — plus n est grand, meilleure est l'approximation.<br /><br />
              C'est pourquoi Stirling est <strong>inutilisable pour n petit</strong> mais <strong>redoutable pour n grand</strong>.
            </div>
          </div>
        </div>
      )}

      {/* LOGARITHME */}
      {tab === 3 && (
        <div>
          <div style={{ background: "#fff", border: "1px solid #e5ddc8", borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontWeight: "bold", fontSize: 13, color: "#777", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Pourquoi la forme log est cruciale en prépa</div>
            <div style={{ fontSize: 14, lineHeight: 1.8 }}>
              En pratique, on calcule rarement n! directement. On calcule plutôt <strong>ln(n!)</strong> ou on compare des suites/intégrales.
            </div>
          </div>

          {[
            {
              titre: "Utilisation typique 1 — Limite de suite",
              ex: "lim (n!)^(1/n) / n = ?",
              sol: "ln((n!)^(1/n)/n) = (1/n)·ln(n!) − ln(n)\n≈ (1/n)·(n·ln n − n) − ln n\n= ln n − 1 − ln n = −1\nDonc la suite tend vers e⁻¹ = 1/e"
            },
            {
              titre: "Utilisation typique 2 — Coefficient binomial",
              ex: "Équivalent de C(2n,n)",
              sol: "ln C(2n,n) = ln(2n)! − 2·ln(n!)\n≈ (2n·ln 2n − 2n) − 2(n·ln n − n)\n= 2n·ln 2 + ½·ln(πn) + o(1)\nDonc C(2n,n) ~ 4ⁿ/√(πn)"
            }
          ].map((item, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e5ddc8", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
              <div style={{ fontWeight: "bold", fontSize: 13, color: "#3a5fd9", marginBottom: 8 }}>{item.titre}</div>
              <div style={{ background: "#f0f4ff", borderRadius: 6, padding: "8px 10px", fontSize: 13, marginBottom: 8, fontStyle: "italic" }}>{item.ex}</div>
              <div style={{ fontSize: 13, lineHeight: 1.85, color: "#333", whiteSpace: "pre-line", fontFamily: "monospace" }}>{item.sol}</div>
            </div>
          ))}

          <div style={{ background: "#eef2ff", borderLeft: "4px solid #3a5fd9", borderRadius: "0 8px 8px 0", padding: "12px 14px" }}>
            <div style={{ fontWeight: "bold", color: "#3a5fd9", fontSize: 13, marginBottom: 6 }}>⚡ Réflexe X</div>
            <div style={{ fontSize: 13, lineHeight: 1.8 }}>
              Dès que tu vois <strong>n!</strong> dans une suite ou une intégrale → passer au <strong>logarithme</strong> et appliquer Stirling sous forme log. Ne jamais utiliser la formule directe si on peut l'éviter.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}