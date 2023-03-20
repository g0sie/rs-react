import { ChangeEvent, FormEvent, Component } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

interface SearchBarState {
  term: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { term: this.getTermFromLocalStorage() };
  }

  getTermFromLocalStorage() {
    const term = localStorage.getItem('term');
    return term !== null ? term : '';
  }

  saveTermInLocalStorage() {
    localStorage.setItem('term', this.state.term);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newTerm = e.target.value;
    this.setState({ term: newTerm });
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.onSearch(this.state.term);
    this.saveTermInLocalStorage();
  }

  componentWillUnmount(): void {
    this.saveTermInLocalStorage();
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
        className="rounded-3xl pl-8 py-1 bg-slate-300 xl:w-1/3 lg:w-1/2 md:w-2/3 w-3/4 flex items-center justify-between shadow-lg shadow-cyan-900"
      >
        <input
          className="h-10 inline-block w-full bg-transparent text-xl focus:outline-slate-900 text-slate-900"
          onChange={(e) => this.handleChange(e)}
          value={this.state.term}
        />
        <button className="px-3" type="submit">
          🔍
        </button>
      </form>
    );
  }
}

export default SearchBar;
