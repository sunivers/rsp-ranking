import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RankingPage() {
  const [ranking, setRanking] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/api/rsp/ranking');
      console.log('ranking', res.data.rank);
      setRanking(res.data.rank);
    }
    fetchData();
  }, []);
  
  const mapToComponent = ranking.map((rank, i) => {
    return (<li key={i}>{rank.name} | {rank.point}</li>);
  });
  return (
    <ul>
      {mapToComponent}
    </ul>
  );
}

export default RankingPage;
