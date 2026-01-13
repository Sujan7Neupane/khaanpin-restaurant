import { useEffect, useState } from "react";
import "./DishList.css";
import DishCard from "../DishCard/DishCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDishError,
  fetchDishStart,
  fetchDishSuccess,
} from "../../store/dishSlice";

// Currently manually made dishList
// future will make controllers in backend

// const dishesList = [];

const DishList = ({ category }) => {
  // console.log("dishesList", category);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();

  // fetching data from redux store
  const { dishes, loading, error } = useSelector((state) => state.dish);

  useEffect(() => {
    const fetchDishList = async () => {
      try {
        dispatch(fetchDishStart());
        const response = await axios.get(`${backend_url}/api/v1/dish/list`);

        // console.log("DishList", response.data.data.dishes);

        dispatch(fetchDishSuccess(response.data?.data?.dishes));
      } catch (err) {
        dispatch(fetchDishError(err.message));
      }
    };

    fetchDishList();
  }, [dispatch]);

  // if no items in the list
  if (dishes.length === 0) {
    return (
      <div className="loading-div">
        <p className="text-center">No items in the dishes</p>
      </div>
    );
  }

  // when app is loading
  if (loading)
    return (
      <div className="loading-div">
        <p className="text-center">Loading dishes...</p>
      </div>
    );

  // if any errors
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="dish-display container standard-padding">
      {/* Section Title */}
      <h2 className="menu-title">Top Picks</h2>

      {/* Column Container */}
      <div className="dish-list">
        {dishes.map((item, index) => {
          // Display food according to the menu
          console.log("Item category", item);
          console.log("Item", item.name);
          //  cccccc    =====
          if (category === "all" || category === item.name.toLowerCase()) {
            return (
              // display card here
              <DishCard
                // sending data as a props from here to DishCard Component
                // which will be received as a parameter teta like const DishCard({yaha})
                key={index}
                id={item._id}
                name={item.name}
                desc={item.desc}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default DishList;
