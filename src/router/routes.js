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
    path: "/contrato/:id",
    component: load("/contrato"),
    children: [
      {
        name: "contrato-responsavel",
        path: "/contrato/:id/responsavel",
        component: load("/contrato/responsavel")
      },
      {
        name: "contrato-documento",
        path: "/contrato/:id/documento",
        component: load("/contrato/documento")
      }
    ]
  },
  {
    path: "/contrato",
    component: load("/contrato")
  },

  // Cadastros
  crudRouter("empresa"),
  crudRouter("tipo-contrato"),
  crudRouter("motivo-contrato"),
  crudRouter("pessoa"),
  crudRouter("diretorio"),

  // Raíz
  {
    path: "/",
    component: load()
  },

  // Login
  {
    path: "/login/*",
    component: load("/login")
  },

  // Logout
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
