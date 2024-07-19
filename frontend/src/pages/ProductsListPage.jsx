import React, { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ProductCard from '../components/ProductCard.jsx';
import axios from 'axios';
import Modal from '../components/Modal.jsx';
import { MdOutlineCancel } from 'react-icons/md';
import Modal2 from '../components/Modal2.jsx';
import { toast } from 'react-toastify';
import url from '../url/url.js';

const ProductsListPage = () => {
  const [productsData, setProductsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [curId, setCurId] = useState(null);
  const [productInput, setProductInput] = useState({
    name: '',
    image: JSON.stringify(['dry_noodle.png']),
    description: '',
    brand: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    cookList: JSON.stringify(['spicyNoodle']),
  });
  const [productInputEdit, setProductInputEdit] = useState({
    name: '',
    image: JSON.stringify(['dry_noodle.png']),
    description: '',
    brand: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    cookList: JSON.stringify(['spicyNoodle']),
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const actionBar = (
    <div>
      <button
        onClick={handleCloseModal}
        className="text-2xl text-gray-400 hover:text-gray-500 duration-75 transition-all"
      >
        <MdOutlineCancel />
      </button>
    </div>
  );

  const actionBar3 = (
    <div>
      <button
        onClick={() => setShowModal3(false)}
        className="text-2xl text-gray-400 hover:text-gray-500 duration-75 transition-all"
      >
        <MdOutlineCancel />
      </button>
    </div>
  );

  useEffect(() => {
    // console.log(curId);
    axios
      .get(`${url}/api/products`)
      .then((res) => {
        setProductsData(res.data);
        // console.log(productsData)
      })
      .catch((err) => console.error(err));

    if (curId && productsData.length > 0) {
      const curProduct = [...productsData].find((pro) => pro.id === curId);

      if (curProduct) {
        const correctFormat = {
          ...curProduct,
          image: JSON.stringify(curProduct.image),
          cookList: JSON.stringify(curProduct.cookList),
        };
        setProductInputEdit(correctFormat);

        console.log('produEdit: ', productInputEdit);
        console.log(curProduct);
      }
    }
  }, [productsData.length, curId]);

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === 'cookList' || name === 'image') {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setProductInput({
        ...productInput,
        [name]: JSON.stringify(selectedOptions),
      });
    } else {
      setProductInput({ ...productInput, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/products`, productInput, {
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('Response:', response.data);

      setProductsData([...productsData, response.data]);

      setProductInput({
        name: '',
        image: JSON.stringify(['dry_noodle.png']),
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        cookList: JSON.stringify(['spicyNoodle']),
      });

      toast('Create a product sucessfully!');
    } catch (error) {
      console.error('Error creating product:', error);
    }

    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${url}/${id}`
      );
      setProductsData(productsData.filter((product) => product.id !== id));
      console.log('Product deleted successfully:', response);

      toast('Delete successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }

    setShowModal2(false);
  };

  const handleConfirmDelete = (id) => {
    setShowModal2(true);
    setCurId(id);
    // console.log('id: ', id);
  };

  const actionBar2 = (
    <div>
      <button
        onClick={() => handleDelete(curId)}
        className="text-2xl text-white hover:bg-red-500 duration-75 transition-all bg-red-400 px-4 py-2 rounded-md mr-2"
      >
        Confirm
      </button>
      <button
        onClick={() => setShowModal2(false)}
        className="text-2xl text-gray-400 hover:bg-gray-100 duration-75 transition-all border px-4 py-2 rounded-md mt-4 md:ml-2"
      >
        Cancel
      </button>
    </div>
  );

  const onOpenEditModal = (idd) => {
    setCurId(idd);
    setShowModal3(true);
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setProductInputEdit({ ...productInputEdit, [name]: value });
    // console.log(e.target.value);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${url}/${curId}`,
        productInputEdit,
        {
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log('Response:', response.data);

      setProductsData([...productsData, response.data]);

      setProductInputEdit({
        name: '',
        image: JSON.stringify(['dry_noodle.png']),
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        cookList: JSON.stringify(['spicyNoodle']),
      });

      toast('Update a product sucessfully!');
    } catch (error) {
      console.error('Error creating product:', error);
    }

    setShowModal3(false);
  };

  return (
    <>
      <div className="relative">
        <div className="flex justify-end">
          <button
            className="border border-green-700
              hover:bg-green-100 duration-75 transition-colors
              flex items-center gap-2 py-3 px-5 my-2 rounded-xl text-green-700"
            onClick={handleOpenModal}
          >
            <IoIosAddCircleOutline className="text-2xl" />
            <span className="font-bold">Add New Product</span>
          </button>
        </div>

        <div className="rounded-xl py-2">
          <div className="flex flex-wrap gap-7">
            {productsData.length > 0 &&
              productsData.map((pro, idx) => (
                <div key={`product_${idx}`} className="mt-2">
                  <ProductCard
                    product={pro}
                    onOpenEditModal={onOpenEditModal}
                    onConfirmDelete={handleConfirmDelete}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* MODAL FOR CREATE */}
      {showModal && (
        <Modal onClose={handleCloseModal} actionBar={actionBar}>
          <form className="min-w-md" onSubmit={handleSubmit}>
            {/* NAME  */}
            <div className="relative z-0 w-full mb-5 group mt-3">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={productInput.name}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Name
              </label>
            </div>

            {/* DECRIPTION  */}
            <div className="relative z-0 w-full mb-5 group mt-6">
              <textarea
                rows="2"
                name="description"
                id="description"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={productInput.description}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            {/* BRAND / CATEGORY / cookList  / IMAGE*/}
            <div className="grid md:grid-cols-4 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInput.brand}
                  onChange={handleChange}
                />
                <label
                  htmlFor="brand"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Brand
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInput.category}
                  onChange={handleChange}
                />
                <label
                  htmlFor="category"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Category
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="cookList"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cook List
                </label>
                <select
                  id="cookList"
                  name="cookList"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  // value={productInput.cookList}
                  onChange={handleChange}
                  // multiple
                >
                  <option defaultValue="spicyNoodle">Spicy Noodle</option>
                  <option value="brokenRice">Broken Rice</option>
                  <option value="springRoll">Spring Roll</option>
                  <option value="chickenNoodle">Chicken Noodle</option>
                </select>
              </div>
              {/* IMAGE  */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Image
                </label>
                <select
                  id="image"
                  name="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  // value={productInput.image[0]}
                  onChange={handleChange}
                  // multiple
                  // value={JSON.parse(productInput.image)[0]}
                >
                  <option value="mama.png">mama.png</option>
                  <option value="dry_noodle.png">dry_noodle.png</option>
                  <option value="beefLean_meat.png">beefLean_meat.png</option>
                  <option value="porkPattyRoll.png">porkPattyRoll.png</option>
                  <option value="yellowOnion.png">yellowOnion.png</option>
                  <option value="beanSprouts.png">beanSprouts.png</option>
                  <option value="shrimpPaste.png">shrimpPaste.png</option>
                  <option value="sateSauce.png">sateSauce.png</option>
                  <option value="greenOnion.png">greenOnion.png</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-4 md:gap-6">
              {/* PRICE  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInput.price}
                  onChange={handleChange}
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price
                </label>
              </div>

              {/* COUNTINSTOCK  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInput.countInStock}
                  onChange={handleChange}
                />
                <label
                  htmlFor="countInStock"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Count In Stock
                </label>
              </div>

              {/* Rating  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInput.value}
                  onChange={handleChange}
                  max={5}
                  min={0}
                />
                <label
                  htmlFor="rating"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Rating
                </label>
              </div>

              {/* NUMBER OF REVIEW */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="numReviews"
                  id="numReviews"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInput.numReviews}
                  onChange={handleChange}
                />
                <label
                  htmlFor="numReviews"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Number of Reviews
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-red-300 to-green-300  hover:bg-gradient-to-r hover:from-green-300 hover:to-red-400 duration-75 transition-colors font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                CREATE
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL FOR DELETE  */}
      {showModal2 && (
        <Modal2 onClose={() => setShowModal2(false)} actionBar={actionBar2}>
          <p className="text-2xl front-bold flex justify-center">
            Are you sure? Do you want to detele this product?
          </p>
        </Modal2>
      )}

      {/* MODAL FOR UPDATE  */}
      {showModal3 && (
        <Modal onClose={() => setShowModal3(false)} actionBar={actionBar3}>
          <form className="min-w-md" onSubmit={handleSubmit2}>
            {/* NAME  */}
            <div className="relative z-0 w-full mb-5 group mt-3">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                value={productInputEdit.name}
                onChange={handleChange2}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Name
              </label>
            </div>

            {/* DECRIPTION  */}
            <div className="relative z-0 w-full mb-5 group mt-6">
              <textarea
                rows="2"
                name="description"
                id="description"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={productInputEdit.description}
                onChange={handleChange2}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            {/* BRAND / CATEGORY / cookList  / IMAGE*/}
            <div className="grid md:grid-cols-4 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInputEdit.brand}
                  onChange={handleChange2}
                />
                <label
                  htmlFor="brand"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Brand
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="category"
                  id="category"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInputEdit.category}
                  onChange={handleChange2}
                />
                <label
                  htmlFor="category"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Category
                </label>
              </div>

              {/* COOK-LIST  */}
              {/* <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="cookList"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cook List
                </label>
                <select
                  id="cookList"
                  name="cookList"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  onChange={handleChange2}
                >
                  {[
                    'spicyNoodle',
                    'brokenRice',
                    'springRoll',
                    'chickenNoodle',
                  ].map((el, idx) =>
                    productInputEdit.cookList === el ? (
                      <option defaultValue={el}>{el}</option>
                    ) : (
                      <option value={el}>{el}</option>
                    )
                  )}
                </select>
              </div> */}

              {/* IMAGE  */}
              {/* <div className="sm:col-span-1">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Image
                </label>
                <select
                  id="image"
                  name="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange2}
                  defaultValue={productInputEdit.image}
                >
                  {[
                    'mama.png',
                    'dry_noodle.png',
                    'beefLean_meat.png',
                    'porkPattyRoll.png',
                    'yellowOnion.png',
                    'beanSprouts.png',
                    'shrimpPaste.png',
                    'sateSauce.png',
                    'greenOnion.png',
                  ].map((el, idx) =>
                    productInputEdit.image[0] === el ? (
                      <option defaultValue={el}>{el}</option>
                    ) : (
                      <option value={el}>{el}</option>
                    )
                  )}
                </select>
              </div> */}
            </div>

            <div className="grid md:grid-cols-4 md:gap-6">
              {/* PRICE  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInputEdit.price}
                  onChange={handleChange2}
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price
                </label>
              </div>

              {/* COUNTINSTOCK  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="countInStock"
                  id="countInStock"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInputEdit.countInStock}
                  onChange={handleChange2}
                />
                <label
                  htmlFor="countInStock"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Count In Stock
                </label>
              </div>

              {/* Rating  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInputEdit.rating}
                  onChange={handleChange2}
                  max={5}
                  min={0}
                />
                <label
                  htmlFor="rating"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Rating
                </label>
              </div>

              {/* NUMBER OF REVIEW */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="numReviews"
                  id="numReviews"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={productInputEdit.numReviews}
                  onChange={handleChange2}
                />
                <label
                  htmlFor="numReviews"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Number of Reviews
                </label>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-red-300 to-green-300  hover:bg-gradient-to-r hover:from-green-300 hover:to-red-400 duration-75 transition-colors font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                UPDATE
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProductsListPage;
