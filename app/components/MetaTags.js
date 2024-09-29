// MetaTags.js
import Head from 'next/head';

const MetaTags = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </Head>
);

export default MetaTags;
