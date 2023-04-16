import React, {useEffect, useState} from 'react';
import {ColumnsProps} from "../../components/Table/Types";
import Table from "../../components/Table"
import {DateRecord} from "./types";
import {Button, Form, Input, InputNumber, Radio, Switch} from "antd";
import {useReactive} from "ahooks";

const TableDemo = () => {
  const [list, setList] = useState<DateRecord[]>([])
  
  const state = useReactive({
    bordered: false,
    textAlign: 'left' as any,
    tableScroll: '50vh',
    maxData: 200,
  });
  
  useEffect(() => {
    const arr: DateRecord[] = Array(state.maxData).fill(0).map((_, index) => ({
      id: Date.now() + index,
      name: '张三',
      index: index + 1,
      address: `New York No. ${index + 1} Lake Park`,
      random: Math.random() * state.maxData,
    }))
    setList(arr)
  }, [state.maxData]);
  
  const columns: ColumnsProps<DateRecord>[] = [
    {
      title: '序号',
      key: 'index',
      width: 100,
      align: state.textAlign,
      render: record => (
        <span>{record?.index}</span>
      )
    },
    {
      title: '名称',
      key: 'name',
      width: 200,
      align: state.textAlign,
      render: record => (
        <span>{record?.name}</span>
      )
    },
    {
      title: '地址',
      key: 'address',
      align: state.textAlign,
      render: record => (
        <span>{record?.address}</span>
      )
    },
    {
      title: '随机数',
      key: 'random',
      align: state.textAlign,
      render: record => (
        <span>{`随机数：${record?.random}`}</span>
      )
    },
  ];
  
  return (
    <>
      <Form
        layout="inline"
        style={{ margin: 16 }}
      >
        <Form.Item label="Bordered">
          <Switch
            checked={state.bordered}
            onChange={(value) => {
              state.bordered = value
            }}
          />
        </Form.Item>
        <Form.Item label="Text Align">
          <Radio.Group value={state.textAlign} onChange={(value) => {
            state.textAlign = value.target.value;
          }}>
            <Radio.Button value={'left'}>Left</Radio.Button>
            <Radio.Button value="center">Center</Radio.Button>
            <Radio.Button value="right">Right</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="TableScroll">
          <Input value={state.tableScroll} onChange={e => {
            state.tableScroll = e.target.value;
          }} />
        </Form.Item>
        <Form.Item label="MaxData">
          <InputNumber value={state.maxData} onChange={value => {
            state.maxData = value || 0;
          }} />
        </Form.Item>
      </Form>
      <Table<DateRecord>
        bordered={state.bordered}
        rowKey="id"
        columns={columns}
        dataSource={list}
        scroll={{ y: state.tableScroll }}
      />
      
      <div style={{
        position: "fixed",
        top: '20px',
        right: '20px',
      }}>
        <Button onClick={() => {
          window.location.href = '/'
        }}>Home</Button>
      </div>
    </>
  );
}

export default TableDemo;