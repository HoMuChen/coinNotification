import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
`

const Checkbox = styled.input`
	display: none;
`

const Slider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	border-radius: 34px;
	-webkit-transition: .4s;
	transition: .4s;
`

const SliderBtn = styled.span`
	position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
	border-radius: 50%;
  -webkit-transition: .4s;
  transition: .4s;
`

const SliderChecked = styled(Slider)`
	background-color: #00bcd4;
`

const SliderBtnChecked = styled(SliderBtn)`
	transform: translateX(26px);
`

class Switch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: props.defaultValue
		}
	}

	componentWillReceiveProps() {
	}

	handleChange = (e) => {
		this.props.onChange(e.target.checked);
		this.setState({ isChecked: e.target.checked });
	}

	render() {
		const btn = () => {
			return (
				<div>
					{ this.state.isChecked
						? <SliderChecked />
						: <Slider />
					}
					{ this.state.isChecked
						? <SliderBtnChecked />
						: <SliderBtn />
					}
				</div>
			)
		}

		return (
			<Label>
				<Checkbox type='checkbox' onChange={this.handleChange}/>
				{ btn() }
			</Label>
		);
	}
}

Switch.propTypes = {
	defaultValue:  PropTypes.bool.isRequired,
	onChange:      PropTypes.func.isRequired,
}

export default Switch;
