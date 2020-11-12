import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import api from "../../services/api";
import { BsChevronRight, BsChevronLeft, BsFillTagFill } from "react-icons/bs";

import "./styles.css";

class Index extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async (page = 1) => {
    const response = await api.get(`/produto?page=${page}`);
    const { docs, ...productInfo } = response.data;
    this.setState({ products: docs, productInfo, page });
  };

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadUser(pageNumber);
  };

  prevPage = () => {
    if (this.state.page < 1) return;

    this.loadUser(this.state.page - 1);
  };

  render() {
    const { products, page } = this.state;
    document.body.style.overflow = "hidden";

    return (
      <div
        style={{
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <Header
          as="h2"
          textAlign="center"
          style={{
            maxWidth: "300px",
            padding: "15px 15px 0 15px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "13px",

            // backgroundColor: "#0e7ba8",
            // borderRadius: "5px",
          }}
        >
          Produtos em falta na região
        </Header>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className="product-list"
            style={{
              minWidth: "200px",
              maxWidth: "700px",
              padding: "1px 10px",
              margin: "1px auto 0",
            }}
          >
            {products.map((product) => (
              <div style={{ display: "flex" }}>
                <BsFillTagFill size={25} style={{ margin: "5px" }} />
                <article
                  key={product._id}
                  style={{
                    padding: "5px",
                    backgroundColor: "transparent",
                    border: "0",
                  }}
                >
                  <Header
                    as="h5"
                    textAlign="left"
                    style={{
                      fontSize: "1.3em",
                      maxWidth: "150px",
                      margin: "0",
                    }}
                  >
                    <Header.Content> {product.nome}</Header.Content>
                  </Header>
                  <p style={{ color: "#242424", bold: "600" }}>
                    {product.descricao}
                  </p>
                </article>
              </div>
            ))}

            <div className="actions">
              <button disabled={page === 1} onClick={this.prevPage}>
                <BsChevronLeft />
              </button>
              <button
                disabled={page === this.state.productInfo.pages}
                onClick={this.nextPage}
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
