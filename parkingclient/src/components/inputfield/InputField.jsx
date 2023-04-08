const InputField = ({type, name, label, placeholder, changeFunction}) => {
  return (
    <div className='input-field-container'>
       <label className='input-label'>{label}</label>
       <input 
        type = {type}
        name = {name}
        placeholder = {placeholder}
        className = "input-field"
        onChange={changeFunction}
       />
    </div>
  )
}

export default InputField