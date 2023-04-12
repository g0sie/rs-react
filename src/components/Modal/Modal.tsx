import { useContext } from 'react';
import ModalContext from '../../context/ModalContext';

import { motion } from 'framer-motion';

import Backdrop from '../Backdrop/Backdrop';
import HeartIcon from '../../assets/icons/HeartIcon';

import './Modal.css';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const Modal = () => {
  const modal = useContext(ModalContext);

  return (
    <Backdrop onClick={modal.close}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal bg-slate-800 rounded-xl"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <section className="modal-left">
          <img src={modal.character?.images.webp.image_url} />
          <h2 className="text-slate-200 text-2xl sm:pt-5 pt-1">{modal.character?.name}</h2>
          <p className="text-slate-400 text-base">{modal.character?.name_kanji}</p>
          <p className="text-cyan-300 text-lg flex gap-1.5">
            <HeartIcon width="1.2rem" />
            <span className="pt-0.5">{modal.character?.favorites}</span>
          </p>
        </section>
        <section className="modal-right">
          {modal.character?.about?.split('\n').map((p, indx) => (
            <p
              className="text-slate-400 pb-1 text-base"
              key={`c-${modal.character?.mal_id}-p-${indx}`}
            >
              {p}
            </p>
          ))}
        </section>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
