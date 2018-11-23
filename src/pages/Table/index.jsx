import React, {Component } from 'react';
import Table1 from './table.jsx'
import Table2 from './table2.jsx'
import Table3 from './table3.jsx'
import Expandable from './expandable.jsx'
import CellMerge from './cellMerge.jsx'
import TreeData from './treeData.jsx'
import FixedColRow from './fixedColRow.jsx'
import ColumnGroup from './columnGroup.jsx'
import './index.scss'

export default class TableList extends Component {
    render(){
        return (
            <div className="table-demo-wrap">
                {/* <Table1/> */}
                {/* <Table2 /> */}
                {/* <Table3/> */}
                {/* <Expandable/> */}
                {/* <CellMerge/>
                <TreeData /> */}
                {/* <FixedColRow/> */}
                <ColumnGroup />
            </div>
        );
    }
}