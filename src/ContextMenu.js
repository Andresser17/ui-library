import PropTypes from "prop-types";

function ContextMenu({ options, palette, disabled }) {
  const checkmark = "&#xea10";
  return (
    <select className="icon-checkmark bg-bg text-text focus:border-focus-border p-2 rounded-sm shadow-md primary-dark" name="pets" id="pet-select">
      <option dangerouslySetInnerHTML={{ __html: checkmark }} value=""></option>
      <option className="p-2" value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  );
}
ContextMenu.propTypes = {
  options: PropTypes.object,
  palette: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ContextMenu;
