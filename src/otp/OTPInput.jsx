import { useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function OTPInput({
  length = 6,
  isPassword = false,
  isCharactersAllowed = false,
  onSuccess = () => {},
  otp,
  onError = () => {},
  otpStyle = "w-12 h-12 text-center text-xl border-2 rounded focus:outline-blue-500 ",
}) {
  const [isPassVisible, setPassVisible] = useState(false);
  const normalStyle = { borderColor: "gray" };
  const successStyle = { borderColor: "green" };
  const errorStyle = { borderColor: "red" };
  const inputsRef = useRef([]);

  const [style, setStyle] = useState(normalStyle);

  const handleChange = (e, index) => {
    const value = e.target.value;

    e.target.setSelectionRange(e.target.value.length, e.target.value.length);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }

    const values = inputsRef.current.map((input) => input?.value).join("");
    if (values.length !== length) {
      setStyle(normalStyle);
    }

    if (values.length === length) {
      if (values == otp.toString()) {
        onSuccess(values);
        setStyle(successStyle);
      } else {
        onError(values);
        setStyle(errorStyle);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, length);
    const chars = pasted.split("");

    chars.forEach((char, i) => {
      const input = inputsRef.current[i];
      if (input) {
        input.value = char;
      }
    });

    const nextEmpty = inputsRef.current.findIndex((input) => !input?.value);
    if (nextEmpty !== -1) {
      inputsRef.current[nextEmpty].focus();
    } else {
      inputsRef.current[length - 1].focus();
    }

    const values = chars.join("");
    if (values.length === length) {
      if (values == otp.toString()) {
        onSuccess(values);
        setStyle(successStyle);
      } else {
        onError(values);
        setStyle(errorStyle);
      }
    }
  };

  if (!otp) {
    console.error("Please enter proper OTP");
    return;
  }

  return (
    <div>
      <div className="flex items-center">
        <div className="flex gap-2">
          {Array.from({ length: length }).map((_, i) => (
            <input
              key={i}
              autoFocus={i == 0}
              type={isPassword && !isPassVisible ? "password" : "text"}
              inputMode={isCharactersAllowed || isPassword ? "text" : "numeric"}
              pattern={
                isCharactersAllowed || isPassword ? "[a-zA-Z0-9]" : "[0-9]"
              }
              style={style}
              maxLength={1}
              onFocus={(e) => {
                e.target.setSelectionRange(
                  e.target.value.length,
                  e.target.value.length
                );
              }}
              onKeyDown={(e) => {
                const allowed =
                  isCharactersAllowed || isPassword
                    ? /^[a-zA-Z0-9]$/
                    : /^[0-9]$/;

                const currentValue = e.target.value;
                if (e.key.length === 1 && !allowed.test(e.key)) {
                  e.preventDefault();
                }
                const blockedKeys = [
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                  "Home",
                  "End",
                ];
                if (blockedKeys.includes(e.key)) {
                  e.preventDefault();
                }
                if (e.key === "Backspace" && !currentValue && i > 0) {
                  inputsRef.current[i - 1].focus();
                }
                if (e.key === "Tab" && currentValue == 0) {
                  e.preventDefault();
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault(); // stops default caret placement
                // then force focus and caret at end
                e.target.focus();
                const len = e.target.value.length;
                e.target.setSelectionRange(len, len);
              }}
              onPaste={(e) => handlePaste(e)}
              className={otpStyle}
              onChange={(e) => handleChange(e, i)}
              ref={(el) => (inputsRef.current[i] = el)}
            />
          ))}
        </div>

        {isPassword && (
          <div
            className="ml-3 size-10 text-lg f-full flex justify-center items-center cursor-pointer bg-gray-400/20 rounded-full hover:bg-gray-400/30 active:scale-[.95]"
            onClick={() => setPassVisible(!isPassVisible)}
          >
            {isPassVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </div>
        )}
      </div>
      <h1 className="mt-4 text-xl">OTP: abc123</h1>
    </div>
  );
}

export default OTPInput;
