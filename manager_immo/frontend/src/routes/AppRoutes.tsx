import { Routes, Route } from "react-router-dom"
import { Page404 } from "../pages/404"
import { LoginPage } from "../pages/Login"
import { RegisterPage } from "../pages/Register"
import { HomePage } from "../pages/Home/index"
import { DefaultHeader } from "../components/Header/index"
import { PropertyDetailsPage } from "../pages/PropertyDetails/index"
import { useUserContext } from "../contexts/userContext"

export const AppRoutes = () => {
    const { isAuthenticated } = useUserContext()

    return isAuthenticated ? (
          <DefaultHeader>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/property/:propertyId" element={<PropertyDetailsPage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
          </DefaultHeader>
      ) : (
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<LoginPage />} />
          </Routes>
      )
}
