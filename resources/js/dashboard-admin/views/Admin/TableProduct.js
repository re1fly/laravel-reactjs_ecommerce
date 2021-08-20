import React, {useEffect, useState} from 'react';
import {GET_ALL_CLOTHES} from "../../components/Api/Url";
import MaterialTable from "material-table";

export default function TableProduct() {
    const [data, setData] = useState([])


    useEffect(() => {
        axios.get(GET_ALL_CLOTHES).then(response => {
            setData(response.data.list)
        })

    }, [])

    const dataColumns = [
        {title: 'Product Name', field: 'product_name'},
        {title: 'Gender', field: 'gender'},
        {title: 'Category', field: 'category'},
        {title: 'Sub Category', field: 'sub_category'},
    ]


    return(
        <MaterialTable
            columns={dataColumns}
            data={data}
            options={{
                search: true
            }}
            title="List of Clothes"
            actions={[
                {
                    icon: 'add',
                    tooltip: 'Add Product',
                    isFreeAction: true,
                    onClick: (event) => alert("You want to add a new row")
                }
            ]}
        />
    )
}
