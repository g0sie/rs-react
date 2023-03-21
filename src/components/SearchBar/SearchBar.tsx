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
        className={[
          'xl:w-1/3 lg:w-1/2 md:w-2/3 w-3/4',
          'flex items-center justify-between',
          'rounded-3xl shadow-lg shadow-cyan-800',
        ].join(' ')}
      >
        <input
          className="inline-block h-12 w-full px-7 rounded-l-3xl bg-slate-200 text-slate-900 placeholder:text-slate-500 text-lg"
          onChange={(e) => this.handleChange(e)}
          value={this.state.term}
          placeholder="Search for anime character..."
        />
        <button className="px-3 h-12 bg-slate-200 rounded-r-3xl" type="submit">
          🔍
        </button>
      </form>
    );
  }
}

export default SearchBar;
