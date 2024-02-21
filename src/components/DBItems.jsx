import React from "react";
import DataTable from "./DataTable";
import { HiCurrencyDollar } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getAllProducts } from "../Api";
import { setAllProducts } from "../context/actions/productAction";
import { alertNull, alertSuccess } from "../context/actions/alertActions";

const DBItems = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // console.log("Product" + products);
  return (
    <div className="flex items-center justify-self-center gap-4 pt-8 w-full px-8">
      <DataTable
        coloums={[
          {
            title: "Image",
            field: "image",
            render: (rowData) => (
              <img
                src={rowData.image}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-xl font-semibold text-textColor flex items-center justify-start gap-2">
                <HiCurrencyDollar className="text-red-400" />
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
        title="List of Products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("You want to edit" + rowData.product_name);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              // alert("You want to delete" + rowData.productId);
              if (window.confirm("Are you sure, you want to delete!")) {
                deleteAProduct(rowData.product_name).then((res) => {
                  dispatch(alertSuccess("Product deleted from the cloud!!"));
                  setInterval(() => {
                    dispatch(alertNull());
                  }, 2000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default DBItems;
