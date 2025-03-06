import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      Hello from Home
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={() => {
          navigate("meals");
        }}
      >
        View meals
      </button>
    </div>
  );
}

export default Home;
