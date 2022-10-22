import { Row, Container, Col, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Context from "../Context";

export default function Detalle() {
  const { id } = useParams();
  const { pizzas, setPizzas, carritoPizzas, setCarritoPizzas, setValorTotal } =
    useContext(Context);
  const [pizza, setPizza] = useState();

  const setCarrito = (id) => {
    const dataPizza = pizzas.find((p) => {
      return p.id === id;
    });
    let total = 0;
    carritoPizzas.push(dataPizza);
    for (const p of carritoPizzas) {
      total += p.price;
      setValorTotal(total);
    }
  };

  useEffect(() => {
    if (pizzas.length > 0) {
      const getPizza = async (id) => {
        const dataPizza = pizzas.find((p) => {
          return p.id === id;
        });

        if (dataPizza) {
          setPizza(dataPizza);
        }
      };

      getPizza(id);
    }
  }, [id]);

  if (pizza) {
    return (
      <>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs lg="10">
              <Card style={{ width: "58rem" }}>
                <Row className="no-gutters">
                  <Col md={5} lg={5}>
                    <Card.Img variant="top" src={pizza.img} />
                  </Col>
                  <Col md={7}>
                    <Card.Body>
                      <Card.Title>{pizza.name}</Card.Title>
                      <hr />
                      <Card.Text>{pizza.desc}</Card.Text>
                      <Card.Text>
                        <label style={{ fontWeight: "bold" }}>
                          {" "}
                          Ingredientes:
                        </label>
                        <Row>
                          {pizza.ingredients.map((ingrediente, index) => (
                            <Col xs sm="12" key={index}>
                              <img
                                style={{ width: "15px", height: "15px" }}
                                src="/icon/pizza.png"
                                alt="image"
                              />{" "}
                              <label>{ingrediente}</label>
                            </Col>
                          ))}
                        </Row>
                      </Card.Text>
                      <Row className="justify-content-end">
                        <h3>Precio: $ {pizza.price}</h3>
                        <Col className="justify-content-end" xs lg="3">
                          <NavLink to="/">
                            <Button variant="primary">
                              <label>volver</label>
                            </Button>
                          </NavLink>
                        </Col>
                        <Col className="justify-content-end" xs lg="3">
                          <Button
                            variant="danger"
                            onClick={() => setCarrito(pizza.id)}
                          >
                            <label>Añadir</label>{" "}
                            <img
                              style={{ width: "15px", height: "15px" }}
                              src="/icon/carrito.png"
                              alt="image"
                            />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
