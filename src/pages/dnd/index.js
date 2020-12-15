import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from './App'
import Demo from './simple'

const Index = () => {
  return <div>
    <DndProvider backend={HTML5Backend}>
      <App/>
      <br/>
      <br/>
      <Demo />
    </DndProvider>
  </div>
};

export default Index;
