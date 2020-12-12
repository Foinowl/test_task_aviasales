import Dashboard from "./pages/Dashboard/Dashboard"

const routes = [
  {
    path: '/dashboard/:period(today|yesterday|last_hour|last_3days)',
    component: Dashboard,
    text: 'Dashboard',
  },
];


export default routes;
