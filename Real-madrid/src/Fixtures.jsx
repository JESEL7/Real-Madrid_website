import React from 'react';
import './Fixtures.css';
import realMadridLogo from './assets/real-madrid-logo.png';
import alhilalLogo from './assets/al-hilal.png'; 
import pachukaLogo from './assets/pachuka.png'; 
import salzburgLogo from './assets/salzburg.png';


const fixtures = [
  {
    id: 1,
    homeTeam: 'Real Madrid',
    homeLogo: realMadridLogo, // use the imported variable
    awayTeam: 'Al Hilal',
    awayLogo: alhilalLogo, 
    matchday: 'Matchday 1',
    tournament: 'FIFA Club World Cup',
    date: 'Wednesday, Jun 18, 9:00 PM',
    location: 'Hard Rock Stadium'
  },
  {
    id: 2,
    homeTeam: 'Real Madrid',
    homeLogo: realMadridLogo, // use the imported variable for consistency
    awayTeam: 'Pachuca',
    awayLogo: pachukaLogo, 
    matchday: 'Matchday 2',
    tournament: 'FIFA Club World Cup',
    date: 'Sunday, Jun 22, 9:00 PM',
    location: 'Bank of America Stadium'
  },
  {
    id: 3,
    homeTeam: 'Salzburg',
    homeLogo: salzburgLogo,
    awayTeam: 'Real Madrid',
    awayLogo: realMadridLogo, // use the imported variable for away logo
    matchday: 'Matchday 3',
    tournament: 'FIFA Club World Cup',
    date: 'Friday, Jun 27, 3:00 AM',
    location: 'Lincoln Financial Field'
  }
];

const Fixtures = () => {
  return (
    <section id="fixtures">
    <div className="fixtures-section">
      {fixtures.map((fixture) => (
        <div className="fixture-card" key={fixture.id}>
          <div className="fixture-top">
            <div className="team">
              <img src={fixture.homeLogo} alt={fixture.homeTeam} />
              <p>{fixture.homeTeam}</p>
            </div>
            <div className="team">
              <img src={fixture.awayLogo} alt={fixture.awayTeam} />
              <p>{fixture.awayTeam}</p>
            </div>
          </div>
          <div className="fixture-bottom">
            <p className="category">Football · First Team · Male</p>
            <h3>{fixture.tournament}</h3>
            <p className="matchday">{fixture.matchday}</p>
            <p className="date">📅 {fixture.date} h</p>
            <p className="location">📍 {fixture.location}</p>
          </div>
        </div>
      ))}
    </div>
    </section>
  );
};

export default Fixtures;
