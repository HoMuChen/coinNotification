import React from 'react';
import PropTypes from 'prop-types';
import G2 from 'g2';

class ChipsBarChart extends React.Component {
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
		this.chart.changeData(nextProps.data)
		this.chart.repaint();
	}

	initChart(props) {
		const { data, height, min } = props;

		const chart = new G2.Chart({
			id: this.chartId,
			height: height || 600,
			forceFit: true
		});

		chart.source(data, {
			'date': {
				type: 'timeCat',
				mask: 'yyyy-mm-dd',
				alias: '日期'
			},
			'percentage': {
				alias: '千張大戶持股比',
				min: min-5
			},
		});

		//chart.legend('diff', false);
		//chart.axis('lhRange', {
		//	title: null,
		//	line: null,
		//	label: null,
		//});

		chart.interval().position('date*percentage').size(20);

		this.chart = chart.render();

	}

	render() {
		return (
			<div id={this.chartId} style={{ width: '100%' }}>
			</div>
		);
	}
}

ChipsBarChart.propTypes = {
	data:				PropTypes.array.isRequired,
	min:				PropTypes.number,
	height:			PropTypes.number,
}

export default ChipsBarChart;
