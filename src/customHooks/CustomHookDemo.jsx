import useFetch from "./useFetchHook";

function CustomHookDemo() {
  const { data, isLoading, refetch } = useFetch("https://randomuser.me/api/");

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Test for custom hook</h1>
      {isLoading ? (
        <h3 className="text-lg font-bold">Loading...</h3>
      ) : (
        data &&
        data.results &&
        data.results.length != 0 && (
          <h2 className="text-lg font-bold">
            {data?.results[0] && data?.results[0].email}
          </h2>
        )
      )}
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded mt-4"
        onClick={refetch}
      >
        Refetch 🔄
      </button>
    </>
  );
}

export default CustomHookDemo;
