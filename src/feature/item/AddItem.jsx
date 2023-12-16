import React, { useEffect } from "react";
import { useAddItemMutation } from "./itemApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import useProvinces from "../../hooks/useProvinces";
import useToken from "../../hooks/useToken";
import LoadingComponent from "../../lib/LoadingComponent";

const AddItem = () => {
  const { userId, email: userEmail, phoneNumber: userPhone } = useToken();
  const navigate = useNavigate();
  const { categoryList } = useCategory();
  const { provinces, districts } = useProvinces();
  const [addItemMutation, { isLoading, isSuccess }] = useAddItemMutation();

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [selectProvince, setSelectProvince] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [city, setCity] = useState("");

  const [phoneNumber, setPhoneNumber] = useState(userPhone || "");
  const [email, setEmail] = useState(userEmail || "");
  const [itemInfo, setItemInfo] = useState("");
  const [images, setImages] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  // working on category
  const listCategory = categoryList.map((category, i) => {
    return (
      <option key={i} value={category}>
        {category}
      </option>
    );
  });

  // work on location
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

  const handleAddItemFormData = async () => {
    try {
      const formData = new FormData();
      formData.append("user", userId);
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

      await addItemMutation(formData);
    } catch (error) {
      setErrMsg(error?.data?.message || error?.status);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/items", { state: category });
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
    images?.length,
  ]);

  return (
    <>
      <form
        name=""
        id=""
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto w-full h-screen max-w-2xl p-4 bg-white"
      >
        <div className="">
          <div
            aria-live="assertive"
            className=" italic text-red-600 text-center"
          >
            {errMsg}
          </div>

          <div className="px-4">
            <div className="p-2">
              <div className="mb-1 flex flex-col mt-4 ">
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className=" capitalize border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                >
                  <option>select category...</option>
                  {listCategory}
                </select>
              </div>

              <div className="mb-1 flex flex-col ">
                <input
                  maxLength={50}
                  placeholder="Title..."
                  required
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <input
                  maxLength={10}
                  placeholder="Quantity..."
                  required
                  type="text"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <input
                  maxLength={10}
                  placeholder="Price..."
                  required
                  type="text"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <input
                  maxLength={15}
                  placeholder="Contact number..."
                  type="text"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                />
              </div>
              <div className="mb-1 flex flex-col">
                <input
                  maxLength={50}
                  placeholder="Email address..."
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                />
              </div>
            </div>

            <div className="px-2 ">
              <div className="mb-1 flex flex-col">
                <select
                  required
                  value={selectProvince}
                  onChange={(e) => setSelectProvince(e.target.value)}
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                >
                  <option value="">Select Province...</option>
                  {listOfProvince}
                </select>
              </div>
              <div className="mb-1 flex flex-col">
                <select
                  required
                  value={selectDistrict}
                  onChange={(e) => setSelectDistrict(e.target.value)}
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                >
                  <option value="">Select District...</option>
                  {listOfDistrict}
                </select>
              </div>
              <div className="mb-1 flex flex-col">
                <input
                  maxLength={50}
                  placeholder="City or village name..."
                  required
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
                />
              </div>
              <div className="mb-1 flex flex-col">
                {itemInfo && (
                  <p className="px-1 text-sm text-yellow-700">{`You have ${
                    120 - itemInfo?.length
                  } character left...`}</p>
                )}
                <textarea
                  placeholder={`Information ... You have ${
                    120 - itemInfo?.length
                  } character left to write`}
                  required
                  maxLength={120}
                  type="text"
                  value={itemInfo}
                  onChange={(e) => setItemInfo(e.target.value)}
                  className="border border-blue-500 p-1 px-2 rounded-md hover:border-green-500"
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
          </div>
          <div className="text-center mb-3 p-8">
            <button
              onClick={() => {
                if (
                  !itemInfo ||
                  !itemName ||
                  !selectDistrict ||
                  !selectProvince ||
                  !category ||
                  !quantity ||
                  !price ||
                  !email ||
                  !city
                ) {
                  setErrMsg(
                    "Oops! Looks like there are some required fields that need your attention. Please fill in all the fields marked as mandatory to complete the add process."
                  );
                } else if (images?.length && images.length > 4) {
                  setErrMsg("You can upload up to 4 photos only.");
                } else if (
                  itemInfo &&
                  itemName &&
                  selectDistrict &&
                  selectProvince &&
                  category &&
                  quantity &&
                  price &&
                  email &&
                  city
                ) {
                  handleAddItemFormData();
                }
              }}
              className="bg-blue-600 text-white text-lg p-1 mt-2 w-full rounded-lg hover:bg-green-600 shadow-sm"
            >
              Submit
            </button>
            <div className="min-h-[10rem]"></div>
          </div>
        </div>
      </form>

      {isLoading && (
        <>
          <LoadingComponent />
        </>
      )}
    </>
  );
};

export default AddItem;
