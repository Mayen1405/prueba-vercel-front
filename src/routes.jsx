import { HomePage } from "./pages/homePage/HomePage.jsx"; 
import { AuthPage } from "./pages/auth/AuthPage.jsx";
import { AboutUsPage } from "./pages/basicInformation/AboutUsPage.jsx";
import { ContactPage } from "./pages/basicInformation/ContactPage.jsx";
import { PrivacyPolicyPage } from "./pages/basicInformation/PrivacyPolicyPage.jsx";
import { TermsOfServicePage } from "./pages/basicInformation/TermsOfServicePage.jsx";
import { ClientPage } from "./pages/ClientPage";
import { StoreProductsPage } from "./pages/ClientPage/StoreProductsPage.jsx";
import { AccountsPage } from "./pages/ClientPage/AccountsPage.jsx";
import { AccountDetailPage } from "./pages/ClientPage/AccountDetailPage.jsx";
import { AdminPage } from "./pages/adminPage";
import { ProductManagementPage } from "./pages/adminPage/ProductManagementPage.jsx";
import { AccountManagementPage } from "./pages/adminPage/AccountManagementPage.jsx";
import { SettingsPage } from "./pages/settings"; 
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { UserManagementPage } from "./pages/adminPage/userManagement"; 
import { PurchaseHistoryPage } from "./pages/ClientPage/PurchaseHistoryPage.jsx";
import { CurrencyConverterPage} from "./pages/ClientPage/CurrencyConverterPage.jsx";
import { DepositManagementPage } from "./pages/adminPage/DepositManagementPage.jsx"; // Nueva importación
import { TransactionReportPage } from "./pages/adminPage/TransactionReportPage.jsx"; // Nueva importación
import { TransfersPage } from "./pages/ClientPage/TransfersPage"; // <-- Añade esta importación



export const routes = [
  {path: "/*", element: <HomePage />},
  {path: "/auth", element: <AuthPage />},
  {path: "/about", element: <AboutUsPage />},
  {path: "/contact", element: <ContactPage />},
  {path: "/privacy-policy", element: <PrivacyPolicyPage />},
  {path: "/terms-of-service", element: <TermsOfServicePage />},
  {path: "/client", element: <ProtectedRoute element={<ClientPage />} requiredRoles={["USER_ROLE"]} />},
  {path: "/transfers", element: <ProtectedRoute element={<TransfersPage />} requiredRoles={["USER_ROLE"]} />}, // <-- Añade o actualiza esta ruta
  {path: "/store", element: <ProtectedRoute element={<StoreProductsPage />} requiredRoles={["USER_ROLE"]} />},
  {path: "/purchase-history", element: <ProtectedRoute element={<PurchaseHistoryPage />} requiredRoles={["USER_ROLE"]} />},
  {path: "/accounts", element: <ProtectedRoute element={<AccountsPage />} requiredRoles={["USER_ROLE"]} />},
  {path: "/account/:accountId", element: <ProtectedRoute element={<AccountDetailPage />} requiredRoles={["USER_ROLE"]} />},
  {path: "/admin", element: <ProtectedRoute element={<AdminPage />} requiredRoles={["ADMIN_ROLE"]} />},
  {path: "/admin/products", element: <ProtectedRoute element={<ProductManagementPage />} requiredRoles={["ADMIN_ROLE"]} />},
  {path: "/admin/accounts", element: <ProtectedRoute element={<AccountManagementPage />} requiredRoles={["ADMIN_ROLE"]} />},
  {path: "/admin/users", element: <ProtectedRoute element={<UserManagementPage />} requiredRoles={["ADMIN_ROLE"]} />},
  {path: "/admin/deposits", element: <ProtectedRoute element={<DepositManagementPage />} requiredRoles={["ADMIN_ROLE"]} />},
  {path: "/admin/reports/transaction-count", element: <ProtectedRoute element={<TransactionReportPage />} requiredRoles={["ADMIN_ROLE"]} />},
  {path: "/admin/users/new", element: <ProtectedRoute element={<UserManagementPage openNewUserDialog />} requiredRoles={["ADMIN_ROLE"]} />},
  {path: "/profile", element: <ProtectedRoute element={<SettingsPage />} requiredRoles={["USER_ROLE", "ADMIN_ROLE"]} />},
  {path: "/currency-converter", element: <ProtectedRoute element={<CurrencyConverterPage />} requiredRoles={["USER_ROLE", "ADMIN_ROLE"]} />},


];