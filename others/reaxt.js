import React, { useState, useEffect, useCallback } from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Form, Input, Button, Layout, Table, Modal, message } from 'antd';
import { BasicWhiteLayout, BasicBgLayout } from 'saas-fe-kraken-core-react';
import { BreadcrumbWrapper, ToolBar, FooterPagination, BatchUploaderBtn } from '@/components';
import CreateDishesModal from './createModal';
import useTable from '@/hooks/useTable';
import { IDishes } from '../interface'
// import ImportModal from './importModal';

const FormItem = Form.Item;
const { Search } = Input;
const { Content } = Layout;
const DishesConfig = props => {
    const {
        form: { getFieldDecorator },
        dishesManageStore: { batchDelete, getFilterParam, setFilterParam,
            getDishesList, addDishes, updateDishes, queryDishesDetail },
    } = props;
  
    const [selectedRowKeys, setRowKeys] = useState([]); // table选择项key值——主要用于table选择显示
    const [createVisible, setCreateVisible] = useState(false);
    const [dishesId, setDishesId] = useState(0)

    const table = useTable<IDishes>({
        ...getFilterParam(),
        pageSizeDefault: 10,
        fn: getDishesList,
        key:"dishesList",
        cacheFilterParam: true,
        cacheStoreFn: setFilterParam,
        cacheWhenNavigateUrl: [/\/business\/groupDishes\/\/list/]
    });

    const columns = [
        {
            title: '菜品名称',
            dataIndex: 'dishesName',
        },
        {
            title: '售价（元/50g）',
            dataIndex: 'buyPrice',
            render : text => '￥'+text
        },
        {
            title: '操作',
            dataIndex: 'operate',
            render: (text, record) => (
                <>
                    <a className="m-r-md" onClick={() => handleCreate(record.dishesId)}>
                        编辑
                    </a>
                    <a onClick={() => handleDelete(record.dishesId)}>删除</a>
                </>
            ),
        },
    ];
   
    // table选择、不选时调用
    const handleSelectChange = rowKeys => {
        setRowKeys(rowKeys);
    };
    // table选中展示
    const rowSelection = {
        selectedRowKeys,
        onChange: handleSelectChange,
    };
    // 创建菜品
    
    const handleCreate = (dishesId?: number) => {
        setCreateVisible(true);
        setDishesId(dishesId)
    };

    // 关闭modal
    const handleCloseModal = () => {
        setCreateVisible(false);
    };
    
    // 删除、批量删除
    const handleDelete = useCallback((id) => {
        let ids = id ? [id] : selectedRowKeys;
        Modal.confirm({
            title: '提示',
            content: '确定删除么？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                var res = await batchDelete(ids)
                console.log(selectedRowKeys,selectedRowKeys.length)
                if(res.errcode == 0){
                    // table.refreshTable();
                    if(id){
                        // let index = selectedRowKeys.indexOf(id);
                        // console.log(selectedRowKeys, id)
                        // index != -1 && selectedRowKeys.splice(index,1);
                    }else{
                        // handleSelectChange([])
                    }
                }else{
                    message.warning(res.errmsg)
                }
            }
        });
    },[]);

    return (
        <div className="m-b-60">
            <BasicWhiteLayout>
                <BreadcrumbWrapper />
                <BasicBgLayout>
                    <div className="notice m-b-10">
                        注：一个设备仅可绑定一个菜品，若线下一个设备放多个菜品，可在创建菜品时将多个菜品名称写在一个菜品中。
                    </div>
                    <ToolBar>
                        <Form layout="inline">
                            <FormItem>
                                {getFieldDecorator('dishesName', {
                                    initialValue: '',
                                })(
                                    <Search
                                        placeholder="请输入菜品名称"
                                        onSearch={table.handleSearch}
                                        enterButton={<Button>搜索</Button>}
                                        style={{ width: '250px' }}
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button className="w-90" onClick={() => handleCreate(0)}>
                                    新建菜品
                                </Button>
                                <CreateDishesModal
                                    addDishes ={addDishes}
                                    updateDishes={updateDishes}
                                    queryDishesDetail={ queryDishesDetail}
                                    visible={createVisible}
                                    dishesId= {dishesId}
                                    closeModal={handleCloseModal}
                                />
                            </FormItem>
                            <FormItem>
                                <BatchUploaderBtn
                                    btnTitle="批量导入菜品"
                                    title="批量导入菜品"
                                    url="gateway/groupDishes/v1.0/business/goods/import"
                                    templateKey='StoreImportTemplate'
                                />
                            </FormItem>
                            <FormItem>
                                <Button className="w-90" disabled={!selectedRowKeys.length} onClick={() => handleDelete(0)}>
                                    批量删除
                                </Button>
                            </FormItem>
                        </Form>
                    </ToolBar>
                    <Content>
                        <Table
                            rowKey="dishesId"
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={table.list}
                            pagination={false}
                            loading={table.loading}
                            scroll-y={true}
                        />
                    </Content>
                </BasicBgLayout>
                <FooterPagination {...table.paginationConfig} />
            </BasicWhiteLayout>
        </div>
    );
};
export default inject('dishesManageStore')(observer(Form.create()(DishesConfig)));
