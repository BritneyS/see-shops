import React, { useEffect, useState } from "react";

const useFetchShops = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/shops/?limit=5&offset=1")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return data;
}

export default useFetchShops;