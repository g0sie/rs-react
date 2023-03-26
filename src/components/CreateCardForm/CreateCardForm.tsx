import { Component, createRef, FormEvent, RefObject } from 'react';

import { CharacterInterface } from '../Cards/CharacterInterface';

interface CreateCardFormProps {
  onSubmit: (character: CharacterInterface) => void;
}

interface CreateCardFormState {
  nameErrorMsg: string;
  kanjiNameErrorMsg: string;
  birthDateErrorMsg: string;
  imgErrorMsg: string;
}

export class CreateCardForm extends Component<CreateCardFormProps, CreateCardFormState> {
  private nameRef = createRef<HTMLInputElement>();
  private kanjiNameRef = createRef<HTMLInputElement>();
  private birthDateRef = createRef<HTMLInputElement>();
  private pronounsRef = createRef<HTMLSelectElement>();
  private blood_A_Ref = createRef<HTMLInputElement>();
  private blood_B_Ref = createRef<HTMLInputElement>();
  private blood_O_Ref = createRef<HTMLInputElement>();
  private blood_AB_Ref = createRef<HTMLInputElement>();
  private deadRef = createRef<HTMLInputElement>();
  private imgRef = createRef<HTMLInputElement>();

  constructor(props: CreateCardFormProps) {
    super(props);
    this.state = {
      nameErrorMsg: '',
      kanjiNameErrorMsg: '',
      birthDateErrorMsg: '',
      imgErrorMsg: '',
    };
  }

  getInputElement = (ref: RefObject<HTMLInputElement>) => {
    const input = ref.current;
    if (input === null) throw new Error('Ref is null');
    return input;
  };
  getSelectElement = (ref: RefObject<HTMLSelectElement>) => {
    const select = ref.current;
    if (select === null) throw new Error('Ref is null');
    return select;
  };

  name = () => this.getInputElement(this.nameRef).value;
  kanjiName = () => this.getInputElement(this.kanjiNameRef).value;
  birthDate = () => this.getInputElement(this.birthDateRef).value;
  pronouns = () => this.getSelectElement(this.pronounsRef).value;
  bloodType = () => {
    const bloodTypeRefs = [this.blood_A_Ref, this.blood_B_Ref, this.blood_O_Ref, this.blood_AB_Ref];
    const bloodTypeInputs = bloodTypeRefs.map((ref) => this.getInputElement(ref));
    const checkedInput = bloodTypeInputs.find((input) => input.checked);
    if (checkedInput === undefined) throw new Error('There is no default blood type.');
    return checkedInput.value.toUpperCase();
  };
  isDead = () => this.getInputElement(this.deadRef).checked;
  imgFile = () => {
    const input = this.getInputElement(this.imgRef);
    return input.files?.[0];
  };
  imgUrl = () => {
    const file = this.imgFile();
    if (file === undefined) throw new Error('Image is undefined.');
    return URL.createObjectURL(file);
  };

  validateData(): boolean {
    const validateName = () => {
      const name = this.name();
      if (name === '') {
        this.setState({ nameErrorMsg: 'Name is required.' });
        return false;
      }
      if (name.length > 50) {
        this.setState({ nameErrorMsg: "Name can't be longer than 50 characters." });
        return false;
      }
      if (/^[^A-Z]/.test(name)) {
        this.setState({ nameErrorMsg: 'Name should start with an uppercase letter.' });
        return false;
      }
      this.setState({ nameErrorMsg: '' });
      return true;
    };

    const validateKanjiName = () => {
      const kanjiName = this.kanjiName();
      if (kanjiName === '') {
        this.setState({ kanjiNameErrorMsg: '' });
        return true;
      }
      if (/^[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]*$/.test(kanjiName)) {
        this.setState({ kanjiNameErrorMsg: '' });
        return true;
      }
      this.setState({ kanjiNameErrorMsg: 'Name in kanji should be written in kanji.' });
      return false;
    };

    const validateBirthDate = () => {
      const birthDateStr = this.birthDate();
      if (birthDateStr === '') {
        this.setState({ birthDateErrorMsg: 'Date of birth is required.' });
        return false;
      }
      const birthDate = new Date(birthDateStr);
      const today = new Date();
      if (birthDate > today) {
        this.setState({
          birthDateErrorMsg: "We don't support characters who will be born in future.",
        });
        return false;
      }
      this.setState({ birthDateErrorMsg: '' });
      return true;
    };

    const validateImg = () => {
      const img = this.imgFile();
      if (img === undefined) {
        this.setState({ imgErrorMsg: 'Image is required.' });
        return false;
      }
      const name = img.name.toLowerCase();
      if (!name.endsWith('.jpg') && !name.endsWith('.png')) {
        this.setState({ imgErrorMsg: 'It must be JPG or PNG.' });
        return false;
      }
      this.setState({ imgErrorMsg: '' });
      return true;
    };

    const isNameValid = validateName();
    const isKanjiNameValid = validateKanjiName();
    const isbirthDateValid = validateBirthDate();
    const isImgValid = validateImg();
    const isValid = isNameValid && isKanjiNameValid && isbirthDateValid && isImgValid;
    return isValid;
  }

