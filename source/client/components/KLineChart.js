import React from 'react';
import PropTypes from 'prop-types';
import G2 from 'g2';

class KLineChart extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.chart = null;
		this.chartId = G2.Util.guid('chart-')
	}

	componentDidMount() {
		this.initChart(this.props);
	}

	componentWillUnmount() {
		this.chart.destroy();
		this.chart = null;
		this.chartId = null;
	}

	componentWillReceiveProps(nextProps) {
		this.chart.changeData(this.transform(nextProps.data))
		this.chart.repaint();
	}

	initChart(props) {
		const { data, min, height } = props;

		const chart = new G2.Chart({
			id: this.chartId,
			height: height || 600,
			forceFit: true
		});

		chart.source(this.transform(data), {
			'date': {
				type: 'timeCat',
				mask: 'yyyy-mm-dd',
				alias: '日期'
			},
			'diff': {
				alias: '價差'
			},
			'ocRange': {
				alias: '價格',
				min: min || 0,
			},
			'lhRange': {
				min: min || 0,
			}
		});

		chart.legend('diff', false);
		chart.axis('lhRange', {
			title: null,
			line: null,
			label: null,
		});

		chart.interval().position('date*ocRange').color('diff', (diff) => diff<0? '#1bbd19': '#fa513a');
		chart.interval().position('date*lhRange').size(2).color('diff', (diff) => diff<0? '#1bbd19': '#fa513a');

		this.chart = chart.render();

	}

	transform(data) {
		return data.map(row => {
			const newRow = {};

			newRow['date'] = row['date'];
			newRow['ocRange'] = [row['opening_price'], row['closing_price']];
			newRow['lhRange'] = [row['lowest_price'], row['highest_price']];
			newRow['diff'] = row['closing_price'] - row['opening_price'];

			return newRow;
		})
	}
	
	render() {
		return (
			<div id={this.chartId} style={{ width: '100%' }}>
			</div>
		);
	}
}

KLineChart.propTypes = {
	data:				PropTypes.array.isRequired,
	min:				PropTypes.number,
	height:			PropTypes.number,
}

export default KLineChart;
