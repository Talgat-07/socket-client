import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isValues, setValue] = useState({ name: "", room: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...isValues, [e.target.name]: e.target.value });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isDisabled = Object.values(isValues).some((el) => !el);
    isDisabled && e.preventDefault();
  };

  return (
    <div>
      <form>
        <input
          value={isValues.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="name"
        />
        <input
          value={isValues.room}
          onChange={handleChange}
          type="text"
          name="room"
          placeholder="room"
        />
      </form>
      <Link
        onClick={handleClick}
        to={`chat?name=${isValues.name}&room=${isValues.room}`}
      >
        <button>click</button>
      </Link>
    </div>
  );
};

export default HomePage;
