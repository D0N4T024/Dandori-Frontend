"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./Searcher.module.css"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getAllSimpleSupermarkets } from '@/app/services/supermarket';

function Filter({ setSelectedStore, selectedStore, handleSupermarket }) {
  const [supermarkets, setSupermarkets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const response = await getAllSimpleSupermarkets();
        console.log(response.data)
        setSupermarkets(response.data); // Asume que la API devuelve `data` como la lista de supermercados
      } catch (error) {
        console.error("Error fetching supermarkets:", error);
        setError(error)
      } finally {
        setLoading(false);
      }
    };
    fetchSupermarkets();
  }, []);

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (storeTitle) => {
    setSelectedStore(storeTitle);
    router.push(`/store/${storeTitle}`);
    setOpen(false);
    handleSupermarket();
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
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
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
              <Paper sx={{marginTop:"0.5em", minWidth:"130px"}}>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                        {supermarkets.map((supermarket, index) => (
                          <MenuItem key={index} onClick={() => handleClose(supermarket.supermarketId)}>{supermarket.name}</MenuItem>
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

function Input({ searchValue, setSearchValue, handleSearch }) {
  return (
    <div className={styles.inputContainer}>
      <InputBase
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

function Searcher() {
    const [searchValue, setSearchValue] = React.useState('');
    const [selectedStore, setSelectedStore] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const router = useRouter();

    const handleSearch = () => {
        if (searchValue !== "") {
            router.push(`/search?query=${searchValue}`);
            handleClose();
            setOpenModal(false);
        }
    }

    const handleClose = () => {
        setSearchValue('');
        setSelectedStore(null);
        setOpenModal(false);
    }

  return (
    <div>
        <div className={styles.shortSearchComponent} onClick={() => setOpenModal(true)}>
            <button className='iconButton'>
                <SearchIcon/>
            </button>
        </div>

        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="search-modal"
            aria-describedby="search-and-filter-modal"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    bottom: '50%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                >
                    <div className={styles.modalContainer}>
                        <Filter setSelectedStore={setSelectedStore} selectedStore={selectedStore} handleSupermarket={handleClose} />
                        <Input
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            handleSearch={handleSearch}
                        />
                    </div>
            </Box>
        </Modal>
    </div>
  );
}

export default Searcher;