'use client'
import { useState, useEffect, useRef } from "react";
import MenuItem from '@mui/material/MenuItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from './SupermarketDropdown.module.css';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';

const SupermarketDropdown = ({ supermarkets:supermarkets }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    // const options = ['La sirena', 'Jumbo', 'Bravo', 'Nacional'];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        localStorage.setItem("cart", option)
    };
    
    useEffect(() => {
        // Asegurarnos de que estamos en el cliente
        const LastCart = localStorage.getItem('cart');
        if (LastCart !== null && LastCart !== undefined && LastCart !== '') {
            setSelectedOption(LastCart);
        } else {
            for (let i of supermarkets){
                if(i.products.length > 0) {
                    handleOptionClick(i.name)
                    break;
                }
            }
        }
    }, []);

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={toggleDropdown}>
                <h5>{selectedOption}</h5>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {isOpen && (
                <ClickAwayListener onClickAway={toggleDropdown}>

                    <ul className={styles.dropdownMenu}>
                        {supermarkets.map((supermarket, index) => (
                            <li
                                key={index}
                                className={styles.dropdownOption}
                                onClick={() => handleOptionClick(supermarket.name)}
                            >
                                {supermarket.name}
                            </li>
                        ))}
                    </ul>
                </ClickAwayListener>
            )}
        </div>
    );
};


const supermarkets = [
    {id: 1, title: "Sirena"},
    {id: 2, title: "Jumbo"},
    {id: 3, title: "Bravo"},
    {id: 4, title: "Nacional"},
]

function Filter() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
        <button className={styles.filterButton}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Tiendas
          {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
          
        </button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left bottom' : 'center top',
              }}
            >
              <Paper sx={{marginTop:"0.5em"}}>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                        {supermarkets.map((supermarket) => (
                          <MenuItem key={supermarket.id} onClick={handleClose}>{supermarket.title}</MenuItem>
                        ))}
                    </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  );
}

export default SupermarketDropdown;