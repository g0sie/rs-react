import { Component } from 'react';

export class CreateCardForm extends Component {
  render() {
    return (
      <form className="flex flex-col max-w-xl md:w-full w-11/12" data-testid="create-card">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label
              className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              placeholder="Name"
              type="text"
              className={
                'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-lg leading-tight ' +
                'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
              }
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
              htmlFor="kanji-name"
            >
              Name in kanji
            </label>
            <input
              id="kanji-name"
              placeholder="Name in kanji"
              type="text"
              className={
                'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-lg leading-tight ' +
                'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-3">
          <div
            className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
            data-te-datepicker-init
            data-te-input-wrapper-init
          >
            <label
              className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
              htmlFor="birth-date"
            >
              Date of birth
            </label>
            <input
              type="date"
              className={
                'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-base leading-tight ' +
                'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
              }
              id="birth-date"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
              htmlFor="pronouns"
            >
              Pronouns
            </label>
            <select
              id="pronouns"
              className={
                'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-lg leading-tight ' +
                'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
              }
            >
              <option value="he">he/him</option>
              <option value="she">she/her</option>
              <option value="they">they/them</option>
            </select>
          </div>
        </div>

        <div className="-mx-3 mb-1 flex flex-col sm:flex-row">
          <div className="w-full xs:w-1/2">
            <p className="ml-3 uppercase tracking-wide text-slate-300 text-base font-bold mt-5">
              Blood type
            </p>
            <div className="flex gap-6 ml-3">
              <div>
                <input type="radio" id="a" value="a" name="blood" defaultChecked />
                <label htmlFor="a" className="text-xl ml-1">
                  A
                </label>
              </div>

              <div>
                <input type="radio" id="b" value="b" name="blood" />
                <label htmlFor="b" className="text-xl ml-1">
                  B
                </label>
              </div>

              <div>
                <input type="radio" id="o" value="o" name="blood" />
                <label htmlFor="o" className="text-xl ml-1">
                  O
                </label>
              </div>

              <div>
                <input type="radio" id="ab" value="ab" name="blood" />
                <label htmlFor="ab" className="text-xl ml-1">
                  AB
                </label>
              </div>
            </div>
          </div>

          <div className="w-full xs:w-1/2 px-3 mb-3">
            <p className="uppercase tracking-wide text-slate-300 text-base font-bold mt-5">
              Is dead
            </p>
            <input type="checkbox" id="dead" className="mr-2 leading-tight" />
            <label htmlFor="dead" className="text-slate-300 text-lg font-bold">
              dead
            </label>
          </div>
        </div>

        <div className="mt-2">
          <label
            className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
            htmlFor="img"
          >
            Upload image
          </label>
          <input
            className={
              'block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-2 px-2 text-lg leading-tight cursor-pointer ' +
              'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
            }
            id="img"
            type="file"
          />
          <p className="mt-1 text-sm text-slate-400">JPG or PNG.</p>
        </div>
        <button
          type="submit"
          className="mt-5 py-2 rounded bg-cyan-700 hover:bg-cyan-800 transition-colors text-xl uppercase tracking-wider text-slate-200"
        >
          Create
        </button>
      </form>
    );
  }
}

export default CreateCardForm;
