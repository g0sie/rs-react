import { Component } from 'react';

import CreateCardForm from '../../components/CreateCardForm/CreateCardForm';

class Forms extends Component {
  render() {
    return (
      <main className="page flex flex-col items-center gap-10 text-4xl text-slate-200">
        <h1 className="w-11/12 text-center">Create an anime character</h1>
        <CreateCardForm />
      </main>
    );
  }
}

export default Forms;
