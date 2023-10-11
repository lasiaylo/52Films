import React, { useState, useEffect, Suspense, lazy } from 'react';

const Dump = lazy(() => import('./dump'));

const DumpLazy = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      { !isMounted ? null : (
        <Suspense>
          <Dump {...props}/>
        </Suspense>
      )}
    </>
  );
};

export default DumpLazy;