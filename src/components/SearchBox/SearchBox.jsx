import { setFilter } from "../../redux/filtersSlice";
import { selectFilter } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

// import { nanoid } from "@reduxjs/toolkit";

// const filterInputId = nanoid();

const SearchBox = () => {
  const { filter } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value.trim().toLowerCase()));
  };
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        // onChange={(e) => onFilter(e.target.value)}
        // id={filterInputId}
      />
    </div>
  );
};

export default SearchBox;
