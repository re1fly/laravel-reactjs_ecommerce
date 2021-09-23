import React, {useRef, useState} from 'react';
import axios from "axios";
import swal from "sweetalert";
import {Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import {CREATE_PRODUCT} from "../../components/Api/Url";
import {PhotoCamera} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
}));

export default function CreateProduct() {
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const classes = useStyles();


    const changeCategory = (e) => {
        setCategory(e.target.value);
    }

    const changeSubCategory = (e) => {
        setSubCategory(e.target.value);
    }

    const changeGender = (e) => {
        setGender(e.target.value);
    }

    const changeName = (e) => {
        setName(e.target.value)
    }

    const changePrice = (e) => {
        setPrice(e.target.value)
    }

    const changeImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        const fd = new FormData();
        fd.append("category", category);
        fd.append("sub_category", subCategory);
        fd.append("gender", gender)
        fd.append("product_name", name);
        fd.append("price", price);
        fd.append("product_image", image);

        axios.post(CREATE_PRODUCT, fd, {
            "headers":
                {
                    "Content-Type": "multipart/form-data",
                }
        }).then(response => {
            console.log(response)
            if (response.data.success === true) {
                swal({
                    title: "Done!",
                    text: "Product was successfully added.",
                    icon: "success",
                })
                setTimeout(() => {
                    setCategory("");
                    setSubCategory("");
                    setName("");
                    setGender("");
                    setPrice("");
                    document.getElementById("button-file").value = "";
                }, 2000);
            }
        })
    }

    return (
        <>

            <FormControl className={classes.formControl}>
                <TextField id="product-name" label="Product Name" value={name} onChange={changeName}/>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="selectGender">
                    Select Gender
                </InputLabel>
                <Select
                    labelId="open-gender"
                    id="open-select-gender"
                    value={gender}
                    onChange={changeGender}
                >
                    <MenuItem value="men">Men</MenuItem>
                    <MenuItem value="women">Women</MenuItem>
                    <MenuItem value="kids">Kids</MenuItem>

                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="selectCategory">
                    Select Category
                </InputLabel>
                <Select
                    labelId="open-category"
                    id="open-select-category"
                    value={category}
                    onChange={changeCategory}
                >
                    <MenuItem value="top">Top</MenuItem>
                    <MenuItem value="bottom">Bottom</MenuItem>
                    <MenuItem value="accessories">Accessories</MenuItem>

                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="selectSubCategory">
                    Select Sub Category
                </InputLabel>
                <Select
                    labelId="open-sub-category"
                    id="open-select-sub-category"
                    value={subCategory}
                    onChange={changeSubCategory}
                >
                    <MenuItem value="tshirt">T-Shirt</MenuItem>
                    <MenuItem value="jersey">Jersey</MenuItem>
                    <MenuItem value="jacket">Jacket</MenuItem>
                    <MenuItem value="sweater">Sweater</MenuItem>
                    <MenuItem value="hoodie">Hoodie</MenuItem>

                    <MenuItem value="shorts">Shorts</MenuItem>
                    <MenuItem value="pants">Pants</MenuItem>
                    <MenuItem value="legging">Legging</MenuItem>
                    <MenuItem value="socks">Socks</MenuItem>

                    <MenuItem value="cap">Cap</MenuItem>
                    <MenuItem value="backpack">Backpack</MenuItem>
                    <MenuItem value="sleeve">Sleeve</MenuItem>
                    <MenuItem value="ball">ball</MenuItem>

                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField id="price" label="Price" type="number" value={price} onChange={changePrice}/>
            </FormControl>
            <input className={classes.input}
                   id="button-file"
                   type="file"
                   name="file"
                   onChange={changeImage}/>
            <label htmlFor="icon-button-file">
                Input Image Product
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera/>
                </IconButton>
            </label>
            <br/>

            <Box textAlign='center'>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon/>}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Box>

        </>
    )
}
