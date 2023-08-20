import Home from '../pages/Home';
import Cart from '../pages/Cart';
import NotFound from '../pages/NotFound';

import{HOME_ROUTE, CART_ROUTE} from "../utils/routes"


export const routes = [
    {
        path: HOME_ROUTE,
        element: <Home />,
    },
    {
        path: CART_ROUTE,
        element: <Cart />,
    },
    {
        path:   "*",
        element: <NotFound/>,
    },
];