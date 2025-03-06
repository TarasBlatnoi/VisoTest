import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      Hello from Home{" "}
      <button
        onClick={() => {
          navigate("recipes");
        }}
      >
        View Recipes
      </button>
    </div>
  );
}

export default Home;
