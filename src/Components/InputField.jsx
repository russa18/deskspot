const InputField = ({ inpLabel, inpType = "text",func }) => {
  return (
    <div className="input-group flex flex-col my-4">
      <label htmlFor={inpLabel} className="text-sm mb-2">
        {inpLabel}
      </label>
      <input
        type={inpType}
        className="inputfield p-2 bg-black rounded-lg text-sm"
        name={inpLabel}
        id={inpLabel}
        placeholder={`Enter ${inpLabel}`}
        onChange={func}
      />
    </div>
  );
};

export default InputField;