  count = (function () {
    let counter = 0;
    function value() {
      counter++;
      return counter;
    }
    return value;
  })();

  generateAbout(): string {
    const birthDate = new Date(this.birthDate()).toLocaleDateString();
    const bloodType = this.bloodType();
    const pronouns = this.pronouns();
    const pronounsCapitalized = pronouns.charAt(0).toUpperCase() + pronouns.slice(1);
    const isDead = this.isDead();

    const birthInfo = `Date of birth: ${birthDate}`;
    const bloodTypeInfo = `Type of blood: ${bloodType}`;
    const deadInfo = `${pronounsCapitalized} is ${isDead ? 'dead' : 'not dead'}.`;
    return [birthInfo, bloodTypeInfo, deadInfo].join('\n');
  }

  handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const isValid = this.validateData();
    if (!isValid) return;

    const imgUrl = this.imgUrl();
    const character: CharacterInterface = {
      mal_id: this.count(),
      url: '',
      images: {
        jpg: { image_url: imgUrl },
        webp: { image_url: imgUrl, small_image_url: imgUrl },
      },
      name: this.name(),
      name_kanji: this.kanjiName(),
      nicknames: [],
      favorites: Math.floor(Math.random() * 45882),
      about: this.generateAbout(),
    };

    this.props.onSubmit(character);
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
        className="flex flex-col max-w-xl md:w-full w-11/12"
        data-testid="create-card"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label
              className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
              htmlFor="name"
            >
              Name*
            </label>
            <input
              id="name"
              ref={this.nameRef}
              placeholder="Name"
              type="text"
              className={
                'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-lg leading-tight ' +
                'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
              }
            />
            <p className="text-base text-red-600 pl-1 pt-1">{this.state.nameErrorMsg}</p>
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
              ref={this.kanjiNameRef}
              placeholder="Name in kanji"
              type="text"
              className={
                'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-lg leading-tight ' +
                'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
              }
            />
            <p className="text-base text-red-600 pl-1 pt-1">{this.state.kanjiNameErrorMsg}</p>
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
              Date of birth*
            </label>
            <input
              ref={this.birthDateRef}
              type="date"
              className={
                'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-base leading-tight ' +
                'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
              }
              id="birth-date"
            />
            <p className="text-base text-red-600 pl-1 pt-1">{this.state.birthDateErrorMsg}</p>
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
              htmlFor="pronouns"
            >
              Pronouns
            </label>
            <select
              ref={this.pronounsRef}
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
                <input
                  type="radio"
                  id="a"
                  ref={this.blood_A_Ref}
                  value="a"
                  name="blood"
                  defaultChecked
                />
                <label htmlFor="a" className="text-xl ml-1">
                  A
                </label>
              </div>

              <div>
                <input type="radio" id="b" ref={this.blood_B_Ref} value="b" name="blood" />
                <label htmlFor="b" className="text-xl ml-1">
                  B
                </label>
              </div>

              <div>
                <input type="radio" id="o" ref={this.blood_O_Ref} value="o" name="blood" />
                <label htmlFor="o" className="text-xl ml-1">
                  O
                </label>
              </div>

              <div>
                <input type="radio" id="ab" value="ab" ref={this.blood_AB_Ref} name="blood" />
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
            <input type="checkbox" id="dead" ref={this.deadRef} className="mr-2 leading-tight" />
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
            Upload image*
          </label>
          <input
            ref={this.imgRef}
            className={
              'block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-2 px-2 text-lg leading-tight cursor-pointer ' +
              'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
            }
            id="img"
            type="file"
          />
          <p className="mt-1 text-sm text-slate-400">JPG or PNG.</p>
          <p className="text-base text-red-600 pl-1 pt-1">{this.state.imgErrorMsg}</p>
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
