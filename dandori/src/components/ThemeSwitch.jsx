'use client'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState, useEffect } from "react"
import { useTheme } from 'next-themes'
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export default function ThemeSwitch(){
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return(
            <Skeleton variant="circular" width={40} height={40} />
        )
    }

    if (resolvedTheme === 'dark'){
        return <Tooltip title="Claro" enterDelay={500} TransitionComponent={Zoom} arrow>
            <button onClick={() => setTheme('light')} className="iconButton">
                <LightModeIcon/>
            </button>
        </Tooltip>
    }

    if (resolvedTheme === 'light'){
        return <Tooltip title="Oscuro" enterDelay={500} TransitionComponent={Zoom} arrow>
            <button onClick={() => setTheme('dark')} className="iconButton">
                <DarkModeIcon/>
            </button>
        </Tooltip>
    }

    return null;
}