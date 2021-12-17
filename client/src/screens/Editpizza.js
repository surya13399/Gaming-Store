import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
export default function Editpizza({ match }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [PCprice, setPCprice] = useState();
  const [PS5price, setPS5price] = useState();
  const [Xboxprice, setXboxprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);

  const { pizza, error, loading } = getpizzabyidstate;

  const editpizzastate = useSelector((state) => state.editPizzaReducer)
  const {editloading , editerror , editsuccess} = editpizzastate;

  useEffect(() => {

    if(pizza)
    {
        if(pizza._id==match.params.pizzaid)
        {
            setname(pizza.name)
            setdescription(pizza.description)
            setcategory(pizza.category)
            setPCprice(pizza.prices[0]['PC'])
            setPS5price(pizza.prices[0]['PS5'])
            setXboxprice(pizza.prices[0]['Xbox'])
            setimage(pizza.image)
        }
        else{
            dispatch(getPizzaById(match.params.pizzaid));
        }
        
    }
    else{
        dispatch(getPizzaById(match.params.pizzaid));
    }



  }, [pizza , dispatch]);

  function formHandler(e) {
    e.preventDefault();

    const editedpizza = {
      _id : match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        PC: PCprice,
        PS5: PS5price,
        Xbox: Xboxprice,
      },
    };

    dispatch(editPizza(editedpizza))
  }

  return (
    <div>
    
     

      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
      <h1>Edit Pizza</h1>
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editsuccess && (<Success success='Pizza details edited successfully'/>)}
        {editloading && (<Loading />)}

        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="PC varient price"
            value={PCprice}
            onChange={(e) => {
              setPCprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="PS5 varient price"
            value={PS5price}
            onChange={(e) => {
              setPS5price(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Xbox varient price"
            value={Xboxprice}
            onChange={(e) => {
              setXboxprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="category"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="image url"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Edit Pizza
          </button>
        </form>
      </div>
    </div>
  );
}
