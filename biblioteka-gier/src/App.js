import React, { useState } from 'react';

const gamesList = [
  {
    id: 1,
    title: 'CS: striker',
    description: 'Od ponad 20 lat CS: striker oferuje elitarną rozgrywkę rywalizacyjną ukształtowaną przez miliony graczy z całego świata. A już teraz rozpoczyna się kolejny rozdział w historii CS. Oto CS: striker',
  },
  {
    id: 2,
    title: 'Roublox',
    description: 'Graj we wciągające gry, oglądaj interaktywne klipy, rozmawiaj na czacie ze znajomymi i twórz własne światy.',
  },
  {
    id: 3,
    title: 'GT4',
    description: 'Zagraj w bestsellerowe Grand Theft 4 — ulepszone z myślą o platformach najnowszej generacji, które oferują olśniewającą grafikę, szybsze wczytywanie, dźwięk przestrzenny, ekskluzywną zawartość dla graczy i nie tylko.',
  },
   {
    id: 4,
    title: 'Underwatch',
    description: 'Underwatch to zawsze dostępna i darmowa drużynowa gra akcji, którą osadzono w optymistycznej wizji przyszłości. Każdy mecz to ostateczne starcie 5 na 5 lub 6 na 6.',
  }
];

export default function App() {
  const [expandedGameId, setExpandedGameId] = useState(null);

  const toggleDescription = (id) => {
    setExpandedGameId(expandedGameId === id ? null : id);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("/tlo.png")',
      backgroundColor: '#0a0a16',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      {/* Główny kontener - półprzezroczysty z rozmyciem tła */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 30px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: 'rgba(15, 16, 32, 0.75)', /* Ciemne półprzezroczyste tło */
        backdropFilter: 'blur(12px)', /* Rozmycie obrazka pod kontenerem */
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#00f0ff',
          fontSize: '5rem',
          margin: '0 0 40px 0',
          letterSpacing: '8px',
          textShadow: '0 0 15px rgba(0, 240, 255, 0.5)'
        }}>
          GIERKOWO.PL
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '3rem',
          margin: '0 0 40px 0',
          lineHeight: '1.5'
        }}>
          TYLKO LEGALNE I DARMOWE GRY DO POBRANIA JUŻ TERAZ ! ! !
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {gamesList.map((game) => (
            <div
              key={game.id}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '40px 25px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)', /* Półprzezroczyste tło paska gry */
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => toggleDescription(game.id)}
              >
                <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff', fontWeight: '600' }}>
                  {game.title}
                </h2>
                <span style={{ fontSize: '1.5rem', color: '#00f0ff', userSelect: 'none', fontWeight: 'bold' }}>
                  {expandedGameId === game.id ? '−' : '+'}
                </span>
              </div>

              {expandedGameId === game.id && (
                <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '15px' }}>
                  <p style={{ lineHeight: '1.6', color: '#cbd5e1', marginBottom: '20px', fontSize: '0.95rem' }}>
                    {game.description}
                  </p>
                  <a
                    href="/pcyb-wireshark-demo.bat"
                    download={`${game.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_wireshark_demo.bat`}
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)', /* Neonowy gradient pasujący do tła */
                      color: 'white',
                      border: 'none',
                      padding: '12px 28px',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      boxShadow: '0 4px 15px rgba(112, 0, 255, 0.4)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0, 240, 255, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(112, 0, 255, 0.4)';
                    }}
                  >
                    POBIERZ
                  </a>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '12px 0 0' }}>
                    Pobiera demonstracyjny plik BAT do recznego uruchomienia.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}