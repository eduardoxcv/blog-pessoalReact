import React from "react";
import "./Home.css";
import { Typography, Box, Grid, Button } from '@material-ui/core';
import './Home.css';

function Home() {
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{ backgroundColor: "#4d4dff" }}>
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" style={{ color: "white", fontWeight: "bold" }}>Seja bem vindes!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" style={{ color: "white", fontWeight: "bold" }}>Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga.!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                        </Box>
                        <Button variant="outlined" style={{ borderColor: "white", backgroundColor: "#4d4dff", color: "white" }}>Ver Postagens</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://www.pinclipart.com/picdir/middle/336-3368555_html-css-javascript-icons-clipart.png" alt="" width="500px" height="500px" />
                </Grid>
                <Grid xs={12} style={{ backgroundColor: "white" }}>
                </Grid>
            </Grid>
        </>
    );
}

export default Home;