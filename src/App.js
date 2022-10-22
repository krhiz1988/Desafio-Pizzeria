import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Detalle from "./components/Detalle";
import Carrito from "./components/Carrito";
import Context from "./Context";
import { useState, useEffect } from "react";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [carritoPizzas, setCarritoPizzas] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const endpoint = "/pizzas.json";
  useEffect(() => {
    const getDataPizzas = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      setPizzas(data);
    };
    getDataPizzas();
  }, []);

  return (
    <Context.Provider
      value={{
        pizzas,
        setPizzas,
        carritoPizzas,
        setCarritoPizzas,
        valorTotal,
        setValorTotal,
      }}
    >
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detalle/:id" element={<Detalle />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
