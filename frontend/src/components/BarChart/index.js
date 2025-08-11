import React from 'react';
import { Bar } from '@ant-design/charts';

const BarChart = () => {
    const data = [
        { year: '2018', value: 30 },
        { year: '2019', value: 50 },
        { year: '2020', value: 80 },
        { year: '2021', value: 60 },
        { year: '2022', value: 90 },
    ];

    const config = {
        data,
        xField: 'value',
        yField: 'year',
        seriesField: 'year',
        color: '#1890ff',
        legend: false,
    };

    return <Bar {...config} />;
};

export default BarChart;
