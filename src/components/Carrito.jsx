import { Row, Container, Col, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Context from "../Context";

export default function Carrito() {
  const [listPizza, setListPizza] = useState([]);
  const { carritoPizzas, setCarritoPizzas, valorTotal, setValorTotal } =
    useContext(Context);

  const deletePizza = (id) => {
    const carritoIndex = carritoPizzas.find((p) => p.id === id);

    carritoPizzas.splice(carritoIndex, 1);
    setCarritoPizzas([...carritoPizzas]);
    for (const producto of carritoPizzas) {
      let total = 0;

      if (producto.id === id) {
        total = total + producto.price;

        setValorTotal(total);
      }
    }
    if (carritoPizzas.length == 0) {
      setValorTotal(0);
    }
    calcularDatalle(carritoPizzas);
  };
  const getTotalPorPizza = (cantidad, precio) => {
    let total = 0;
    total = precio * cantidad;
    return total;
  };

  const disCantidad = (id) => {
    for (const producto of listPizza) {
      let total = valorTotal;

      if (producto.id === id) {
        producto.cantidad = producto.cantidad - 1;
        total = total - producto.price;

        setValorTotal(total);
        setListPizza([...listPizza]);
      }
    }
  };
  const auCantidad = (id) => {
    let total = valorTotal;
    for (const producto of listPizza) {
      if (producto.id === id) {
        producto.cantidad = producto.cantidad + 1;
        total = total + producto.price;

        setValorTotal(total);
        setListPizza([...listPizza]);
      }
    }
  };
  const calcularDatalle = (carritoPizzas) => {
    let total = 0;
    let productos = [];
    for (const producto of carritoPizzas) {
      const encontrarPizza = productos.filter(
        (p) => p["id"] === producto["id"]
      );
      if (encontrarPizza.length === 0) {
        const newPizza = { ...producto, cantidad: 1 };
        productos.push(newPizza);
      } else {
        encontrarPizza[0].cantidad += 1;
      }

      total += producto.price;
      setValorTotal(total);
    }
    setListPizza(productos);
  };
  useEffect(() => {
    calcularDatalle(carritoPizzas);
  }, []);
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col
            className="mt-5 p-3"
            xs
            lg="10"
            style={{ backgroundColor: "#f3f3f3" }}
          >
            <Row className="justify-content-between">
              {listPizza.map((pizza, index) => (
                <Col className="mt-2" xs lg="12" key={index}>
                  <Row className="justify-content-between">
                    <Col xs lg="4">
                      <img
                        style={{ width: "55px", height: "55px" }}
                        src={pizza.img}
                        alt="image"
                      />{" "}
                      <label>{pizza.name}</label>
                    </Col>
                    <Col xs lg="4">
                      {getTotalPorPizza(pizza.cantidad, pizza.price)}
                      <Button
                        variant="danger"
                        onClick={() => disCantidad(pizza.id)}
                      >
                        -
                      </Button>
                      <label className="m-2">{pizza.cantidad}</label>
                      <Button
                        variant="primary"
                        onClick={() => auCantidad(pizza.id)}
                      >
                        +
                      </Button>
                      <Button
                        className="m-2"
                        variant="danger"
                        onClick={() => deletePizza(pizza.id)}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                  <hr />
                </Col>
              ))}
            </Row>
            <Row>
              <Col xs lg="12">
                <h2>Total: $ {valorTotal}</h2>
              </Col>
              <Col xs lg="12">
                {" "}
                <Button variant="success">Ir a pagar</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
