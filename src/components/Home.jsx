import { Carousel, Row, Container, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../Context";

export default function Home() {
  const { pizzas, setPizzas, carritoPizzas, setCarritoPizzas, setValorTotal } =
    useContext(Context);
  const navigate = useNavigate();
  const pizzaDetalle = (id) => {
    navigate(`/detalle/${id}`);
  };

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

  return (
    <>
      <Carousel controls={false} indicators={false}>
        <Carousel.Item>
          <img className="d-block w-100" src="/img/banner-pizza.jpg" />
        </Carousel.Item>
      </Carousel>
      <Container>
        <Row className="justify-content-center mt-5">
          {pizzas.map((pizza, i) => (
            <Col className="mb-5" xs lg="4" key={i}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={pizza.img} />
                <Card.Body>
                  <Card.Title> {pizza.name} </Card.Title>
                  <hr />
                  <Card.Text>
                    <label style={{ fontWeight: "bold" }}> Ingredientes:</label>
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
                  <hr />
                  <Card.Text>
                    <Col
                      className="text-center"
                      xs
                      lg="12"
                      style={{ fontSize: "28px" }}
                    >
                      {" "}
                      $ {pizza.price}
                    </Col>
                  </Card.Text>
                  <Row>
                    <Col xs lg="6">
                      <Button
                        variant="info"
                        onClick={() => pizzaDetalle(pizza.id)}
                      >
                        <label className="text-white">Ver más</label>{" "}
                        <img
                          style={{ width: "15px", height: "15px" }}
                          src="/icon/ojos.png"
                          alt="image"
                        />
                      </Button>
                    </Col>
                    <Col xs lg="6">
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
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
