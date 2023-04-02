import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CharacterInterface } from '../../interfaces/CharacterInterface';
import { useEffect, useState } from 'react';

const IMAGE_MAX_SIZE = 5_000_000;
const IMAGE_ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

interface FormData {
  name: string;
  kanjiName: string;
  birthDate: string;
  pronouns: 'he' | 'she' | 'they';
  bloodType: 'A' | 'B' | 'O' | 'AB';
  isDead: boolean;
  images?: FileList;
}

interface CreateCardFormProps {
  onSubmit: (character: CharacterInterface) => void;
}

const CreateCardForm = (props: CreateCardFormProps) => {
  const schema: ZodType<FormData> = z.object({
    name: z
      .string()
      .min(1, 'Name is required.')
      .max(100, 'Name must be shorter than 100 characters.')
      .regex(/^[A-Z]/, 'Name must start with an uppercase letter.'),
    kanjiName: z
      .string()
      .max(100, 'Name in kanji must be shorter than 100 characters.')
      .regex(
        /^[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]*$/,
        'Name in kanji must be written in kanji.'
      ),
    birthDate: z
      .string()
      .min(1, 'Date of birth is required.')
      .refine(
        (dateStr) => new Date(dateStr) < new Date(),
        `We don't support characters who will be born in future.`
      ),
    pronouns: z.union([z.literal('he'), z.literal('she'), z.literal('they')]),
    bloodType: z.union([z.literal('A'), z.literal('B'), z.literal('O'), z.literal('AB')]),
    isDead: z.boolean(),
    images: z
      .any()
      .refine((files) => files.length >= 1, 'Image is required.')
      .refine((files) => files?.[0]?.size <= IMAGE_MAX_SIZE, 'Image size must be less than 5MB.')
      .refine((files) => IMAGE_ACCEPTED_TYPES.includes(files?.[0]?.type), 'It must be JPG or PNG.'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, submitCount, isDirty, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function submitData(data: FormData) {
    const character = getCharacterFromData(data);
    setShowDataHasBeenSaved(true);
    props.onSubmit(character);
    reset();
  }

  function getCharacterFromData(data: FormData) {
    if (!data.images) throw new Error('There should be an image.');
    const imageUrl = URL.createObjectURL(data.images?.[0]);

    function about() {
      const birthDate = new Date(data.birthDate).toLocaleDateString();
      const pronouns = data.pronouns;
      const pronounsCapitalized = pronouns.charAt(0).toUpperCase() + pronouns.slice(1);

      const birthInfo = `Date of birth: ${birthDate}`;
      const bloodTypeInfo = `Type of blood: ${data.bloodType}`;
      const deadInfo = `${pronounsCapitalized} is ${data.isDead ? 'dead' : 'not dead'}.`;
      return [birthInfo, bloodTypeInfo, deadInfo].join('\n');
    }

    const character: CharacterInterface = {
      mal_id: submitCount,
      url: '',
      images: {
        jpg: { image_url: imageUrl },
        webp: { image_url: imageUrl, small_image_url: imageUrl },
      },
      name: data.name,
      name_kanji: data.kanjiName,
      nicknames: [],
      favorites: Math.floor(Math.random() * 45882),
      about: about(),
    };
    return character;
  }

  const [showDataHasBeenSaved, setShowDataHasBeenSaved] = useState<boolean>(false);

  useEffect(() => {
    if (isDirty && !isValid) setShowDataHasBeenSaved(false);
  }, [isDirty, isValid]);

  return (
    <form
      onSubmit={handleSubmit(submitData)}
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
            {...register('name')}
            id="name"
            placeholder="Name"
            type="text"
            className={
              'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-lg leading-tight ' +
              'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
            }
          />
          {errors.name && <p className="text-base text-red-600 pl-1 pt-1">{errors.name.message}</p>}
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
            htmlFor="kanji-name"
          >
            Name in kanji
          </label>
          <input
            {...register('kanjiName')}
            id="kanji-name"
            placeholder="Name in kanji"
            type="text"
            className={
              'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-lg leading-tight ' +
              'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
            }
          />
          {errors.kanjiName && (
            <p className="text-base text-red-600 pl-1 pt-1">{errors.kanjiName.message}</p>
          )}
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
            {...register('birthDate')}
            type="date"
            className={
              'appearance-none block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-3 px-4 text-base leading-tight ' +
              'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
            }
            id="birth-date"
          />
          {errors.birthDate && (
            <p className="text-base text-red-600 pl-1 pt-1">{errors.birthDate.message}</p>
          )}
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-slate-300 text-base font-bold mb-2"
            htmlFor="pronouns"
          >
            Pronouns
          </label>
          <select
            {...register('pronouns')}
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
                {...register('bloodType')}
                type="radio"
                id="a"
                value="A"
                name="blood"
                defaultChecked
              />
              <label htmlFor="a" className="text-xl ml-1">
                A
              </label>
            </div>

            <div>
              <input {...register('bloodType')} type="radio" id="b" value="B" name="blood" />
              <label htmlFor="b" className="text-xl ml-1">
                B
              </label>
            </div>

            <div>
              <input {...register('bloodType')} type="radio" id="o" value="O" name="blood" />
              <label htmlFor="o" className="text-xl ml-1">
                O
              </label>
            </div>

            <div>
              <input {...register('bloodType')} type="radio" id="ab" value="AB" name="blood" />
              <label htmlFor="ab" className="text-xl ml-1">
                AB
              </label>
            </div>
          </div>
        </div>

        <div className="w-full xs:w-1/2 px-3 mb-3">
          <p className="uppercase tracking-wide text-slate-300 text-base font-bold mt-5">Is dead</p>
          <input {...register('isDead')} type="checkbox" id="dead" className="mr-2 leading-tight" />
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
          {...register('images')}
          className={
            'block w-full bg-slate-200 text-slate-400 border border-solid border-slate-200 rounded py-2 px-2 text-lg leading-tight cursor-pointer ' +
            'focus:outline-none focus:bg-slate-100 focus:text-slate-700 focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-800'
          }
          id="img"
          type="file"
        />
        <p className="mt-1 text-sm text-slate-400">JPG or PNG.</p>
        {errors.images && (
          <p className="text-base text-red-600 pl-1 pt-1">{errors.images.message?.toString()}</p>
        )}
      </div>
      <input
        type="submit"
        value="Create"
        className="mt-5 py-2 rounded bg-cyan-700 hover:bg-cyan-800 transition-colors text-xl uppercase tracking-wider text-slate-200"
      ></input>
      {showDataHasBeenSaved && (
        <p className="text-base text-cyan-400 pl-1 pt-1">The data has been saved.</p>
      )}
    </form>
  );
};

export default CreateCardForm;
