import { useEffect, useState } from 'react';
import { PageProps } from '../../interfaces/pageProps';
import './pageStyles.scss';

export function PageComponent(props: PageProps) {
  const [backButtonEnable, setBackEnable] = useState(true);
  const [nextButtonEnable, setNextEnable] = useState(true);
  useEffect(() => {
    setBackEnable(props.thisPage !== 1);
    setNextEnable(props.thisPage !== props.maxPages);
  }, [props.thisPage, props.maxPages]);
  return (
    <section className="twrapper__page-section page-section">
      <button
        className="page-section__left-button lbutton"
        onClick={() => props.setPage(props.thisPage - 2)}
        disabled={!backButtonEnable}
      >
        &lt;
      </button>
      <p className="page-section__page-text page-text">
        {props.thisPage}/{props.maxPages}
      </p>
      <button
        className="page-section__right-button rbutton"
        onClick={() => props.setPage(props.thisPage)}
        disabled={!nextButtonEnable}
      >
        &gt;
      </button>
    </section>
  );
}
