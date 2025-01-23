"use client"
import { useState, useEffect, useRef} from 'react';

import { useRouter } from 'next/navigation';
import styles from "./Searcher.module.css"
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { getAllSimpleSupermarkets } from '@/app/services/supermarket';

function Filter() {
  
  const [supermarkets, setSupermarkets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const response = await getAllSimpleSupermarkets();
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

  // if (loading) return <p>Loading supermarkets...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;




  const router = useRouter();
  
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
      router.push(`/store/${event}`);

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

function Input() {
  const router = useRouter();
  // console.log(router.pathname); // Muestra la ruta actual
  // console.log(router.query);

  const [searchValue, setSearchValue] = useState('');
  
  const handleSearch = () => {
    if(searchValue !== ""){
      router.push(`/search?query=${searchValue}`);
      setSearchValue('');
    //   router.push({
    //     pathname: '/search',
    //     query: { id: 10, category: 'tech' }  // Parámetros de la URL
    //   });
    }

  }

  return <div className={styles.inputContainer}>
      <InputBase
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {e.key === 'Enter' && handleSearch()}}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
          <SearchIcon />
      </IconButton>
  </div>
}


function Searcher() {
  return <div className={styles.mainContainer}>
      <Filter/>
      <Input/>
    </div>
}

export default Searcher;