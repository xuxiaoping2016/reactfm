import React from 'react';

import {
  List,
  Button,
} from 'antd';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import uuid from 'uuid';

const ListItem = List.Item

import './transitionGroup.less';
  

export default class TodoList extends React.Component {
  state = {
    items:[
        {id:1,text:'Racing car sprays burning fuel into crowd.'},
        {id:2,text:'Japanese princess to wed commoner.'}
      ]
  };

  render() {
    const { items } = this.state;
    return (
      <div>
        {/* <TransitionGroup className="todo-list">
            <List
                style={{ width:"500px"}}
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={items}
                renderItem={item => {
                    console.log(item)
                return <CSSTransition
                    timeout={5000}
                    classNames="fade"
                  >
                  <ListItem>{item}</ListItem>
                  </CSSTransition>
                }
                }
            >
            </List>
        </TransitionGroup> */}
        <ul>
          <TransitionGroup className="todo-list">
              
              {items.map(({ id, text }) => (
                <CSSTransition
                  key={id}
                  timeout={2000}
                  appear={true}
                  classNames="fade"
                >
                  <li>{text}</li>
                </CSSTransition>))
                }
          </TransitionGroup>
        </ul>
        <Button
          type="button"
          onClick={() => {
            const text = prompt('Enter some text');
            if (text) {
              this.setState(state => ({
                items: [
                  ...state.items,
                  {
                    id:state.items.length+1,
                    text
                  }
                ],
              }));
            }
          }}
        >
          Add Item
        </Button>
      </div>
    );
  }
}