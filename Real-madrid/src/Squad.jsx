import React, { useRef } from 'react';
import './Squad.css';
import courtois from './assets/courtois.jpg';
import lunin from './assets/lunin.jpg';
import carvajal from './assets/carvajal.jpg';
import militao from './assets/militao.jpg';
import alaba from './assets/alaba.jpg';
import vallejo from './assets/vallejo.jpg';
import fran from './assets/fran.jpg';
import rudiger from './assets/rudiger.jpg';
import mendy from './assets/mendy.jpg';
import bellingham from './assets/bellingham.jpg';
import camavinga from './assets/camavinga.jpg';
import valverde from './assets/valverde.jpg';
import modric from './assets/modric.jpg';
import tchouameni from './assets/tchouameni.jpg';
import guler from './assets/guler.jpg';
import ceballos from './assets/ceballos.jpg';
import vini from './assets/vini.jpg';
import mbappe from './assets/mbappe.jpg';
import rodrygo from './assets/rodrygo.jpg';
import endrick from './assets/endrick.jpg';
import brahim from './assets/brahim.jpg';
import xabi from './assets/xabi.jpg';

const goalkeepers = [
  { number: 1, name: 'Courtois', position: 'Goalkeeper', image: courtois },
  { number: 13, name: 'Lunin', position: 'Goalkeeper', image: lunin }
];

const defenders = [
  { number: 2, name: 'Carvajal', position: 'Defender', image: carvajal },
  { number: 3, name: 'E. Militão', position: 'Defender', image: militao },
  { number: 4, name: 'Alaba', position: 'Defender', image: alaba },
  { number: 18, name: 'Vallejo', position: 'Defender', image: vallejo },
  { number: 20, name: 'Fran García', position: 'Defender', image: fran },
  { number: 22, name: 'Rüdiger', position: 'Defender', image: rudiger },
  { number: 23, name: 'F. Mendy', position: 'Defender', image: mendy },
];

const midfielders = [
  { number: 5, name: 'Bellingham', position: 'Midfielder', image: bellingham },
  { number: 6, name: 'Camavinga', position: 'Midfielder', image: camavinga },
  { number: 8, name: 'Valverde', position: 'Midfielder', image: valverde },
  { number: 10, name: 'Modrić', position: 'Midfielder', image: modric },
  { number: 14, name: 'Tchouaméni', position: 'Midfielder', image: tchouameni },
  { number: 15, name: 'Arda Güler', position: 'Midfielder', image: guler },
  { number: 19, name: 'D. Ceballos', position: 'Midfielder', image: ceballos },
];

const forwards = [
  { number: 7, name: 'Vinícius Jr.', position: 'Forward', image: vini },
  { number: 9, name: 'Mbappé', position: 'Forward', image: mbappe },
  { number: 11, name: 'Rodrygo', position: 'Forward', image: rodrygo },
  { number: 16, name: 'Endrick', position: 'Forward', image: endrick },
  { number: 21, name: 'Brahim', position: 'Forward', image: brahim },
];

const coaches = [
  { number: '', name: 'Xabi Alonso', position: 'Coach', image: xabi },
];

function SquadRow({ title, players }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const visibleCount = 4;
  const total = players.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, total - visibleCount));
  };

  React.useEffect(() => {
    const { current } = scrollRef;
    if (!current) return;
    const cardWidth = current.querySelector('.squad-card')?.offsetWidth || 230;
    const gap = 16; // 1rem gap
    current.scrollTo({
      left: (cardWidth + gap) * currentIndex,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  // Hide arrows for goalkeepers and coaches
  const hideArrows = title === "Goalkeeper" || title === "Coach";

  return (
    <div className="squad-section">
      <h2 className="squad-title">{title}</h2>
      <div className="squad-wrapper">
        {!hideArrows && (
          <button
            className="squad-arrow left"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            &lt;
          </button>
        )}
        <div className="squad-scroll" ref={scrollRef}>
          {players.map((player, idx) => (
            <div className="squad-card" key={player.name + idx}>
              <img src={player.image} alt={player.name} className="squad-image" />
              <div className="squad-info">
                {player.number && <span className="squad-number">{player.number}</span>}
                <span className="squad-name">{player.name}</span>
                <span className="squad-position">{player.position}</span>
              </div>
            </div>
          ))}
        </div>
        {!hideArrows && (
          <button
            className="squad-arrow right"
            onClick={handleNext}
            disabled={currentIndex >= total - visibleCount}
            aria-label="Next"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

function Squad() {
  return (
    <div>
      <h1 className="squad-main-heading">Squad</h1>
      <SquadRow title="Goalkeeper" players={goalkeepers} />
      <SquadRow title="Defender" players={defenders} />
      <SquadRow title="Midfielder" players={midfielders} />
      <SquadRow title="Forward" players={forwards} />
      <SquadRow title="Coach" players={coaches} />
    </div>
  );
}

export default Squad;
