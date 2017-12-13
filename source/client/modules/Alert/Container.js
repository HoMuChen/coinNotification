import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Row, Col, Card, Table, Button, Icon, Switch } from 'antd';
import AddingAlertForm from '../../components/AddingAlertForm';

import { checkIsSubscribed, addUserSubscription, removeUserSubscription, fchAlerts, deleteAlert, tglAddingAlert, addAlert } from './Actions';

class Alert extends React.Component{
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.checkIsSubscribed(this.props.user.get('id'));
		this.props.fchAlerts(this.props.user.get('id'));
	}

	handleSubscriptionChange = (checked) => {
		checked
		?	this.props.addUserSubscription(this.props.user.get('id'))
		:	this.props.removeUserSubscription(this.props.user.get('id'))
	}

	handleDeleteAlert = (id) => () => {
		this.props.deleteAlert(id);
	}

	handleAddingAlert = () => {
    this.form.validateFields((err, values) => {
      if (err) {
				return;
			}else {
				this.props.addAlert(this.props.user.get('id'), values);
				this.form.resetFields();
				this.props.tglAddingAlert();
			}
		})
	}

	render() {
		const { alerts, isSubscribed } = this.props;

		const SubscriptionSwitch = (
			<div>
				<span style={{ marginRight: 10, fontSize: 16, fontWeight: 400 }}>訂閱推播</span>
				<Switch checked={isSubscribed} onChange={this.handleSubscriptionChange} />
			</div>
		)

		const cols = [
			{
				title: '幣別',
				dataIndex: 'coin',
				key: 'coin',
				render: (text, record, index) => (
					text == 'bit'
						? '比特幣'
						: text == 'eth'
							? '以太幣'
							: '萊特幣'
				)
			},
			{ 
				title: '趨勢',
				dataIndex: 'trending',
				key: 'trending',
				render: (text, record, index) => (
					text == 'up'
						? <Icon type="caret-up" style={{color: 'red'}} />
						: <Icon type="caret-down" style={{color: 'green'}} />
				)
			},
			{
				title: '門檻',
				dataIndex: 'threshold',
				key: 'threshold',
				sorter: (a, b) => a.threshold-b.threshold,
				defaultSortOrder: 'descend'
			},
			{
				title: '刪除',
				key: 'delete', 
				render: (text, record, index) => (
					<Button onClick={this.handleDeleteAlert(record.id)}><Icon type="delete" /></Button>
				)
			}
		]

		const alertsData = alerts.valueSeq().toJS()
			.map(a => {
				a['key'] = a['id']
				return a;
			})

		return (
			<Card title="示警條件設定" extra={SubscriptionSwitch}>
				<Button type='primary' style={{ marginBottom: 24  }} onClick={this.props.tglAddingAlert}><Icon type='plus' />新增</Button>
				<Table dataSource={alertsData} columns={cols}/>
				<AddingAlertForm
					ref={(form => this.form = form)}
					visible={this.props.isAddingAlert}
					onCancel={this.props.tglAddingAlert}
					onCreate={this.handleAddingAlert}
				/>
			</Card>
		);
	}
}

export default connect(
	(state, props) => ({
		user:						state.getIn(['app', 'user']),
		alerts:					state.getIn(['alert', 'alerts']),
		isSubscribed:		state.getIn(['alert', 'isSubscribed']),
		isAddingAlert:	state.getIn(['alert', 'isAddingAlert']),
	}),{
		fchAlerts,
		deleteAlert,
		addAlert,
		tglAddingAlert,
		checkIsSubscribed,
		removeUserSubscription,
		addUserSubscription,
	}
)(Alert)
