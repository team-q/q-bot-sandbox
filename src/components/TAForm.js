import React, { PureComponent } from 'react';

export default class TAForm extends PureComponent {
  state = {
    name: '',
    cohort: ''
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
    console.log(this.state.cohort);
  }

  render() {
    const { name, cohort } = this.state;
    return (
      <>
        <h2>Add New TA</h2>
        <form onSubmit={this.props.handleSubmit.bind(null, name, cohort)}>
          <label>TA Name</label>
          <input type='text' name='name' value={name} onChange={this.handleChange}/>
  
          <label>Assigned Class</label>
          <input type='text' name='cohort' value={cohort} onChange={this.handleChange}/>

          <button type='submit'>Submit</button>
        </form>
      </>
    );
  }
}