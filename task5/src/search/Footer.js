import {Button, Typography} from "@mui/material";
import {Row} from "react-bootstrap";
import React from "react";
import {AddCircleOutlineOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";


const Footer = ({length}) => {
    return <Row className="mt-3" style={{display: "flex", justifyContent: "space-between"}}>
        <Typography>Найдено {length} фильмов</Typography>
        <Link to={`/movies/add`} style={{textDecoration: 'none'}}>
        <Button color="success" className="ml-4" sx={{backgroundColor: '#1ab03e'}} variant="contained" style={{borderRadius:10}} startIcon={<AddCircleOutlineOutlined/>}>Добавить</Button>
        </Link>
    </Row>
}

export default Footer;