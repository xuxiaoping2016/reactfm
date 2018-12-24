import { observable, computed, action } from 'mobx';
import $ from 'jquery'
import {request} from 'utils/request'
import { message } from 'antd';
class AppStore {
    @observable todos = []; //todos列表
    @observable newtodo = ""; //新添加的todo
    @observable selectedRowKeys = []; //选择行的key
    @observable loading = false; //Table-loading
    @observable _key = 0; //key
    @observable total = 0; //数据量

    @action async fetchTodos(){
        this.loading = true;
        const res = await request({
            url:"http://localhost/api/todos"
        })
        const data = res.data;
        this.total = res.count;
        this._key = data.length===0 ? 0: data[data.length-1].key;
        this.todos = data;
        this.loading = false;
    }

    @action fetchTodoAdd(){
        const that = this;
        $.ajax({
            url:"/abc",
            method:"GET",
            success:(data) => {
                var data = JSON.parse(data)
                if(data.status){
                    that.total += 1;
                    that.todos.push({
                        key: that._key,
                        todo: that.newtodo,
                    });
                    message.success('添加成功！');
                }else{
                    that._key -= 1;
                    message.error('添加失败！');
                }
            }
        })
    }
    

    @action fetchTodoRemove(keyArr){
        const that = this;
        $.ajax({
            url:"http://localhost/api/todos/remove",
            method:"GET",
            success:(data) => {
                var data = JSON.parse(data)
                if(data.status){
                    if(keyArr.length > 1) {
                        that.todos = that.todos.filter(item => that.selectedRowKeys.indexOf(item.key) === -1);
                        that.selectedRowKeys = [];
                    }else{
                        that.todos = that.todos.filter(item => item.key !== keyArr[0]);
                    }
                    that.total -= keyArr.length;
                    message.success('删除成功！');
                }else{
                    message.error('删除失败！');
                }
            }
        })
    }

    //添加
    @action AddTodo = () => {
        this._key += 1;
        this.fetchTodoAdd();
    };

    //checkbox选择
    @action onSelectChange = (selectedRowKeys) => {
        this.selectedRowKeys = selectedRowKeys;
    };

    //删除单个
    @action remove(key) {
        this.fetchTodoRemove([key]);
    }

    //删除选择
    @action removeSelected() {
        this.fetchTodoRemove(this.selectedRowKeys);
    }

    //计算长度
    @computed get TodoListCount() {
        return this.todos.length;
    }

}
export default new AppStore();