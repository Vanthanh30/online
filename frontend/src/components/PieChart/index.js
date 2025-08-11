import React from 'react';
import { Pie } from '@ant-design/charts';

const PieChart = () => {
    const data = [
        { type: 'Electronics', value: 27 },
        { type: 'Fashion', value: 25 },
        { type: 'Home', value: 18 },
        { type: 'Books', value: 15 },
        { type: 'Others', value: 15 },
    ];

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [{ type: 'element-active' }],
    };

    return <Pie {...config} />;
};

export default PieChart;
