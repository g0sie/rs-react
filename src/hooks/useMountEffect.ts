import { EffectCallback, useEffect } from 'react';

const useMountEffect = (func: EffectCallback) => useEffect(func, []); // eslint-disable-line

export default useMountEffect;
