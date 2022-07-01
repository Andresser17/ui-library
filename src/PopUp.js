import PropTypes from "prop-types";
// Components
import PopUpModal from "./PopUpModal";
import Button from "./Button";
// Icons
import { ReactComponent as CheckIcon } from "./icons/success-icon.svg";
import { ReactComponent as ErrorIcon } from "./icons/error-icon.svg";
import { ReactComponent as InfoIcon } from "./icons/info-icon.svg";
const key = (text) => text.replaceAll(" ", "-");

function PopUp({
  palette = "primary",
  title,
  description,
  buttons,
  mode = "success",
}) {
  const mappedButtons =
    buttons &&
    buttons.map((b, i) => {
      if (buttons.length > 1 && i === buttons.length - 1)
        return (
          <button key={key(b.text)} className="mx-1 text-bg h-fit">
            {b.text}
          </button>
        );

      return (
        <span key={key(b.text)} className="mx-1 block">
          <Button text={b.text} palette={palette} />
        </span>
      );
    });

  return (
    <PopUpModal palette={palette}>
      <div className={`flex flex-col items-center ${palette}`}>
        {mode === "error" && (
          <>
            <span className="bg-red-600/25 block w-14 h-14 p-3 rounded-[50%]">
              <ErrorIcon className="text-bg danger" />
            </span>

            <span className="mt-4 text-lg font-semibold">{title}</span>

            <p className="text-[0.8rem]">{description}</p>

            <div className="mt-4 text-sm flex items-center">
              {mappedButtons}
            </div>
          </>
        )}

        {mode === "info" && (
          <>
            <span className="bg-yellow-200/25 block w-14 h-14 p-3 rounded-[50%]">
              <InfoIcon className="text-bg warning" />
            </span>

            <span className="mt-4 text-lg font-semibold">{title}</span>

            <p className="text-[0.8rem]">{description}</p>

            <div className="mt-4 text-sm flex items-center">
              {mappedButtons}
            </div>
          </>
        )}

        {mode === "success" && (
          <>
            <span className="bg-green-600/25 block w-14 h-14 p-3 rounded-[50%]">
              <CheckIcon className="text-bg success" />
            </span>

            <span className="mt-4 text-lg font-semibold">{title}</span>

            <p className="text-[0.8rem]">{description}</p>

            <div className="mt-4 text-sm">{mappedButtons}</div>
          </>
        )}
      </div>
    </PopUpModal>
  );
}
PopUp.propTypes = {
  palette: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  mode: PropTypes.string,
  buttons: PropTypes.array,
};

export default PopUp;
