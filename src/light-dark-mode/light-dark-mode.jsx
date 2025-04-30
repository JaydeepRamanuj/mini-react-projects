import useLocalStorageHook from "../hooks/useLocalStorageHook";
function LightDarkMode() {
  const [theme, setTheme] = useLocalStorageHook("light");

  const handleClick = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div
      className={`mt-10 mx-auto w-fit p-10 rounded-xl ${
        theme == "light" ? "bg-gray-300" : "bg-slate-800 text-white"
      }`}
    >
      <h1 className="text-3xl" style={{ color: theme }}>
        Namshte world
      </h1>
      <h3 className="text-xl mt-1" style={{ color: theme }}>
        Current theme: {theme}
      </h3>
      <button
        className=" mt-4 py-2 px-6 bg-blue-600 active:bg-blue-700 active:scale-95 rounded-md text-white"
        onClick={handleClick}
      >
        Switch to {theme} mode
      </button>
    </div>
  );
}

export default LightDarkMode;
