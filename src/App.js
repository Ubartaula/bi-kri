// import HomePage from "./component/HomePage";
// import AddItem from "./feature/item/AddItem";
// import IndividualItem from "./feature/item/IndividualItem";
// import Login from "./feature/auth/Login";
// import PersistLogin from "./feature/auth/PersistLogin";
// import Logout from "./feature/auth/Logout";
// import ListUser from "./feature/user/ListUser";
// import Prefetch from "./feature/auth/Prefetch";
// import NotFound from "./component/NotFound";
// import RootLayout from "./component/RootLayout";
// import AddUser from "./feature/user/AddUser";
// import EditUser from "./feature/user/EditUser";
// import RequireAuth from "./feature/auth/RequireAuth";

// import ResetPassword from "./feature/auth/ResetPassword";
// import Test from "./component/Test";
// import EditItem from "./feature/item/EditItem";
// import UserItemsGridList from "./feature/item/UserListItem";
// import UserSetting from "./feature/user/UserSetting";
// import ListItem from "./feature/item/ListItem";

// import EmailConfirm from "./feature/auth/EmailConfirm";
import { Suspense, lazy } from "react";
import { ROLE } from "./config/ROLE";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import(`./component/HomePage`));
const AddItem = lazy(() => import(`./feature/item/AddItem`));
const IndividualItem = lazy(() => import(`./feature/item/IndividualItem`));
const Login = lazy(() => import(`./feature/auth/Login`));
const PersistLogin = lazy(() => import(`./feature/auth/PersistLogin`));
const Logout = lazy(() => import(`./feature/auth/Logout`));
const ListUser = lazy(() => import(`./feature/user/ListUser`));
const Prefetch = lazy(() => import(`./feature/auth/Prefetch`));
const NotFound = lazy(() => import(`./component/NotFound`));
const RootLayout = lazy(() => import(`./component/RootLayout`));
const AddUser = lazy(() => import(`./feature/user/AddUser`));
const EditUser = lazy(() => import(`./feature/user/EditUser`));
const RequireAuth = lazy(() => import(`./feature/auth/RequireAuth`));
const ResetPassword = lazy(() => import(`./feature/auth/ResetPassword`));
const Test = lazy(() => import(`./component/Test`));
const EditItem = lazy(() => import(`./feature/item/EditItem`));
const UserListItem = lazy(() => import(`./feature/item/UserListItem`));
const UserSetting = lazy(() => import(`./feature/user/UserSetting`));
const ListItem = lazy(() => import(`./feature/item/ListItem`));
const EmailConfirm = lazy(() => import(`./feature/auth/EmailConfirm`));

function App() {
  return (
    <Suspense fallback="route is loading...">
      <Routes>
        <Route
          element={
            <Suspense fallback="prefetch is loading...">
              <Prefetch />
            </Suspense>
          }
        >
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="test" element={<Test />} />
            <Route path="login" element={<Login />} />
            <Route path="email-confirm" element={<EmailConfirm />} />
            <Route path="reset" element={<ResetPassword />} />

            <Route path="items">
              <Route index element={<ListItem />} />
              <Route path="new" element={<AddItem />} />
              <Route path=":id" element={<EditItem />} />
              <Route path=":id/single" element={<IndividualItem />} />
            </Route>

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth authRole={Object.values(ROLE)} />}>
                <Route path="dash">
                  <Route index element={<HomePage />} />
                  <Route path="logout" element={<Logout />} />

                  <Route path="items">
                    <Route index element={<ListItem />} />
                    <Route path="new" element={<AddItem />} />
                    <Route path=":id" element={<EditItem />} />
                    <Route path=":id/single" element={<IndividualItem />} />
                  </Route>

                  <Route path="profile">
                    <Route index element={<UserListItem />} />
                    <Route path="setting" element={<UserSetting />} />
                  </Route>

                  <Route
                    element={<RequireAuth authRole={["Manager", "Super"]} />}
                  >
                    <Route path="users">
                      <Route index element={<ListUser />} />
                      <Route path="new" element={<AddUser />} />
                      <Route path=":id" element={<EditUser />} />
                    </Route>
                  </Route>
                  {/*  */}
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
