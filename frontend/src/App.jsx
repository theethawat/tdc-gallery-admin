/* eslint-disable react/jsx-wrap-multilines */
import { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Auth, Home, Management } from "./views";
import * as actions from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.meGet());
    return () => {};
  }, []);

  return (
    <div>
      <BrowserRouter>
        {window.localStorage.getItem("TDC_TOKEN") ? (
          <Routes>
            <Route path='management'>
              <Route path='user' element={<Management.ManagementUser />} />
              <Route path='place'>
                <Route index element={<Management.ManagementPlace />} />
                <Route path='create' element={<Management.CreatePlace />} />
                <Route path='edit/:id' element={<Management.EditPlace />} />
              </Route>
              <Route path='category'>
                <Route index element={<Management.ManagementCategory />} />
                <Route path='create' element={<Management.CreateCategory />} />
                <Route path='edit/:id' element={<Management.EditPlace />} />
              </Route>
            </Route>
            {/* <Route path='product'>
              <Route index element={<Management.ManagementProduct />} />
              <Route
                path='create'
                element={<Management.CreateProduct />}
              />{" "}
              <Route path='edit/:id' element={<Management.EditProduct />} />
            </Route> */}

            <Route path='dashboard'>
              <Route index element={<div>dashboard index</div>} />
            </Route>
            <Route index element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route>
              <Route path='login' element={<Auth.Login />} />
              <Route index element={<Auth.Login />} />
              <Route path='*' element={<Auth.Login />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
