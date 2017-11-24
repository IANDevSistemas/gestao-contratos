function load(component) {
  // '@' is aliased to src/components
  return () =>
    import (`@/pages${component || ""}/Index.vue`)
  // return () => import(`@/pages/${component}/`)
}

export default [
  // Raíz
  {
    path: "/",
    component: load()
  },

  // Login
  {
    path: "/login",
    component: load("/login")
  },
  {
    path: "/login/*",
    component: load("/login")
  },

  // Logout
  {
    path: "/logout",
    component: load("/logout")
  },
  {
    path: "/logout/*",
    component: load("/logout")
  },

  // Contrato
  {
    name: "contrato",
    path: "/diretorio/:iddiretorio/contrato/:id",
    component: load("/contrato")
  },

  {
    name: "contrato-responsavel",
    path: "/contrato/:id/responsavel",
    component: load("/contrato/responsavel")
  },


  // Diretório
  {
    name: "diretorio",
    path: "/diretorio/:id",
    component: load("/diretorio")
  },

  // Empresa
  {
    path: "/cadastro/empresa",
    component: load("/cadastro/empresa")
  },

  // Tipo Contrato
  {
    path: "/cadastro/tipo-contrato",
    component: load("/cadastro/tipo-contrato")
  },

  // Motivo Contrato
  {
    path: "/cadastro/motivo-contrato",
    component: load("/cadastro/motivo-contrato")
  },

  // Pessoa
  {
    path: "/cadastro/pessoa",
    component: load("/cadastro/pessoa")
  },

  // Always leave this last one
  {
    path: "*",
    component: load("/error404")
  } // Not found
]
