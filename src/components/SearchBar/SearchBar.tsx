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
      <form>
        <input onChange={(e) => this.handleChange(e)} value={this.state.term}></input>
        <button type="submit"></button>
      </form>
    );
  }
}

export default SearchBar;
