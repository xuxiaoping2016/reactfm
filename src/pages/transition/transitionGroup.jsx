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
        <TransitionGroup className="todo-list">
            <ul>
            {items.map(({ id, text }) => (
              <CSSTransition
                key={id}
                timeout={500}
                classNames="fade"
              >
                <li>{text}</li>
              </CSSTransition>))
              }
            </ul>
        </TransitionGroup>
        <Button
          type="button"
          onClick={() => {
            const text = prompt('Enter some text');
            if (text) {
              this.setState(state => ({
                items: [
                  ...state.items,
                  text
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