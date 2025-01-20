import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <div>
          <a
            className="button button--secondary button--lg"
            href="docs/Proof of concept/td01-tessaract"
          >
            Commencer les travaux dirigés
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Introduction`}
      description="Laboratoires 4PRJ1D">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
        <div className="text--left padding-horiz--md">

        </div>
      </main>
    </Layout>
  );
}
