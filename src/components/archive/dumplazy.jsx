import React, { useState, useEffect, Suspense, lazy } from "react";

const Dump = lazy(() => import("./dump"));

const DumpLazy = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {!isMounted ? null : (
        <Suspense fallback={null}>
          <Dump {...props} />
        </Suspense>
      )}
    </>
  );
};

export default DumpLazy;
