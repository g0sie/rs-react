import { ChangeEvent, Component } from 'react';

interface SearchBarState {
  term: string;
}

export class SearchBar extends Component {
  state: SearchBarState = { term: this.getTermFromLocalStorage() };

  getTermFromLocalStorage() {
    const term = localStorage.getItem('term');
    return term !== null ? term : '';
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newTerm = e.target.value;
    this.setState({ term: newTerm });
  }

  componentWillUnmount(): void {
    localStorage.setItem('term', this.state.term);
  }

  render() {
    return (
      <form className="rounded-3xl pl-8 py-1 bg-slate-300 xl:w-1/3 lg:w-1/2 md:w-2/3 w-3/4 flex items-center justify-between shadow-lg shadow-cyan-900">
        <input
          className="h-10 inline-block w-full bg-transparent text-xl focus:outline-slate-900 text-slate-900"
          onChange={(e) => this.handleChange(e)}
          value={this.state.term}
        ></input>
        <button className="px-3" type="submit">
          🔍
        </button>
      </form>
    );
  }
}

export default SearchBar;
