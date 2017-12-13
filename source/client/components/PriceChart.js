import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { TimelineChart } from 'ant-design-pro/lib/Charts';

class PriceChart extends React.Component {
	
	render() {
		const { priceData, selectedCoin } = this.props;

		const coinCName = selectedCoin == 'bit'
			? '比特幣'
			: selectedCoin == 'eth'
				? '以太幣'
				: selectedCoin == 'ltc'
					? '萊特幣'
					: '??????'
		
		return (
			<Card style={{ paddingBottom: 30 }}>
      	<TimelineChart
					margin={[60, 20, 40, 80]}
      		height={400}
      		titleMap={{ y1: coinCName}}
      		data={priceData.get(selectedCoin).toJS().map(p => {p['x']=p['time']; p['y1']=p['price']; return p;})}
      	/>
			</Card>
		);
	}
}

Navigator.propTypes = {
	priceData:				PropTypes.object.isRequired,
	selectedCoin:			PropTypes.string.isRequired,
}

export default PriceChart;
