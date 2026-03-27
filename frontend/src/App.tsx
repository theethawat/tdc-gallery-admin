import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { ErrorComponent } from "./components/refine-ui/layout/error-component";
import { Layout } from "./components/refine-ui/layout/layout";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { ImagesIcon, ImageIcon, TagsIcon } from "lucide-react";

import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/galleries/categories";
import {
  ArticleCreate,
  ArticleEdit,
  ArticleList,
  ArticleShow,
} from "./pages/galleries/articles";
import { ForgotPassword } from "./pages/forgot-password";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { authProvider } from "./providers/auth";
import { dataProvider } from "./providers/data";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "galleries",
                  meta: {
                    canDelete: true,
                    label: "แกลอรี่",
                    icon: <ImagesIcon />,
                  },
                },
                {
                  name: "articles",
                  list: "/galleries/articles",
                  create: "/galleries/articles/create",
                  edit: "/galleries/articles/edit/:id",
                  show: "/galleries/articles/show/:id",
                  meta: {
                    canDelete: true,
                    label: "รูปภาพ/สิ่งของในแกลอรี่",
                    dataProviderName: "article",
                    parent: "galleries",
                    icon: <ImageIcon />,
                  },
                },
                {
                  name: "categories",
                  list: "/galleries/categories",
                  create: "/galleries/categories/create",
                  edit: "/galleries/categories/edit/:id",
                  show: "/galleries/categories/show/:id",
                  meta: {
                    canDelete: true,
                    label: "หมวดหมู่",
                    dataProviderName: "category",
                    parent: "galleries",
                    icon: <TagsIcon />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "g6HhTG-DpnKBL-Wgy8L8",
                title: {
                  text: "PERMS",
                },
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="galleries" />}
                  />
                  <Route path="/galleries">
                    <Route path="categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="articles">
                      <Route index element={<ArticleList />} />
                      <Route path="create" element={<ArticleCreate />} />
                      <Route path="edit/:id" element={<ArticleEdit />} />
                      <Route path="show/:id" element={<ArticleShow />} />
                    </Route>
                    <Route index element={<CategoryList />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>

              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
