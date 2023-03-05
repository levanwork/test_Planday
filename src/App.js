import React, { useState, useEffect } from "react";

import AppView from "./AppView";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [page, setPage] = useState(1);

  const PER_PAGE = 6;
  const totalPages = Math.ceil(data.length / PER_PAGE);

  let map = new WeakMap();
  let index = 0;

  const weakKey = (data) => {
    var key = map.get(data);
    if (!key) {
      key = 'weak-key-' + index++;
      map.set(data, key);  
    }
    return key;
  }

  const handleData = (data) => {
    const startPoint = PER_PAGE * page - PER_PAGE;
    const endPoint = PER_PAGE * page;
    return data.slice(startPoint, endPoint)
  };

  const visibleItems = (data, search) => {
    const output = handleData(data);
    if (search.length === 0) {
      return output.map(item => ({...item, id: weakKey({item})}));
    }
    return data.filter(item => item.title.indexOf(search) > -1).map(item => ({...item, id: weakKey({item})}));
  };

  const handleChange = (e, p) => setPage(p);

  useEffect(() => {
    fetch('data.json')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => console.error(e))
  },[])

  return (
    <AppView
      data={data}
      visibleItems={visibleItems(data, search)}
      search={search}
      setSearch={setSearch}
      selected={selected}
      setSelected={setSelected}
      count={totalPages}
      page={page}
      handleChange={handleChange}
    />
  );
}

export default App;
