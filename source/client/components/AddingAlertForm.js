import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Form, Input, Radio, Select, Icon, InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const AddingAlertForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="新增示警"
        okText="新增"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="幣別">
            {getFieldDecorator('coin', {
              rules: [{ required: true, message: '請選擇一種虛擬貨幣!' }],
            })(
              <Select>
								<Option value="bit">比特幣</Option>
								<Option value="eth">以太幣</Option>
								<Option value="ltc">萊特幣</Option>
							</Select>
            )}
          </FormItem>
          <FormItem label="趨勢">
            {getFieldDecorator('trending', {
              initialValue: 'up',
            })(
              <Radio.Group>
                <Radio value="up">Up<Icon type="caret-up" style={{color: 'red', marginLeft: 5}} /></Radio>
                <Radio value="down">Down<Icon type="caret-down" style={{color: 'green', marginLeft: 5}}/></Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="門檻">
            {getFieldDecorator('threshold', {
							rules: [{ required: true, message: '請選擇一種虛擬貨幣!',type: 'number' }],
            })(
							<InputNumber min={0} style={{minWidth: 100}} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

AddingAlertForm.propTypes = {
	visible:			PropTypes.bool.isRequired,
	onCancel:			PropTypes.func.isRequired,
	onCreate:			PropTypes.func.isRequired,
}

export default AddingAlertForm;
