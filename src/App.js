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
const LoadingComponent = lazy(() => import(`./lib/LoadingComponent`));

function App() {
  return (
    <Suspense fallback="route is loading...">
      <Routes>
        <Route
          element={
            <Suspense fallback={<LoadingComponent />}>
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
