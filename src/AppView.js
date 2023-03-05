import React from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  Paper,
  Autocomplete,
  TextField,
  Pagination,
} from '@mui/material';

import PreLoader from "./components/PreLoader";
import imgUkraine from './assets/ukraine.png';

import colors from './helper/colors.sass';
import './app.sass';

const AppView = ({
  data,
  visibleItems,
  search,
  setSearch,
  selected,
  setSelected,
  count,
  page,
  handleChange
}) => {
  const placeholder = imgUkraine;

  return (
    <div
      className="wrapper-needs"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundImage: `url(${imgUkraine})`
      }}
    >
      <Grid container spacing={0} className="container-needs">
        <Grid item xs={1} sm={1} />
        <Grid item xs={2} sm={2}>
          <Box m={2}>
            <Typography variant="h5">
              {`${data.length} ITEMS`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} display="flex" justifyContent="center">
          <Stack
            direction="row"
            sx={{
              width: 250,
              margin: 1,
              backgroundColor: colors['white'],
              borderRadius: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
            }}
          >
            <Autocomplete
              freeSolo
              className="search-input"
              size="small"
              disableClearable
              fullWidth
              PaperComponent={({ children }) => (
                <Paper style={{ marginBottom: 10 }}>{children}</Paper>
              )}
              options={data.map((option) => ({
                  id: option.id,
                  label: option.title,
                })
              )}
              value={search}
              onChange={(e, newValue) => {
                setSearch(newValue.label || newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="SEARCH"
                  variant="outlined"
                  style={{
                    backgroundColor: colors['white'],
                  }}
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    if (e.target.value === '') {
                      setSearch('');
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    style: {
                      color: colors['blue-light'],
                    }
                  }}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={2} sm={2} />
        <Grid item xs={1} sm={1} />
        <Grid item xs={8} sm={8}>
          <Box m={2} display="flex" justifyContent="flex-start" flexWrap="wrap">
            {visibleItems.map(({ id, title, description, imagePath }) => (
              <Box
                key={id}
                sx={{
                  flex: '0 0 29%',
                  justifyContent: 'center',
                  margin: '10px',
                  borderRadius: '5px',
                  border: 2,
                  borderColor: colors['black-dark'],
                  backgroundColor: colors['white'],
                }}
              >
                <Box
                  sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6">{title}</Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="subtitle1">
                    {description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <PreLoader source={imagePath} placeholder={placeholder} page={page}/>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            m={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {!search && (<Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              sx={{
                padding: '5px',
                borderRadius: '5px',
                border: 2,
                borderColor: colors['black-dark'],
                backgroundColor: colors['white'],
              }}
            />)}
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default AppView;
