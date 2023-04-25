import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main className="page flex flex-col items-center justify-center text-xl text-slate-400">
      <h1 className="text-4xl text-slate-200">About</h1>
      <section className="pt-5 text-center mx-2">
        <div className="pt-5">
          <p>
            Hi, I&apos;m g0sie, also known as{' '}
            <span className="underline underline-offset-2">Małgorzata Derkacz.</span>
          </p>
          <p>
            I created this project for{' '}
            <a
              href="https://rs.school/react/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-cyan-400"
            >
              RS School React Course
            </a>
            .
          </p>
        </div>
        <div className="pt-5">
          <h2 className="text-2xl text-slate-300">Main features:</h2>
          <p>
            Go to{' '}
            <Link to="../" className="text-cyan-300 hover:text-cyan-400">
              Home
            </Link>{' '}
            page to{' '}
            <span className="underline underline-offset-2">search for anime characters.</span>
          </p>
          <p>
            Go to{' '}
            <Link to="../forms" className="text-cyan-300 hover:text-cyan-400">
              My Cards
            </Link>{' '}
            page to{' '}
            <span className="underline underline-offset-2">create your own characters.</span>
          </p>
        </div>
        <div className="pt-7">
          <p>
            If you want to see my{' '}
            <span className="underline underline-offset-2">other projects</span> you can check my
            GitHub:{' '}
          </p>
          <p>
            <a
              href="https://github.com/g0sie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-cyan-400"
            >
              ✨ https://github.com/g0sie ✨
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
