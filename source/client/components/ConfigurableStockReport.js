import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Col, Card, Popconfirm } from 'antd';

import KLineChart from './KLineChart';
import ChipsBarChart from './ChipsBarChart';

class ConfigurableStockReport extends React.Component {

	componentDidMount() {
		const id = this.props.report.get('companyID');

		this.props.fchPrice(id);
		this.props.fchDispersion(id);
	}

	handleDeleteReport = () => {
		const id = this.props.id;

		this.props.deleteStockReport(id);
	}
	
	render() {
		const { report, stockPrice, stockDispersion } = this.props;

		if(!stockPrice || !stockDispersion) {
			return (
				<Row style={{ marginTop: 24 }} key={this.props.id}>
					<Card title={report.get('companyID')} extra={deleteIcon} loading={true}>
					</Card>
				</Row>
			);
		}

		const priceMin = Math.min(...stockPrice.toJS().map(row => row['lowest_price']))
		const dispersionPercentageMin = Math.min(...stockDispersion.toJS().map(row => row['percentage']))

		const deleteIcon = (
			<Popconfirm title='確定要刪除?' onConfirm={this.handleDeleteReport} okText="確定" cancelText="取消">
				<a><Icon type='close' /></a>
			</Popconfirm>
		)

		return (
			<Row style={{ marginTop: 24 }} key={this.props.id}>
				<Card title={report.get('companyID')} extra={deleteIcon}>
					<KLineChart
						data={stockPrice.toJS()}
						min={priceMin}
						height={300}
					/>
					<ChipsBarChart
						data={stockDispersion.toJS()}
						min={dispersionPercentageMin}
						height={200}
					/>
				</Card>
			</Row>
		);
	}
}

ConfigurableStockReport.propTypes = {
	id:									PropTypes.string.isRequired,
	report:							PropTypes.object.isRequired,
	stockPrice:					PropTypes.object.isRequired,
	stockDispersion:		PropTypes.object.isRequired,
	deleteStockReport:	PropTypes.func.isRequired,
	fchPrice:						PropTypes.func.isRequired,
	fchDsipersion:			PropTypes.func.isRequired,
}

export default ConfigurableStockReport;
