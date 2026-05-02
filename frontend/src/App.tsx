import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/antd";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import "antd/dist/reset.css";
import {
  ImagesIcon,
  ImageIcon,
  TagsIcon,
  MapPinCheckIcon,
  FanIcon,
  HeartHandshakeIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { I18nProvider } from "@refinedev/core";

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
import {
  PeopleCreate,
  PeopleEdit,
  PeopleList,
  PeopleShow,
} from "./pages/relations/people";
import { PlaceCreate, PlaceEdit, PlaceList } from "./pages/galleries/places";
import { ForgotPassword } from "./pages/forgot-password";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { authProvider } from "./providers/auth";
import { dataProvider } from "./providers/data";

import "./providers/i18n";

function App() {
  const { t, i18n } = useTranslation();
  const i18nProvider: I18nProvider = {
    translate: (key: string, params?: object) => {
      return String(t(key, params as any));
    },
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ConfigProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerProvider}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "galleries",
                  meta: {
                    canDelete: true,
                    label: t("gallery.gallery"),
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
                    label: t("gallery.article"),
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
                    label: t("gallery.category"),
                    dataProviderName: "category",
                    parent: "galleries",
                    icon: <TagsIcon />,
                  },
                },
                {
                  name: "places",
                  list: "/galleries/places",
                  create: "/galleries/places/create",
                  edit: "/galleries/places/edit/:id",
                  meta: {
                    canDelete: true,
                    label: t("gallery.place"),
                    dataProviderName: "place",
                    parent: "galleries",
                    icon: <MapPinCheckIcon />,
                  },
                },
                {
                  name: "relations",
                  meta: {
                    canDelete: true,
                    label: t("relation.relation"),
                    icon: <HeartHandshakeIcon />,
                  },
                },
                {
                  name: "people",
                  list: "/relations/people",
                  create: "/relations/people/create",
                  edit: "/relations/people/edit/:id",
                  show: "/relations/people/show/:id",
                  meta: {
                    canDelete: true,
                    label: t("relation.people"),
                    parent: "relations",
                    icon: <UsersIcon />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "g6HhTG-DpnKBL-Wgy8L8",
                title: {
                  text: "PERMS",
                  icon: <FanIcon />,
                },
                redirect: {
                  afterEdit: "edit",
                  afterCreate: "list",
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
                      <ThemedLayout>
                        <Outlet />
                      </ThemedLayout>
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

                    <Route path="places">
                      <Route index element={<PlaceList />} />
                      <Route path="create" element={<PlaceCreate />} />
                      <Route path="edit/:id" element={<PlaceEdit />} />
                    </Route>
                    <Route index element={<ArticleList />} />
                  </Route>
                  <Route path="/relations">
                    <Route path="people">
                      <Route index element={<PeopleList />} />
                      <Route path="create" element={<PeopleCreate />} />
                      <Route path="edit/:id" element={<PeopleEdit />} />
                      <Route path="show/:id" element={<PeopleShow />} />
                    </Route>

                    <Route index element={<PeopleList />} />
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

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
