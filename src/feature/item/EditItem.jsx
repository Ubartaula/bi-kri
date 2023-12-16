import React, { useEffect } from "react";
import {
  useDeleteItemMutation,
  useEditItemMutation,
  useGetItemsQuery,
} from "./itemApiSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import useProvinces from "../../hooks/useProvinces";
import LoadingComponent from "../../lib/LoadingComponent";

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { item, isSuccess: isItemGetSuccess } = useGetItemsQuery("listUsers", {
    selectFromResult: ({ data, isSuccess }) => ({
      item: data?.entities[id],
      isSuccess,
    }),
  });

  const { categoryList } = useCategory();
  const { provinces, districts } = useProvinces();

  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [selectProvince, setSelectProvince] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [city, setCity] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [itemInfo, setItemInfo] = useState("");
  const [images, setImages] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  // useEffect(() => {
  //   if (isItemGetSuccess) {
  //     setItemName(item?.itemName);
  //     setCategory(item?.category);
  //     setCity(item?.city);
  //     setItemInfo(item?.itemInfo);
  //     setPhoneNumber(item?.phoneNumber || "");
  //     setEmail(item?.email);
  //     setPrice(item?.price || "");
  //     setQuantity(item?.quantity || "");
  //     setSelectDistrict(item?.district);
  //     setSelectProvince(item?.province);
  //   }
  // }, [isItemGetSuccess]);

  const listCategory = categoryList.map((category, i) => {
    return (
      <option key={i} value={category}>
        {category}
      </option>
    );
  });

  const listOfProvince = provinces.map((province) => {
    return (
      <option key={province} value={province}>
        {province}
      </option>
    );
  });

  const listOfDistrict = districts[selectProvince]?.map((district) => {
    return (
      <option key={district} value={district}>
        {district}
      </option>
    );
  });

  const [editItemMutation, { isLoading, isSuccess }] = useEditItemMutation();

  const handleEditItem = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("itemName", itemName);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("phoneNumber", phoneNumber);
      formData.append("email", email);
      formData.append("province", selectProvince);
      formData.append("district", selectDistrict);
      formData.append("city", city);
      formData.append("itemInfo", itemInfo);

      for (let i = 0; i < images?.length; i++) {
        formData.append("images", images[i]);
      }

      await editItemMutation(formData);
    } catch (error) {
      setErrMsg(error?.data?.message || error?.status);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/profile");
      setItemName("");
      setCategory("");
      setCity("");
      setItemInfo("");
      setImages("");
      setPhoneNumber("");
      setEmail("");
      setPrice("");
      setQuantity("");
      setSelectDistrict("");
      setSelectProvince("");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    setErrMsg("");
  }, [
    itemInfo,
    itemName,
    selectDistrict,
    selectProvince,
    category,
    quantity,
    price,
    phoneNumber,
    email,
    city,
  ]);

  const [deleteItemMutation, { isSuccess: isDeleteSuccess, reset }] =
    useDeleteItemMutation();

  const handleDelete = async () => {
    try {
      await deleteItemMutation({ id: id });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("/dash");
    }
  }, [isDeleteSuccess, navigate]);

  return (
    <>
      {errMsg?.length > 0 && (
        <div className=" h-screen fixed z-50 top-0 bottom-0 left-4 right-4 bg-opacity-40 flex flex-col items-center justify-center ">
          <div className="min-h-[10rem] rounded-lg   border border-slate-300 flex flex-col items-center justify-center bg-slate-300 shadow-2xl shadow-slate-900">
            <p className="text-2xl p-4 text-red-800 text-center">{errMsg}</p>
            <button
              onClick={() => setErrMsg("")}
              className="bg-blue-600 text-white p-1 px-8 w-fit text-center shadow shadow-black rounded-md m-4"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <form
        name=""
        id=""
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto w-full h-full max-w-2xl p-4 "
      >
        <div className="border border-gray-100 rounded-lg">
          <div className="px-6">
            <div className="mb-1 flex flex-col mt-4 ">
              <p className="pl-2 pt-1 italic text-xs">Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className=" capitalize border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
              >
                <option>{item?.category}</option>
                {listCategory}
              </select>
            </div>

            <div className="mb-1 flex flex-col ">
              <p className="pl-2 pt-0.5 italic text-xs">Title</p>
              <input
                maxLength={50}
                placeholder={item?.itemName}
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500 placeholder-black"
              />
            </div>
            <div className="mb-1 flex flex-col">
              <p className="pl-2 pt-0.5 italic text-xs">Quantity</p>
              <input
                maxLength={10}
                placeholder={item?.quantity}
                type="text"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500 placeholder-black"
              />
            </div>
            <div className="mb-1 flex flex-col">
              <p className="pl-2 pt-0.5 italic text-xs">Price</p>
              <input
                maxLength={10}
                placeholder={item?.price}
                type="text"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500 placeholder-black"
              />
            </div>
            <div className="mb-1 flex flex-col">
              <p className="pl-2 pt-0.5 italic text-xs">Contact Number</p>
              <input
                maxLength={15}
                placeholder={item?.phoneNumber}
                type="text"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500 placeholder-black"
              />
            </div>
            <div className="mb-1 flex flex-col">
              <p className="pl-2 pt-0.5 italic text-xs">Email address</p>
              <input
                maxLength={50}
                placeholder={item?.email}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500 placeholder-black"
              />
            </div>

            <div className="mb-1 flex flex-col">
              <p className="pl-2 pt-0.5 italic text-xs">Province</p>
              <select
                value={selectProvince}
                onChange={(e) => setSelectProvince(e.target.value)}
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
              >
                <option value="">{item?.province}</option>
                {listOfProvince}
              </select>
            </div>
            <div className="mb-1 flex flex-col">
              <p className="pl-2 pt-0.5 italic text-xs">District</p>
              <select
                value={selectDistrict}
                onChange={(e) => setSelectDistrict(e.target.value)}
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
              >
                <option value="">{item?.district}</option>
                {listOfDistrict}
              </select>
            </div>
            <div className="mb-1 flex flex-col">
              <p className="pl-2 pt-0.5 italic text-xs">City / Village name</p>
              <input
                maxLength={50}
                placeholder={item?.city}
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500 placeholder-black"
              />
            </div>
            <div className="mb-1 flex flex-col">
              <p className="pl-2 pt-0.5 italic text-xs">More Information</p>
              {itemInfo && (
                <p className="px-1 text-sm text-yellow-700 italic">{`You have ${
                  120 - itemInfo?.length
                } character left...`}</p>
              )}
              <textarea
                placeholder={item?.itemInfo}
                maxLength={120}
                type="text"
                value={itemInfo}
                onChange={(e) => setItemInfo(e.target.value)}
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500 placeholder:text-black placeholder:italic"
              />
            </div>
            <div
              aria-live="assertive"
              className="text-red-500 text-sm font-semibold"
            >
              {images?.length > 4 ? "max 4 photos can upload" : ""}
            </div>
            <div className="mb-1 flex flex-col">
              <label htmlFor="" className="px-1 text-xs italic pt-2 pb-1">
                Optional , you can upload up to 4 photos
              </label>
              <input
                multiple
                type="file"
                name="images"
                onChange={(e) => setImages(e.target.files)}
                className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
              />
            </div>
          </div>
          <div className="text-center mt-6 px-8">
            <button
              onClick={() => {
                if (
                  images?.length === 0 &&
                  !itemInfo &&
                  !itemName &&
                  !selectDistrict &&
                  !selectProvince &&
                  !category &&
                  !quantity &&
                  !price &&
                  !email &&
                  !city
                ) {
                  setErrMsg(
                    "It seems no changes were made to any of the fields."
                  );
                } else if (images?.length && images?.length > 4) {
                  setErrMsg("You can upload up to 4 photos only.");
                } else if (
                  !images?.length &&
                  item?.itemName === itemName &&
                  item?.itemInfo === itemInfo &&
                  item?.selectDistrict === selectDistrict &&
                  item?.selectProvince === selectProvince &&
                  item?.category === category &&
                  item?.quantity === quantity &&
                  item?.price === price &&
                  item?.email === email &&
                  item?.city === city
                ) {
                  setErrMsg(
                    "It seems no changes were made to any of the fields."
                  );
                } else {
                  handleEditItem();
                }
              }}
              className="bg-blue-600 text-white text-lg p-1 mt-2 w-full rounded-lg hover:bg-green-600 shadow-sm"
            >
              Edit Submit
            </button>
          </div>

          <div className="text-center mt-6 px-8 ">
            <button
              onClick={() => setDeleteQuestion(true)}
              className="bg-red-600 text-white text-lg p-1 mt-2 w-full rounded-lg hover:bg-green-600 shadow-sm"
            >
              Delete Item
            </button>
            <div className="min-h-[10rem]"></div>
          </div>
        </div>

        {deleteQuestion && (
          <div className="fixed top-0 bottom-0 right-0 left-0 px-2  ">
            <div className="p-4 mx-auto w-screen  max-h-fit max-w-fit bg-yellow-500 mt-[20%] rounded-lg">
              <p className="text-2xl text-center text-blue-700]">
                Are you sure to Delete ?
              </p>
              <div className="text-center mt-6 px-8 ">
                <button
                  onClick={handleDelete}
                  className="bg-blue-600 text-white text-lg p-2 mt-2 w-full rounded-lg hover:bg-red-600 shadow-sm"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteQuestion(false)}
                  className="bg-blue-600 text-white text-lg p-2 mt-2 w-full rounded-lg hover:bg-green-600 shadow-sm"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading && <LoadingComponent />}
      </form>
    </>
  );
};

export default EditItem;
