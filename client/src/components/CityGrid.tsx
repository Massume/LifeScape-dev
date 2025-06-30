'use client';
import './CityGrid.css';

export default function CityGrid() {
  const cells = [];
  for (let i = 0; i < 25; i++) cells.push(<div key={i} className="cell" />);
  return <div className="grid">{cells}</div>;
}
