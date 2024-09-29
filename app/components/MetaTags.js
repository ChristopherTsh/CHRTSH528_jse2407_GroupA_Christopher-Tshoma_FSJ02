// MetaTags.js
import Head from 'next/head';

/**
 * MetaTags component for setting up SEO-friendly meta tags, including title and description.
 *
 * @param {Object} props - The component props
 * @param {string} props.title - The title to display in the browser tab and for SEO
 * @param {string} props.description - The description for SEO and social media sharing
 * @returns {JSX.Element} The MetaTags component
 */
const MetaTags = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </Head>
);

export default MetaTags;
