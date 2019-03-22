import React from 'react';

 export default class QuestionForm extends React.PureComponent {
  state = {
    name: '',
    question: ''
  }

   handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

   render() {
    const { name, question } = this.state;
    return (
      <form onSubmit={this.props.handleSubmit.bind(null, name, question)}>
        <input type="text" name="name" value={name} onChange={this.handleChange}/>
        <br/>
        <textarea name="question" value={question} onChange={this.handleChange}/>
        <br/>
        <button>Create Question</button>
      </form>
    )
  }
}
