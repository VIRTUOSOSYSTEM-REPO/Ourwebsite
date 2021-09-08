import React, { Component } from 'react';
import './App.scss';
import Swal from 'sweetalert2';

import Form from './Form';

class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      birthDate: new Date(),
      email: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      phone: '',
      qualification: '',
      file: new FileReader(),
      fileImage: new FileReader(),
      letter: '',
      submitting: true,
      formErrors: {
        fullName: '',
        birthDate: '',
        email: '',
        gender: '',
        qualification: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        file: 'ok',
        fileImage: 'ok',
        letter: 'ok',
      },
      isModalOpen: false,
      show: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleDate(date) {
    this.setState({
      birthDate: date,
    });
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    console.log('name: ', name);
    console.log('value : ', value);

    switch (name) {
      case 'fullName':
        formErrors.fullName =
          value.length < 3 ? 'Minimum 3 characters required' : 'Perfect!';
        break;

      case 'birthDate':
        formErrors.birthDate = RegExp(
          /^(((((((0?[13578])|(1[02]))[\.\-/]?((0?[1-9])|([12]\d)|(3[01])))|(((0?[469])|(11))[\.\-/]?((0?[1-9])|([12]\d)|(30)))|((0?2)[\.\-/]?((0?[1-9])|(1\d)|(2[0-8]))))[\.\-/]?((\d{2})?([\d][\d]))))|((0?2)[\.\-/]?(29)[\.\-/]?(((19)|(20))?(([02468][048])|([13579][26])))))$/
          // /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
        ).test(value)
          ? 'Perfect!'
          : 'Enter DD/MM/YYYY birthdate format';
        break;

      case 'email':
        formErrors.email =
          RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          ).test(value) && value.length > 0
            ? 'Perfect!'
            : 'Invalid email address';
        break;

      case 'gender':
        formErrors.gender =
          RegExp(/^male$||^female$/).test(value) && value.length > 0
            ? 'Perfect!'
            : 'Please choose a gender';
        break;
      case 'phone':
        formErrors.phone =
          RegExp(/^[0-9]*$/).test(value) && value.length > 0
            ? 'Perfect!'
            : 'Numeric characters required';
        break;
      case 'Qualification':
        formErrors.qualification =
          value.length < 2 && value.length > 0
            ? 'Qualification required'
            : 'Perfect!';
        break;
      case 'address':
        formErrors.address =
          value.length < 2 && value.length > 0
            ? 'street name required'
            : 'Perfect!';
        break;

      case 'houseNumber':
        formErrors.houseNumber =
          RegExp(/^[0-9]*$/).test(value) && value.length > 0
            ? 'Perfect!'
            : 'Numeric characters required';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        [name]: value,
      },
      () => console.log()
    );
  }

  handleSubmit(e) {
    console.log(this.state.formErrors);
    e.preventDefault();
    if (
      this.state.formErrors.fullName === 'Perfect!' &&
      this.state.formErrors.email === 'Perfect!' &&
      this.state.formErrors.gender === 'Perfect!' &&
      this.state.formErrors.address === 'Perfect!' &&
      this.state.formErrors.qualification === 'Perfect!' &&
      this.state.formErrors.phone === 'Perfect!'
    ) {
      Swal.fire(
        'Thanks for submitting!',
        'We will contact you soon!',
        'success'
      );
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  }

  render() {
    return (
      <div className="App">
        <main>
          <Form
            state={this.state}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            onHandleDate={this.handleDate}
          />
        </main>
      </div>
    );
  }
}

export default Career;
