import React, { Suspense } from 'react';

const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<>Loading....</>}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;