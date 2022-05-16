import PropTypes from "prop-types";

function Badge({ text, palette, rounded, border }) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  // If rounded is not provided, is equal
  const optRounded = rounded ? "rounded-3xl" : "rounded-sm";
  // If border is active
  const optBorder = border ? "border-2" : "";
  const styles = `bg-bg ${optPalette} text-text ${optBorder} px-4 py-[0.08rem] ${optRounded} border-border shadow-md`;

  return <span className={styles}>{text}</span>;
}
Badge.propTypes = {
  text: PropTypes.string,
  palette: PropTypes.string,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
};

export default Badge;
