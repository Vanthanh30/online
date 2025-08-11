import './dashboard.scss'
import { Row, Col, Card } from 'antd';
import BarChart from '../../../components/BarChart/index'
import LineChart from '../../../components/LineChart/index'
import PieChart from '../../../components/PieChart/index'
function Dashboard() {
    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card title="Sales by Year">
                    <BarChart />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Monthly Revenue">
                    <LineChart />
                </Card>
            </Col>
            <Col span={24}>
                <Card title="Category Distribution">
                    <PieChart />
                </Card>
            </Col>
        </Row>
    );
}
export default Dashboard;