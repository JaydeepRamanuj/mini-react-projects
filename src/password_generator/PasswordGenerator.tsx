import { useState } from "react";

function PasswordGenerator() {
  const [options, setOptions] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const UpperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123465789";
  const symbols = "!@#$%^&*()_+{};',./?><";
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<string>("Too Weak");
  const [copied, setCopy] = useState<boolean>(false);
  const generatePassword = () => {
    const charactersToGeneratePassword = `${
      options.includeLowercase && lowerCaseLetters
    }${options.includeUppercase && UpperCaseLetters}${
      options.includeSymbols && symbols
    }${options.includeNumbers && numbers}`;
    const totalChars = charactersToGeneratePassword.length;

    const pass = [];
    const includedInPass = [];
    if (options.includeLowercase)
      includedInPass.push(generateRandomChar(lowerCaseLetters));
    if (options.includeUppercase)
      includedInPass.push(generateRandomChar(UpperCaseLetters));
    if (options.includeNumbers)
      includedInPass.push(generateRandomChar(numbers));
    if (options.includeSymbols)
      includedInPass.push(generateRandomChar(symbols));
    for (let index = includedInPass.length; index < options.length; index++) {
      const randomNumber = Math.round(Math.random() * (totalChars - 1));
      pass.push(charactersToGeneratePassword[randomNumber]);
    }
    pass.push(includedInPass.join(""));
    pass.sort(() => Math.random() - 0.5);
    const finalPassword = pass.join("");

    setGeneratedPassword(finalPassword);
    setPasswordStrength(findPassStrength());
  };

  const generateRandomChar = (str: string) => {
    // console.log(str[Math.round(Math.random() * (str.length - 1))]);
    // console.log(Math.round(Math.random() * str.length));

    return str[Math.round(Math.random() * (str.length - 1))];
  };

  const findPassStrength = () => {
    const strength = Object.entries(options).reduce((acc, curr) => {
      if (curr[1] == true || (typeof curr[1] == "number" && curr[1] > 8)) {
        acc += 1;
      }
      return acc;
    }, 0);

    switch (strength) {
      case 5:
        return "Very Strong";
      case 4:
        return "Strong";
      case 3:
        return "Medium";
      case 2:
        return "Weak";
      default:
        return "Too Weak";
    }
  };
  return (
    <div className="max-w-xl flex flex-col gap-3 text-gray-600 bg-gray-100 rounded-lg p-3 shadow-md">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold text-cyan-600">
          {generatedPassword || "Generate Password"}
        </span>
        <span
          className={`px-2 py-1 rounded   ${
            copied
              ? "bg-gray-200 text-gray-600"
              : "bg-cyan-400 text-white active:bg-cyan-500 active:scale-[0.97] hover:bg-cyan-500 hover:cursor-pointer "
          }`}
          onClick={() => {
            if (generatedPassword) {
              navigator.clipboard.writeText(generatedPassword);
              setCopy(true);
            } else {
              alert("Generate password first");
            }

            setTimeout(() => {
              setCopy(false);
            }, 2000);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="range"
          name=""
          id=""
          min={6}
          max={64}
          value={options.length}
          className="w-[70%]"
          onChange={(e) => {
            setOptions((prev) => ({
              ...prev,
              length: Number(e.target.value),
            }));
          }}
        />
        <span>{options.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="lowercase"
            checked={options.includeLowercase}
            className="size-4"
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                includeLowercase: e.target.checked,
              }));
            }}
          />
          <label htmlFor="lowercase">Include Lowercase</label>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="uppercase"
            checked={options.includeUppercase}
            className="size-4"
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                includeUppercase: e.target.checked,
              }));
            }}
          />
          <label htmlFor="uppercase">Include Uppercase</label>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="numbers"
            checked={options.includeNumbers}
            className="size-4"
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                includeNumbers: e.target.checked,
              }));
            }}
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="symbols"
            checked={options.includeSymbols}
            className="size-4"
            onChange={(e) => {
              setOptions((prev) => ({
                ...prev,
                includeSymbols: e.target.checked,
              }));
            }}
          />
          <label htmlFor="symbols">Include Numbers</label>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span>Strength</span>
        {generatedPassword && <span>{passwordStrength}</span>}
      </div>
      <button
        className="bg-cyan-500 text-white rounded-md px-4 py-2 shadow hover:bg-cyan-600 cursor-pointer active:bg-cyan-600 active:scale-[0.98] transition"
        onClick={generatePassword}
      >
        Generate Password
      </button>
    </div>
  );
}

export default PasswordGenerator;
