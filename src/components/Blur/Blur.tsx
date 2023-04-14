import { ReactNode } from 'react';

interface BlurProps {
  children: ReactNode;
  value: string;
}

const Blur = (props: BlurProps) => {
  return <div style={{ filter: `blur(${props.value})`, width: '100%' }}>{props.children}</div>;
};

export default Blur;
