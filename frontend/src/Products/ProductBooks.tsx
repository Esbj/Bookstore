import useBooks from "../useBooks/useBooks";

export const ProductBooks = () => {
  const { data, isLoading, error } = useBooks()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <>
    </>
  );
};
