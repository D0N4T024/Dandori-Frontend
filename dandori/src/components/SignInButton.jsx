import styles from "./SignInButton.module.css"
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';

export default function SignInButton(){
    return (
        <div>
            <Link href='/auth/signIn' className={styles.largeSignInButton}>
                <Button variant="contained" endIcon={<LoginIcon/>} sx={{ background:"#54DEA7", whiteSpace: "nowrap", color: "#000000", borderRadius: "25px", fontFamily: "var(--font-poppins)", fontSize: "14px", fontWeight: "600"}}>
                    Iniciar Sesion
                </Button>
            </Link>
            <Link href='/auth/signIn'>
                <button className={styles.button}>
                    <LoginIcon/>
                </button>
            </Link>
        </div>
    )
}

