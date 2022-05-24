import styles from './Backdrop.module.css'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../../store/uiSlice'
import { useRef } from 'react'

export default function Backdrop({children}) {
    const dispatch = useDispatch()
    const backdropRef = useRef()
    return <div ref={backdropRef} className={styles.backdrop} onClick={(e) => {
        if (e.target === backdropRef.current)
            dispatch(uiActions.closeModal())
    }}>
        {children}
    </div>
}