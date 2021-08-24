import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import swal from "sweetalert";
import {DELETE_PRODUCT, GET_ALL_CLOTHES, UPDATE_PRODUCT} from "../../components/Api/Url";
import {Backdrop, Fade, Modal} from "@material-ui/core";
import CreateProduct from "./CreateProduct";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function TableProduct() {
    const classes = useStyles();
    const [data, setData] = useState([])
    const [openModalCreate, setModalCreate] = useState(false);

    useEffect(() => {
        axios.get(GET_ALL_CLOTHES).then(response => {
            setData(response.data.list)
        })

    }, [])


    const dataColumns = [
        {
            title: 'Product',
            field: 'product_image',
            render: rowData =>
                <img src={rowData.product_image} style={{width: 80}}/>,
            editComponent: (props,index) => (
                <input
                    accept="image/"
                    multiple
                    type="file"
                    onChange={e => props.onChange(e.target.files[index])}
                />
            ),
        },
        {
            title: 'Product Name',
            field: 'product_name'
        },
        {
            title: 'Gender',
            field: 'gender',
            lookup: {
                men: 'Men',
                women: 'Women',
                kids: 'Kids'
            }
        },
        {
            title: 'Category',
            field: 'category',
            lookup: {
                top: 'Top',
                bottom: 'Bottom',
                accessories: 'Accessories'
            }
        },
        {
            title: 'Sub Category',
            field: 'sub_category',
            lookup: {
                tshirt: 'T-Shirt',
                jersey: 'Jersey',
                jacket: 'Jacket',
                sweater: 'Sweater',
                hoodie: 'Hoodie',
                short: 'Short',
                pants: 'Pants',
                legging: 'Legging',
                socks: 'Socks',
                cap: 'Cap',
                backpack: 'Backpack',
                sleeve: 'Sleeve',
                ball: 'Ball'
            }
        },
        {
            title: 'Price',
            field: 'price',
            type: 'numeric'
        },
    ]

    const handleOpenCreate = () => {
        setModalCreate(true)
    }
    const handleCloseCreate = () => {
        setModalCreate(false)
    }


    return (
        <>
            <MaterialTable
                columns={dataColumns}
                data={data}
                options={{
                    search: true,
                    showTitle: false,
                    actionsColumnIndex: -1,
                    searchFieldAlignment: 'left',
                    rowStyle: {
                        textTransform: 'capitalize'
                    }
                }}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add Product',
                        isFreeAction: true,
                        onClick: (event) => handleOpenCreate()
                    }
                ]}
                detailPanel={[
                    {
                        tooltip: 'Detail Image Product',
                        render:
                            rowData => {
                                return (
                                    <img
                                        src={rowData.product_image}
                                        width="30%"
                                        height="30%"
                                        style={{margin: '0 50% 0 35%'}}
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                )
                            },
                    }
                ]}

                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve();
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                axios.post(UPDATE_PRODUCT(data[index].id), newData).then(response => {
                                    swal({
                                        title: "Done!",
                                        text: "Product was successfully updated.",
                                        icon: "success",
                                    })
                                }).catch(error => {
                                    swal({
                                        title: "Error!",
                                        icon: "error",
                                        text: error,
                                        dangerMode: true,
                                    })
                                })
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve()
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                axios.delete(DELETE_PRODUCT(data[index].id)).then(response => {
                                    swal({
                                        title: "Done!",
                                        text: "Delete Product Successfully",
                                        icon: "success",
                                    })
                                }).catch(error => {
                                    swal({
                                        title: "Error!",
                                        text: error,
                                        icon: "error",
                                        dangerMode: true,
                                    })
                                })

                            }, 1000)
                        }),
                }}
            />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModalCreate}
                onClose={handleCloseCreate}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalCreate}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Add Product</h2>
                        <div id="transition-modal-description">
                            <CreateProduct/>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>

    )
}
