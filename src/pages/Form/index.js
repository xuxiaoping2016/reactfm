import React from "react";
import FormCreate from "../../components/FormCreate";

class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "xuxiaoping",
        age: 18,
      },
    };
  }

	render() {
		return (
			<form>
        <div>{getFieldDecorator("name", {})(<input type="text" />)}</div>
      </form>
    );
  }
}

export default FormCreate(FormDemo);
