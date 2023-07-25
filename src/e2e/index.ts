import { BrowserContext, Page } from '@playwright/test';
import { Login } from './pages/login';
import { Products } from './pages/products';
import { EditProduct } from './pages/editProduct';

export const App = ({ page }: { context: BrowserContext; page: Page }) => ({
  refresh: () => page.reload(),
  login: Login({ page }),
  products: Products({ page }),
  editProduct: EditProduct({ page }),
});
