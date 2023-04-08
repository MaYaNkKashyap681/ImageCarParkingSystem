import { inputfields } from "../constants";
import {InputField} from './index'

const Form = ({setIsOpen, handleDetailsChange, handleFormSubmit}) => {
  return (
    <div className="parking-form">
    <div
      className="closing-button"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      X
    </div>
    <form>
      {inputfields.map((field) => (
        <InputField
          type={field.type}
          name={field.name}
          label={field.label}
          placeholdr={field.placeholder}
          changeFunction={handleDetailsChange}
        />
      ))}
      <div>
        <span
          style={{ display: "block", fontWeight: "bold", color: "green" }}
        >
          Entry Date and Time:
        </span>
        <input
          type="datetime-local"
          name="dateTime"
          className="input-field"
          onChange={handleDetailsChange}
        />
        <span
          style={{ display: "block", fontWeight: "bold", color: "green" }}
        >
          Exit Date and Time:
        </span>
        <input
          type="datetime-local"
          name="exitTime"
          className="input-field"
          onChange={handleDetailsChange}
        />
      </div>

      <button className="button" onClick={handleFormSubmit}>
        Add Parking Slot
      </button>
    </form>
  </div>
  )
}

export default Form