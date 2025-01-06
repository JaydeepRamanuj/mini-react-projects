import useFetch from "./customHooks/useFetchHook";

function Test() {
  const { data, isLoading } = useFetch("https://randomuser.me/api/");

  return (
    <>
      <h1>Test page</h1>
      {isLoading && <h3>Loading...</h3>}
      {data && data.results && data.results.length != 0 && (
        <h2>{data?.results[0] && data?.results[0].email}</h2>
      )}
    </>
  );
}

export default Test;
