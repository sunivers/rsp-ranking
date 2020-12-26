import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Space } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';

function RankingPage() {
  const [ranking, setRanking] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/api/rsp/ranking');
      setRanking(res.data.rank);
    }
    fetchData();
  }, []);
  
  const columns = [
    {
      title: 'RANK',
      dataIndex: 'rank',
      key: 'rank',
      render: (text, record) => {
        const icon = text === 1 ? <TrophyOutlined /> : '';
        return (
          <Space size="middle">
            <span>{record.rank}</span>
            {icon}
          </Space>
        )
      },
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'POINT',
      dataIndex: 'point',
      key: 'point',
    },
  ];
  
  const data = ranking.map((r, i) => ({ ...r, rank: i + 1, key: i + 1 }));

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  );
}

export default RankingPage;
