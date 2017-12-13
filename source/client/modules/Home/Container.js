import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { Row, Col, Tooltip, Icon, Card, Tabs } from 'antd';
import { Bar, TimelineChart, ChartCard, Field, yuan } from 'ant-design-pro/lib/Charts';
const TabPane = Tabs.TabPane;
import 'ant-design-pro/dist/ant-design-pro.css';

import PriceChart from '../../components/PriceChart';

import {
	fchPrice,
  selectCoin,
} from './Actions';

class Home extends React.Component {
  componentDidMount() {
		this.props.fchPrice('bit');
		this.props.fchPrice('eth');
		this.props.fchPrice('ltc');
  }

	handleSelectCoin = (key) => {
		this.props.selectCoin(key);
	}

  render() {
		const { priceChangePercentage, priceAvg, priceData, selectedCoin } = this.props;

		const topColResponsiveProps = {
			xs: 24,
			sm: 12,
			md: 8,
			lg: 8,
			xl: 8,
			style: { marginBottom: 24 },
		};

		const Trend = ({flag}) => (
			flag == 'up'
				? <Icon type="caret-up" style={{color: 'red', marginTop: 2}} />
				: <Icon type="caret-down" style={{color: 'green', marginTop: 2}} />
		)

    return (
			<div>
      	<Row gutter={24}>
        	<Col {...topColResponsiveProps}>
						<ChartCard
							title="比特幣"
							total={yuan(priceData.getIn(['bit', 0, 'price']))}
							footer={<Field label="日均價" value={numeral(priceAvg.get('bit')).format('0,0')} />}
							contentHeight={46}
						>
							近24小時漲跌幅
							<span style={{marginLeft: 7, marginRight: 7}}>
								{ `${priceChangePercentage.get('bit')}%` }
							</span>
							<Trend flag={priceChangePercentage.get('bit')>0? 'up': 'down'}/>
						</ChartCard>
        	</Col>
        	<Col {...topColResponsiveProps}>
						<ChartCard
							title="以太幣"
							total={yuan(priceData.getIn(['eth', 0, 'price']))}
							footer={<Field label="日均價" value={numeral(priceAvg.get('eth')).format('0,0')} />}
							contentHeight={46}
						>
							近24小時漲跌幅
							<span style={{marginLeft: 7, marginRight: 7}}>
								{ `${priceChangePercentage.get('eth')}%` }
							</span>
							<Trend flag={priceChangePercentage.get('eth')>0? 'up': 'down'}/>
						</ChartCard>
        	</Col>
        	<Col {...topColResponsiveProps}>
						<ChartCard
							title="萊特幣"
							total={yuan(priceData.getIn(['ltc', 0, 'price']))}
							footer={<Field label="日均價" value={numeral(priceAvg.get('ltc')).format('0,0')} />}
							contentHeight={46}
						>
							近24小時漲跌幅
							<span style={{marginLeft: 7, marginRight: 7}}>
								{ `${priceChangePercentage.get('ltc')}%` }
							</span>
							<Trend flag={priceChangePercentage.get('ltc')>0? 'up': 'down'}/>
						</ChartCard>
        	</Col>
      	</Row>
				<Row>
        	<Col span={24}>
						<Tabs defaultActiveKey='bit' onChange={this.handleSelectCoin}>
							<TabPane tab="比特幣" key="bit"><PriceChart priceData={priceData} selectedCoin='bit'/></TabPane>
							<TabPane tab="以太幣" key="eth"><PriceChart priceData={priceData} selectedCoin='eth'/></TabPane>
							<TabPane tab="萊特幣" key="ltc"><PriceChart priceData={priceData} selectedCoin='ltc'/></TabPane>
						</Tabs>
        	</Col>
				</Row>
			</div>
    );
  }
}

export default connect(
  state => ({
    user_id: state.getIn(['app', 'user', 'id']),
    priceData: state.getIn(['home', 'priceData']),
		priceChangePercentage: state.getIn(['home', 'priceChangePercentage']),
    priceAvg: state.getIn(['home', 'priceAvg']),
		selectedCoin: state.getIn(['home', 'selectedCoin']),
  }),
  {
		fchPrice,
		selectCoin,
  }
)(Home);
