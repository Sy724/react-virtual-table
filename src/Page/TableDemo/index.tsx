import React, {useEffect, useState} from 'react';
import {ColumnsProps} from "../../components/Table/Types";
import Table from "../../components/Table";
import {DateRecord} from "./types";

const TableDemo = () => {
  const [list, setList] = useState<DateRecord[]>([])
  
  useEffect(() => {
    const arr: DateRecord[] = Array(100).fill(0).map((_, index) => ({
      id: Date.now() + index,
      name: '张三',
      age: index + 1,
    }))
    setList(arr)
  }, []);
  
  const columns: ColumnsProps<DateRecord>[] = [
    {
      title: '名称',
      key: 'name',
      width: '100px',
      align: 'left',
      render: record => (
        <span>{record?.name}</span>
      )
    },
    {
      title: '年龄',
      key: 'age',
      width: '80px',
      align: 'right',
      render: record => (
        <span>{record?.age}</span>
      )
    }
  ];
  
  return (
    <Table<DateRecord>
      rowKey="id"
      columns={columns}
      dataSource={list}
      scroll={{ y: '50vh' }}
    />
  );
}

export default TableDemo;