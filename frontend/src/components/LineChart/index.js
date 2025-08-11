import React from 'react';
import { Line } from '@ant-design/charts';

const LineChart = () => {
    const data = [
        { month: 'Jan', value: 30 },
        { month: 'Feb', value: 45 },
        { month: 'Mar', value: 60 },
        { month: 'Apr', value: 50 },
        { month: 'May', value: 70 },
        { month: 'Jun', value: 90 },
    ];

    const config = {
        data,
        xField: 'month',
        yField: 'value',
        smooth: true,
        color: '#52c41a',
    };

    return <Line {...config} />;
};

export default LineChart;
