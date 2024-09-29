export default function MetaTags({ title, description }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Add more SEO tags as needed */}
    </>
  );
}
