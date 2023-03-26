import { useState, useEffect } from "react";
import styles from "../../styles/index"
import bus from '../../utils/bus'

export default function Message() {
    const [ message, setMessage ] = useState('')
    const [type, setType] = useState("")

    useEffect(() => {
        bus.addListener('flash',({message, type}) => {
            setMessage(message)
            setType(type)
        })
    }, [])

    return (
        <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    );
}
  
