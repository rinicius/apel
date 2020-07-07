import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import api from "../../services/api";

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
      <div>
        <Header
          as="h3"
          textAlign="center"
          style={{
            padding: "15px 15px 2px 15px",
            display: "flex",
            alignItens: "center",
            justifyContent: "center",
          }}
        >
          Produtos em falta na região
        </Header>
        <div>
          <div
            className="product-list"
            style={{
              maxWidth: "700px",
              padding: "1px 10px",
              margin: "1px auto 0",
            }}
          >
            {products.map((product) => (
              <article
                key={product._id}
                style={{ borderRadius: "5px", padding: "10px" }}
              >
                <Header
                  as="h5"
                  textAlign="left"
                  style={{
                    fontSize: "1.3em",
                    padding: "0 0 0 0",
                  }}
                >
                  <Header.Content> {product.nome}</Header.Content>
                </Header>
                <p>{product.descricao}</p>
              </article>
            ))}

            <div className="actions">
              <button disabled={page === 1} onClick={this.prevPage}>
                Anterior
              </button>
              <button
                disabled={page === this.state.productInfo.pages}
                onClick={this.nextPage}
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
