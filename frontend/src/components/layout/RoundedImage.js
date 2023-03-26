import styles from '../../styles/RoundImage.module.css'
export default function RoundedImage({ src, alt, width }) {
    return (
        <img
            className={`${styles.rounded_image} ${styles[width]}`} 
            src={src} 
            alt={alt} 
        />
    );
}