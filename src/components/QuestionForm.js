import React from 'react';
import { addQuestion } from '../actions/questions';

 export default class QuestionForm extends React.PureComponent {
  state = {
    name: '',
    question: ''
  }

   handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit = (name, question, event) => {
    event.preventDefault();
    addQuestion({ name, question })
    this.setState({ name: '', question: '' })
  }

   render() {
    const { name, question } = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(null, name, question)}>
        <input type="text" name="name" value={name} onChange={this.handleChange}/>
        <br/>
        <textarea name="question" value={question} onChange={this.handleChange}/>
        <br/>
        <button>Create Question</button>
      </form>
    )
  }
}
