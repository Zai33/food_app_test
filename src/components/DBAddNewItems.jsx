import React, { useState } from "react";
import { statuses } from "../utils/style";
import Spinner from "./Spinner";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNull,
  alertSuccess,
} from "../context/actions/alertActions";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { addNewItem, getAllProducts } from "../Api";
import { setAllProducts } from "../context/actions/productAction";

const DBAddNewItems = () => {
  const [itemName, setItemName] = useState("");
  const [isPrice, setIsPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imageDownload, setImageDownlaod] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error: ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownlaod(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image has been successfully uploaded"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownload);
    deleteObject(deleteRef)
      .then(() => {
        setImageDownlaod(null);
        setIsLoading(false);
        dispatch(alertSuccess("Image has been deleted!"));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      })
      .catch((error) => {});
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_price: isPrice,
      product_category: category,
      image: imageDownload,
    };
    //console.log(data);
    addNewItem(data).then((res) => {
      dispatch(alertSuccess("New product has been inserted..."));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      setIsPrice("");
      setItemName("");
      setImageDownlaod(null);
      setCategory(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full pt-8 px-24 ">
      <div className="flex flex-col items-center justify-center gap-4 w-full border border-gray-400 rounded-md p-4 px-10">
        <p className="text-2xl font-semibold text-textColor border-b-4 border-sky-400 capitalize">
          Item Name
        </p>
        <InputValueField
          type="text"
          placeHolder={"Item name here"}
          stateFunc={setItemName}
          stateValue={itemName}
        />
        <div className="w-full flex flex-wrap items-center justify-around gap-3">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-2 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-300 backdrop-blur-md ${
                  data.category === category
                    ? "bg-sky-400 text-primary"
                    : "bg-transparent"
                }`}
              >
                {data.titile}
              </p>
            ))}
        </div>
        <p className="text-2xl font-semibold text-textColor border-b-4 border-sky-400 capitalize">
          item price
        </p>
        <InputValueField
          type="number"
          placeHolder={"Enter price here"}
          stateFunc={setIsPrice}
          stateValue={isPrice}
        />
        <div className="w-full bg-card backdrop-blur-md rounded-md border-2 border-dotted border-gray-300 cursor-pointer h-[280px]">
          {isLoading ? (
            <>
              <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
                <Spinner />
                {Math.round(progress > 0) && (
                  <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="w-full flex justify-between">
                      <span className="text-base font-medium text-textColor">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-textColor">
                        {Math.round(progress) > 0 && (
                          <>{`${Math.round(progress)}%`}</>
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-400 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${Math.round(progress)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {!imageDownload ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click To Upload an Image
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <div className="w-full h-full overflow-hidden rounded-md relative">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownload}
                      className="w-full h-full object-contain"
                    />
                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out bg-sky-400"
                      onClick={() => deleteImageFromFirebase(imageDownload)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {/* sumit button */}
        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w-[400px] py-2 bg-sky-400 text-primary rounded-lg cursor-pointer hover:bg-sky-700"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
        className="w-full px-4 py-2 shadow-md outline-none rounded-md border border-gray-200 focus:border-sky-400"
      />
    </>
  );
};

export default DBAddNewItems;
