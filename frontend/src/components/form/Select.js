import M from 'materialize-css'
import { useEffect } from 'react';
export default function Select({ text, name, options, handleOnChange, value }) {

    function load() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, options);
    }
      
    useEffect(() => {
        load()
    },[])

    return (
      <div >
        <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >

            <option>Selecione uma opção</option>
            {options.map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
            
        </select>
      </div>
    )
  }