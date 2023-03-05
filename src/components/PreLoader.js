import React, { useEffect, useState } from "react";

import useProgressiveImage from "../hooks/proImage";

const PreLoader = ({source, placeholder, page}) => {
  const [src, setSrc] = useState('');
  const loaded = useProgressiveImage(source);

  useEffect(() => {
    setSrc(loaded);
  }, [loaded]);

  useEffect(() => {
    setSrc("");
  }, [page]);

  return (
    <div style={{
      width: '64px',
      height: '64px',
      display: "inline-block",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundImage: `url(${src || placeholder})`
    }} />
  )
}

export default PreLoader;
