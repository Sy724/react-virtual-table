## my-virtual-table

项目是使用 Vite + React + TS 搭建的虚拟列表项目。

Demo：http://116.62.27.184/table/

### 列表特点：
- 使用 grid 布局
- 虚拟列表
- 列表滚动高度自适应
- 列宽自适应
- columns 中 render 根据 key 默认渲染（todo）
- 分页（todo）
- 动态获取数据（todo）
- 筛选（todo）

### 参数

#### Table

| 参数               | 是否必须  | 说明                             |
|:-----------------|:------|:-------------------------------|
| rowKey           | true  | 表格行 key 的取值，可以是字符串或一个函数        |
| columns          | true  | 表格列的配置描述，具体项见下表                |
| dataSource       | false | 表格填充数据，与 serverDataSource 选填一个 |
| serverDataSource | false | 获取列表数据的接口调用，与 dataSource 选填一个  |
| scroll           | true  | 格式见使用方式，设置列表的需要开始滚动的视图高度       |
| borderd          | false | 列表边框                           |


#### columns

| 参数   | 是否必须 | 说明                                                             |
| :----- | :------- | :--------------------------------------------------------------- |
| title  | false    | 列名                                                             |
| key    | true     | 列的 key，不可重复                                               |
| width  | false    | 列宽度，没有时会自动适应，如果是 0 则会隐藏该列                  |
| align  | false    | 单元格文本对齐方式，默认为 left（可选参数：left、center、right） |
| fixed  | false    | 单元格是否锁定，默认为 false（可选参数：left、right）            |
| render | false    | 单元格渲染方式，不传则渲染空                                     |

### 使用方式：

```js
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
```

```jsx
<Table<DateRecord>
  bordered={state.bordered}
  rowKey="id"
  columns={columns}
  dataSource={list}
  scroll={{ y: state.tableScroll }}
  />
```
