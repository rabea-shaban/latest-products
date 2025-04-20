import Button from "../UI/Button";
import Image from "./Image";
import { IProduct } from "../interfaces/interfaces";
import { txtSlicer } from "../utils/function";
import CircelColor from "./CircelColor";

interface IProps {
  product: IProduct;
  setproductEdit: (product: IProduct) => void;
  openModalEdit: () => void;
  setproductEditIdx: (value: number) => void;
  Idx: number;
  isOpeDelete: () => void;


}
const ProductCard = ({ product, setproductEdit, openModalEdit, setproductEditIdx, Idx, isOpeDelete, }: IProps) => {
  const { category, colors, description, imageURL, price, title } = product;
  //** Render
  const renderCircelColor = colors.map((color) => (
    <CircelColor bgColor={color} key={color} />
  ));
  // ** HandleR
  const onEdit = () => {
    openModalEdit();
    setproductEditIdx(Idx)
  };
  const onDelet = () => {
    setproductEdit(product);
    isOpeDelete()

  }


  return (
    <div className=" max-w-sm  md:max-w-lg mx-auto md:mx-0  border rounded-md  border-gray-200 p-2 flex flex-col">
      <Image
        imageUrl={imageURL}
        alt="Image one "
        className="w-full lg:object-cover rounded-md h-52"
      />
      <h3>{txtSlicer(title, 20)}</h3>
      <p className="text-gray-400 mt-2">{txtSlicer(description)}</p>
      <div className="flex flex-wrap items-center my-4 space-x-1 ">
        {renderCircelColor}
      </div>

      <div className="flex justify-between items-center">
        <span>${price}</span>
        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex  space-x-2 justify-between items-center mt-5">
        <Button
          onClick={onEdit}
          className="w-full bg-indigo-500 hover:bg-indigo-600 "
        >
          Edit
        </Button>
        <Button className="w-full bg-red-500 hover:bg-red-600 " onClick={onDelet}>Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
