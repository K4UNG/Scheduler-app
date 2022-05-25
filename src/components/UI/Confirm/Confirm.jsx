import styles from './Confirm.module.css'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../../store/uiSlice'

export default function Confirm({title}) {
    const dispatch = useDispatch()

    return <div className={styles.modal}>
        <p>Are you sure you want to delete <b>{title}</b>?</p>
        <div className={styles.buttons}>
            <button onClick={() => {
                dispatch(uiActions.closeConfirmation())
            }} className={styles.cancel}>Cancel</button>
            <button className={styles.delete}>Delete</button>
        </div>
    </div>
}