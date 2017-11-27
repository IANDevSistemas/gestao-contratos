function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/pages${component || ""}/Index.vue`)
  // return () => import(`@/pages/${component}/`)
}

function crudRouter(name) {
  return {
    path: `/cadastro/${name}`,
    component: load(`/cadastro/${name}`),
    children: [
      {
        name: "name",
        path: "",
        component: load(`/cadastro/${name}/table`)
      },
      {
        path: "form",
        component: load(`/cadastro/${name}/form`)
      },
      {
        path: "form/:id",
        component: load(`/cadastro/${name}/form`)
      }
    ]
  }
}

export default [
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

  // Cadastros
  crudRouter("empresa"),
  crudRouter("tipo-contrato"),
  crudRouter("motivo-contrato"),
  crudRouter("pessoa"),

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

  // Always leave this last one
  {
    path: "*",
    component: load("/error404")
  } // Not found
]
