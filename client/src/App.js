import React from "react";
import "./App.css";
import useFetchShops from "./hooks/useFetchShops";

function App() {
  const shops = useFetchShops();

  return (
    <main className="App">
      <header className="block mt-6">
        <h1 className="title is-1 has-text-grey-dark">Explore Shops</h1>
      </header>
      <section>
        <ul>
          {!shops ? "Loading..." : shops.map(shop => {
            return <li key={shop.shop_id} className="box shop-card">
              <a href={shop.shop_url} className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img src={shop.avatar_src} />
                  </p>
                </figure>
                <div className="media-content">
                  <p className="is-size-5">{shop.shop_name}</p>
                  {shop.is_vacation
                  ? <span className="tag is-warning is-light">On Vacation</span>
                  : <span className="tag is-success is-light">Active</span>}
                </div>
              </a>
            </li>
          })}
        </ul>
      </section>
    </main>
  );
}

export default App;
