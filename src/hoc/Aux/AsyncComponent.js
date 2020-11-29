import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      // eslint-disable-next-line no-use-before-define
      try {
        const { default: component } = await importComponent();
        this.setState({ component });
      } catch(err) {
        // console.log('chunk not found');
        window.location.reload();
      }
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
