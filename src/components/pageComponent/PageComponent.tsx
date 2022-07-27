import React, { useEffect, useState } from 'react';
import { PageProps } from '../../interfaces/PageProps';

export function PageComponent(props: PageProps) {
  const [backButtonEnable, setBackEnable] = useState(true);
  const [nextButtonEnable, setNextEnable] = useState(true);
  useEffect(() => {
    setBackEnable(props.thisPage === 1 ? false : true);
    setNextEnable(props.thisPage === props.maxPages ? false : true);
  }, [props.thisPage, props.maxPages]);
  return (
    <section>
      <button
        onClick={() => props.setPage(props.thisPage - 2)}
        disabled={!backButtonEnable}
      >
        back
      </button>
      <p>{props.thisPage}</p>
      <p>/</p>
      <p>{props.maxPages}</p>
      <button
        onClick={() => props.setPage(props.thisPage)}
        disabled={!nextButtonEnable}
      >
        next
      </button>
    </section>
  );
}
