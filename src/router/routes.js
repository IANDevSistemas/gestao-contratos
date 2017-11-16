function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/pages${component || ""}/Index.vue`)
  // return () => import(`@/pages/${component}/`)
}

export default [
  // Raíz
  { path: "/", component: load() },

  // Login
  { path: "/login", component: load("/login") },
  { path: "/login/*", component: load("/login") },

  // Logout
  { path: "/logout", component: load("/logout") },
  { path: "/logout/*", component: load("/logout") },

  // Contratos
  { path: "/contratos/:iddiretorio/:idcontrato/:action", component: load("/contratos") },
  { path: "/contratos/:iddiretorio/:idcontrato", component: load("/contratos") },
  { path: "/contratos/:iddiretorio", component: load("/contratos") },
  { path: "/contratos", component: load("/contratos") },

  // Empresa
  { path: "/cadastro/empresa", component: load("/cadastro/empresa") },

  // Always leave this last one
  { path: "*", component: load("/error404") } // Not found
]
