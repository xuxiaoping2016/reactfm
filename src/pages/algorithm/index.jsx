import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import { Menu, Button } from 'antd'

// import BubbleSort from './bubbleSort'
// import BubbleSort2 from './fdf'
// 参考地址
// JS的十大经典算法
// https://www.cnblogs.com/yinhao-jack/p/10838401.html
const MenuItem = Menu.Item;
const data = [10,1,35,61,89,36,55]
export default class MobxDemo extends Component {
    render(){

        const bubbleSort = (arr) => {
            const len = arr.length
            for (var i = 0; i < len-1; i++) {
                for (var j = 0; j < len - 1 - i; j++) {
                    if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                        var temp = arr[j+1];        //元素交换
                        arr[j+1] = arr[j];
                        arr[j] = temp;
                    } 
                    console.log(`i:${i}`,`j:${j}`,JSON.stringify(arr))
                }
                console.log(`i:${i}`,JSON.stringify(arr))
            }
            return arr
        }
        // 选择排序 假设当前循环的坐标值是最小值，循环寻找最小值，和当前坐标值交换确保本次循环后当前坐标的值是最小的
        function selectionSort(arr) {
            var len = arr.length;
            var minIndex, temp;
            for (var i = 0; i < len - 1; i++) {
                minIndex = i;
                for (var j = i + 1; j < len; j++) {
                    if (arr[j] < arr[minIndex]) {     //寻找最小的数
                        minIndex = j;                 //将最小数的索引保存
                    }
                }
                temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
            console.log(arr)
            return arr;
        }
        // 插入排序
        function insertionSort(arr) {
            var len = arr.length;
            var preIndex, current;
            for (var i = 1; i < len; i++) {
                preIndex = i - 1;
                current = arr[i];
                while(preIndex >= 0 && arr[preIndex] > current) {
                    arr[preIndex+1] = arr[preIndex];
                    preIndex--;
                }
                arr[preIndex+1] = current;
            }
            console.log(arr)
            return arr;
        }

        // 计数排序
        function countingSort(arr, maxValue) {
            var bucket = new Array(maxValue+1),
                sortedIndex = 0;
                arrLen = arr.length,
                bucketLen = maxValue + 1;
        
            for (var i = 0; i < arrLen; i++) {
                if (!bucket[arr[i]]) {
                    bucket[arr[i]] = 0;
                }
                bucket[arr[i]]++;
            }
        
            for (var j = 0; j < bucketLen; j++) {
                while(bucket[j] > 0) {
                    arr[sortedIndex++] = j;
                    bucket[j]--;
                }
            }
        
            return arr;
        }


        const a = {name:"xuxiaoping",value:{}}
        a.value.$mobx = a
        console.log(a)
        return (
            <div>
                <Button onClick={() => bubbleSort(data)}>冒泡排序</Button><br/><br/>
                <Button onClick={() => selectionSort(data)}>选择排序</Button><br/><br/>
                <Button onClick={() => insertionSort(data)}>插入排序</Button><br/><br/>

                <Button onClick={() => insertionSort(countingSort,5)}>计数排序</Button><br/><br/>
                {/* <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <MenuItem key="1"><Link to="/algorithm/bubbleSort">冒泡排序</Link></MenuItem>
                    <MenuItem key="2"><Link to="/algorithm/bubbleSort2">关于@observer的一些说明</Link></MenuItem>
                </Menu>
                
                <Route path="/mobxdemo/bubbleSort" component={BubbleSort}/>
                <Route path="/mobxdemo/bubbleSort2" component={BubbleSort2}/> */}
            </div>
        )
    }
}