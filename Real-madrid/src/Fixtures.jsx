import React from 'react';
import './Fixtures.css';

const fixtures = [
  {
    id: 1,
    homeTeam: 'Real Madrid',
    homeLogo: '/images/realmadrid.png',
    awayTeam: 'Al Hilal',
    awayLogo: '/images/alhilal.png',
    matchday: 'Matchday 1',
    tournament: 'FIFA Club World Cup',
    date: 'Wednesday, Jun 18, 9:00 PM',
    location: 'Hard Rock Stadium'
  },
  {
    id: 2,
    homeTeam: 'Real Madrid',
    homeLogo: '/images/realmadrid.png',
    awayTeam: 'Pachuca',
    awayLogo: '/images/pachuca.png',
    matchday: 'Matchday 2',
    tournament: 'FIFA Club World Cup',
    date: 'Sunday, Jun 22, 9:00 PM',
    location: 'Bank of America Stadium'
  },
  {
    id: 3,
    homeTeam: 'Salzburg',
    homeLogo: '/images/salzburg.png',
    awayTeam: 'Real Madrid',
    awayLogo: '/images/realmadrid.png',
    matchday: 'Matchday 3',
    tournament: 'FIFA Club World Cup',
    date: 'Friday, Jun 27, 3:00 AM',
    location: 'Lincoln Financial Field'
  }
];

const Fixtures = () => {
  return (
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
  );
};

export default Fixtures;
