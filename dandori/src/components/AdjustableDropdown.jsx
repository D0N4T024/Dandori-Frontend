'use client';
import styles from "./AdjustableDropdown.module.css"
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function AdjustableDropdown ({ value:value, options:options, onSelection }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelection(option)
        setIsOpen(false);
    };
    
    return(
        <div className={styles.dropdown}>
            <div className={styles.quantityDropdown} onClick={toggleDropdown}>
                <p className={styles.font}>{selectedOption}</p>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {isOpen && (
                <ClickAwayListener onClickAway={toggleDropdown}>
                    <ul className={styles.dropdownMenu}>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={styles.dropdownOption}
                                onClick={() => handleOptionClick(option)}
                            >
                                <p>{option}</p>
                            </li>
                        ))}
                    </ul>
                </ClickAwayListener>
            )}
        </div>
    )
}