import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { Row, Col, Tooltip, Icon, Card, Tabs, Spin } from 'antd';
import { Bar, MiniBar, TimelineChart, ChartCard, Field, yuan } from 'ant-design-pro/lib/Charts';
const TabPane = Tabs.TabPane;
import 'ant-design-pro/dist/ant-design-pro.css';

import KLineChart from '../../components/KLineChart';

import {
	fchTaiex,
	fchLegalFoundation,
} from './Actions';

class StockDashboard extends React.Component {
  componentDidMount() {
		this.props.fchTaiex(100);
		this.props.fchLegalFoundation('1');
		this.props.fchLegalFoundation('2');
		this.props.fchLegalFoundation('3');
		this.props.fchLegalFoundation('4');
  }

  render() {
		const { legalFoundation, taiex } = this.props;

		const topColResponsiveProps = {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 6,
			style: { marginBottom: 24 },
		};

		const Trend = ({flag}) => (
			flag == 'up'
				? <Icon type="caret-up" style={{color: 'red', marginTop: 2}} />
				: <Icon type="caret-down" style={{color: 'green', marginTop: 2}} />
		)

		const TopCard = ({ name, data }) => {
			const lastedDiff = data.size == 0
				? 0
				: data.last().get('diff')
			const avgDiff = data.size == 0
				? 0
				: data.toJS().map(row => row.diff).reduce((a, b) => a+b, 0)
			const diff = data.map((row, i) => ({x: row.get('date'), y: row.get('diff')})).toJS()

			const today = data.size == 0
				? "??"
				: data.last().get('date')

			return (
		 		<ChartCard
		 			title={`${name} (百萬)`}
					action={<span>{today}</span>}
		 			total={numeral(lastedDiff/1000000).format('0,0')}
		 			footer={<Field label="近一月總買賣超" value={numeral(avgDiff/1000000).format('0,0')} />}
		 			contentHeight={100}
		 		>
					<div style={{ marginBottom: 30 }}>
						<MiniBar
							height={50}
							data={diff}
						/>
					</div>
		 		</ChartCard>
			);
		}

    return (
			<div>
      	<Row gutter={24}>
     			<Col {...topColResponsiveProps}>
						<TopCard name='外資' data={legalFoundation.get('1')}/>
     			</Col>
     			<Col {...topColResponsiveProps}>
						<TopCard name='投信' data={legalFoundation.get('2')}/>
     			</Col>
     			<Col {...topColResponsiveProps}>
						<TopCard name='自營商(自行買賣)' data={legalFoundation.get('3')}/>
     			</Col>
     			<Col {...topColResponsiveProps}>
						<TopCard name='自營商(避險)' data={legalFoundation.get('4')}/>
     			</Col>
      	</Row>
				<Row gutter={24}>
					<Col span={24}>
						<Card title="台股大盤加權指數">
							<KLineChart data={taiex.toJS()}/>
						</Card>
					</Col>
				</Row>
			</div>
    );
  }
}

export default connect(
  state => ({
    user_id: 						state.getIn(['app', 'user', 'id']),
		taiex:							state.getIn(['stock', 'taiex']),
		legalFoundation: 		state.getIn(['stock', 'legalFoundation']),
  }),
  {
		fchTaiex,
		fchLegalFoundation,
  }
)(StockDashboard);
