import { Link } from "react-router-dom";
function Input({
    type, 
    text, 
    name, 
    placeholder, 
    handleOnChange, 
    value, 
    multiple
}) {
    return (
        <div >
            <label htmlFor={name}>{text}:</label>

            <input 
                class="input-field col s12"
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                {...(multiple ? { multiple } : '')}
            />

        </div>
    );
}
export default Input;