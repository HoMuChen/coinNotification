import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { Row, Col, Tooltip, Icon, Card, Tabs, Spin, Input, Button, AutoComplete } from 'antd';
import { Bar, MiniBar, TimelineChart, ChartCard, Field, yuan } from 'ant-design-pro/lib/Charts';
const TabPane = Tabs.TabPane;
import 'ant-design-pro/dist/ant-design-pro.css';

import KLineChart from '../../components/KLineChart';
import ConfigurableStockReport from '../../components/ConfigurableStockReport';

import {
	changeCompanyInput,
	clearCompanyInput,
	fchStockReports,
	addStockReport,
	deleteStockReport,
	fchPrice,
	fchDispersion,
} from './Actions';

class StockReport extends React.Component {
  componentDidMount() {
		this.props.fchStockReports(this.props.user_id);
  }

	handleInputChange = (value) => {
		this.props.changeCompanyInput(value);
	}

	handleAddStockReport = () => {
		const mockDoc = {
			companyID: this.props.companyIdInput,
		};

		this.props.addStockReport(this.props.user_id, mockDoc);
		this.props.clearCompanyInput();
	}

  render() {
		const { userReports, companies, companyIdInput } = this.props;

		const topColResponsiveProps = {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 6,
			style: { marginBottom: 24 },
		};

		const allCompanyIds = companies.keySeq().toArray();

    return (
			<div>
      	<Row gutter={24}>
					<Col span={24}>
						<Card>
							<Row gutter={24}>
								<Col span={5}>
									<AutoComplete
										ref={(ele) => this.autocomplete=ele}
										dataSource={allCompanyIds}
										placeholder="輸入股票代號"
										value={companyIdInput}
										filterOption={(inputValue, option) => option.props.children.indexOf(inputValue) !== -1 }
										onChange={this.handleInputChange}
									/>
								</Col>
								<Col offset={1} span={5}> 
									<Button onClick={this.handleAddStockReport} type='primary'><Icon type="plus" />新增</Button>
								</Col>
							</Row>
						</Card>
					</Col>
      	</Row>
				{
					userReports
						.valueSeq()
						.toArray()
						.map(report => {
							const id = report.get('id');
							const company_id = report.get('companyID');

							return (
								<ConfigurableStockReport
									id={id}
									report={report}
									deleteStockReport={this.props.deleteStockReport}
									fchPrice={this.props.fchPrice}
									fchDispersion={this.props.fchDispersion}
									stockPrice={this.props.stockPrice.get(company_id)}
									stockDispersion={this.props.stockDispersion.get(company_id)}
								/>
							);
						})
				}
			</div>
    );
  }
}

export default connect(
  state => ({
    user_id: 						state.getIn(['app', 'user', 'id']),
		companies:					state.getIn(['app', 'companies']),
		companyIdInput:			state.getIn(['stockReport', 'companyIdInput']),
    userReports: 				state.getIn(['stockReport', 'userReports']),
    stockPrice: 				state.getIn(['stockReport', 'price']),
    stockDispersion: 		state.getIn(['stockReport', 'dispersion']),
  }),{
		changeCompanyInput,
		clearCompanyInput,
		fchStockReports,
		addStockReport,
		deleteStockReport,
		fchPrice,
		fchDispersion,
  }
)(StockReport);
