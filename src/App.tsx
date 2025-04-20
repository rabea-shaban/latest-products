import "./App.css";
import ModelUi from "./UI/ModelUI";
import ProductCard from "./components/ProductCard";
import { categories, colors, formInputList, productList } from "./Data/Index";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import { IProduct } from "./interfaces/interfaces";
import { ProductValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircelColor from "./components/CircelColor";
import { v4 as uuid } from "uuid";
import Selecte from "./UI/Select";
import { ProductNameType } from "./Types";
import { toast } from "react-hot-toast";

function App() {
  const DefaultProductObj = {
    title: "",
    price: "",
    description: "",
    imageURL: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  // *** STATE ***
  const [products, setproducts] = useState<IProduct[]>(productList);
  const [product, setproduct] = useState<IProduct>(DefaultProductObj);
  let [isOpen, setIsOpen] = useState(false);
  let [isOpeEdit, setIsOpeEdit] = useState(false);
  let [isOpeDelete, setIsOpeDelete] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [Selected, setSelected] = useState(categories[0]);
  const [err, setError] = useState({
    title: "",
    price: "",
    description: "",
    imageURL: "",
    colors: [] as string[],
  });
  const [productEdit, setproductEdit] = useState<IProduct>(DefaultProductObj);
  const [productEditIdx, setproductEditIdx] = useState<number>(0);
  // *** HANDLERS ***
  const defultvalue = () => {
    setproduct(DefaultProductObj);
    setTempColors([]);
    closeModal();
    closeModalEdit();
  };
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const closeModalEdit = () => setIsOpeEdit(false);
  const openModalEdit = () => setIsOpeEdit(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setproduct((prev) => ({
      ...prev,
      [name]: value, // ✅ تحديث الحقل الصحيح
    }));
  };

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setproductEdit({ ...productEdit, [name]: value });
    setError({ ...err, [name]: "" });
  };

  const onCancel = () => {
    defultvalue();
  };
  const onCancelEdit = () => {
    closeModalEdit();
  };

  const submitHandelar = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, price, description, imageURL } = product;

    // ** التحقق من القيم المدخلة **
    const errors = ProductValidation({
      title,
      price,
      description,
      imageURL,
      colors: tempColors.length > 0 ? tempColors : [], // ✅ لا نرسل مصفوفة تحتوي على عنصر فارغ
    });

    setError(errors);

    // ** إذا وُجدت أي أخطاء، لا تقم بإضافة المنتج **
    if (
      errors.title ||
      errors.price ||
      errors.description ||
      errors.imageURL ||
      errors.colors.length > 0
    ) {
      return;
    }

    // ** إضافة المنتج الجديد إلى القائمة **
    setproducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors.length ? tempColors : ["#000"],
        category: Selected,
      },
      ...prev,
    ]);
    defultvalue();
  };

  // التعديل

  const submitEditHandelar = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, price, description, imageURL } = productEdit;

    // ** التحقق من القيم المدخلة **
    const errors = ProductValidation({
      title,
      price,
      description,
      imageURL,
      colors: tempColors.length > 0 ? tempColors : [], // ✅ لا نرسل مصفوفة تحتوي على عنصر فارغ
    });

    setError(errors);

    // ** إذا وُجدت أي أخطاء، لا تقم بإضافة المنتج **
    if (
      errors.title ||
      errors.price ||
      errors.description ||
      errors.imageURL
    ) {
      return;
    }
    console.log(err);

    const updateProducts = [...products];
    updateProducts[productEditIdx] = { ...productEdit, colors: tempColors.concat(productEdit.colors) };
    setproducts(updateProducts);
    defultvalue();
  };

  // *** RENDER FUNCTIONS ***
  const renderErrColor = err.colors.length > 0 && (
    <ErrorMessage msg={err.colors.join(", ")} />
  );

  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      openModalEdit={openModalEdit}
      setproductEdit={setproductEdit}
      product={product}
      Idx={idx}
      setproductEditIdx={setproductEditIdx}
      isOpeDelete={() => setIsOpeDelete(true)}

    />
  ));

  const renderFormInputList = formInputList.map((input) => (
    <div className="flex flex-col mb-2 mt-2" key={input.id}>
      <label className="mb-[2px] text-sm text-gray-700" htmlFor={input.id}>
        {input.label}
      </label>
      <Input
        type={input.type}
        id={input.id}
        name={input.name}
        value={product[input.name]} // ✅ تأكد من أن القيمة مأخوذة من `product`
        onChange={onChangeHandler} // ✅ تأكد أنه يتم تمرير `onChangeHandler`
      />

      <ErrorMessage msg={err[input.name]} />
    </div>
  ));

  const renderCircelColor = colors.map((color) => (
    <CircelColor
      bgColor={color}
      key={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductEditWithErorr = (
    id: string,
    label: string,
    name: ProductNameType
  ) => {
    return (
      <div className="flex flex-col mb-2 mt-2">
        <label className="mb-[2px] text-sm text-gray-700" htmlFor={id}>
          {label}
        </label>

        <Input
          type="text"
          id={"title"}
          name={name}
          value={productEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={err[name]} />
      </div>
    );
  };

  // *** END RENDER FUNCTIONS ***

  // *** DELETE HANDLERS ***
  const closeModalDelete = () => setIsOpeDelete(false);
  const removeProduct = () => {
    console.log("product Delete id ", productEdit.id)
    const Filter = products.filter((product) => product.id !== productEdit.id)
    setproducts(Filter)
    toast.success("Product Deleted Successfully")
    closeModalDelete();
  }


  // *** END DELETE HANDLERS ***

  return (
    <>
      <main className="container lg:px-10 xl:px-40 mx-auto">
        <div className="my-15 flex px-5 items-center justify-between">
          <h2 className="text-4xl font-bold">
            Latest<span className="text-indigo-600 "> Products</span>
          </h2>

          <Button
            className="w-fit bg-indigo-600 hover:bg-indigo-600 mt-5"
            onClick={openModal}
          >
            Add New Product
          </Button>
        </div>

        <ModelUi
          isOpen={isOpen}
          closeModal={closeModal}
          title="Add A New Product"
        >
          <form onSubmit={submitHandelar} className="flex flex-col space-y-4">
            {renderFormInputList}
            <div>
              <Selecte selected={Selected} setSelected={setSelected} />
            </div>
            <div className="flex space-x-1 flex-wrap gap-1">
              {tempColors.map((color) => (
                <span
                  className="p-1 rounded-[10px] text-white"
                  style={{ background: color }}
                  key={color}
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center my-4 space-x-1">
              {renderCircelColor}
            </div>
            {renderErrColor}
            <div className="flex items-center space-x-3">
              <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
                Submit
              </Button>
              <Button
                onClick={onCancel}
                className="w-full bg-red-700 hover:bg-red-600"
              >
                Cancel
              </Button>
            </div>
          </form>
        </ModelUi>
        {/* *Edit Model */}
        <ModelUi
          isOpen={isOpeEdit}
          closeModal={closeModalEdit}
          title=" Edit Product"
        >
          <form
            onSubmit={submitEditHandelar}
            className="flex flex-col space-y-4"
          >
            {renderProductEditWithErorr("title", "Product Title", "title")}
            {renderProductEditWithErorr(
              "description",
              "Product Description",
              "description"
            )}
            {renderProductEditWithErorr(
              "imageURL",
              "Product Image URL",
              "imageURL"
            )}

            {renderProductEditWithErorr("price", "Product Price", "price")}

            <div>
              <Selecte selected={productEdit.category} setSelected={value => setproductEdit({ ...productEdit, category: value })} />
            </div>

            <div>
              <div className="flex space-x-1 flex-wrap gap-1">
                {tempColors.concat(productEdit.colors).map((color) => (
                  <span
                    className="p-1 rounded-[10px] text-white"
                    style={{ background: color }}
                    key={color}
                  >
                    {color}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center my-4 space-x-1">
                {renderCircelColor}
              </div>
              {renderErrColor}
            </div>


            <div className="flex items-center space-x-3">
              <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
                Submit
              </Button>
              <Button
                onClick={onCancelEdit}
                className="w-full bg-red-700 hover:bg-red-600"
              >
                Cancel
              </Button>
            </div>
          </form>
        </ModelUi>

        <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {renderProductList}
        </div>
      </main>

      {/* Delete Modal */}
      <ModelUi
        isOpen={isOpeDelete}
        closeModal={closeModalDelete}
        title="Delete Product"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Are you sure you want to delete this product?
          </h2>
          <div className="flex items-center gap-3 mt-5">
            <Button
              className="w-full bg-red-500 hover:bg-red-600"
              onClick={removeProduct}
            >
              Delete
            </Button>
            <Button
              className="w-full bg-indigo-500 hover:bg-indigo-600"
              onClick={closeModalDelete}
            >
              Cancel
            </Button>
          </div>
        </div>
      </ModelUi>
    

    </>
  );
}

export default App;
