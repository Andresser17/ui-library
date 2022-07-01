import PropTypes from "prop-types";
// Helpers
import key from "./helpers/key";

function Tab({ text }) {
  return <span>{text}</span>;
}

function Tabs({ palette, tabs, size, horizontal }) {
  return <div>{tabs && tabs.map((t) => <Tab key={key(t)} text={t} />)}</div>;
}
Tabs.propTypes = {
  palette: PropTypes.string,
  tabs: PropTypes.array,
  size: PropTypes.string,
  horizontal: PropTypes.bool,
};

export default Tabs;
