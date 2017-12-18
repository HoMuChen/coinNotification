import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

class Navigator extends React.Component {
	
	render() {
		const { classes } = this.props;

		return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} defaultOpenKeys={['sub1']}>
        <SubMenu key="sub1" title={<div><Icon type="dashboard" /><span>DashBoard</span></div>}>
					<Menu.Item key="/"><Link to='/'>虛擬貨幣</Link></Menu.Item>
					<Menu.Item key="twStock"><Link to='/twStock'>台灣股市</Link></Menu.Item>
				</SubMenu>
        <SubMenu key="sub2" title={<div><Icon type="warning" /><span>示警推播</span></div>}>
					<Menu.Item key="alert"><Link to='/alert'>虛擬貨幣</Link></Menu.Item>
					<Menu.Item key="3" disabled>台灣股市</Menu.Item>
				</SubMenu>
        <SubMenu key="sub3" title={<div><Icon type="area-chart" /><span>分析報表</span></div>}>
					<Menu.Item key="twStockReport"><Link to='/twStockReport'>大戶持股比分析</Link></Menu.Item>
				</SubMenu>
        <Menu.Item key="5" disabled>
          <Icon type="setting" />
          <span>交易紀錄</span>
        </Menu.Item>
      </Menu>
		);
	}
}

Navigator.propTypes = {
}

export default Navigator;
