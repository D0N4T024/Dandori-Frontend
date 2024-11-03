import styles from "./SearchModal.module.css"
import SearchIcon from '@mui/icons-material/Search';

export default function SearchModal() {
    return(
        <div className={styles.shortSearchComponent}>
            <button className='iconButton'>
                <SearchIcon/>
            </button>
        </div>
        
    )
}