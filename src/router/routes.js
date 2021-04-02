const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Login.vue") },
      {
        path: "/booking",
        component: () => import("pages/Booking.vue")
      },
      {
        path: "/menu",
        component: () => import("pages/Menu.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
