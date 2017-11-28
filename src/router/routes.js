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
        name: `${name}`,
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
  // Diretório
  {
    path: "/diretorio/:id",
    component: load("/diretorio"),
    children: [
      {
        name: "diretorio",
        path: "",
        component: load("/diretorio/explorer")
      },
      {
        path: "form",
        component: load("/diretorio/form")
      }
    ]
  },

  // Contrato
  {
    path: "/contrato/:id",
    component: load("/contrato"),
    children: [
      // {
      //   name: "contrato-responsavel",
      //   path: "responsavel",
      //   component: load("/contrato/responsavel")
      // },
      {
        name: "contrato",
        path: "",
        component: load("/contrato/form")
      },
      {
        name: "contrato-documento",
        path: "documento",
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

  // Raíz
  {
    name: "/",
    path: "/",
    component: load()
  },

  // Login
  {
    name: "login",
    path: "/login",
    component: load("/login")
  },

  // Logout
  {
    name: "logout",
    path: "/logout",
    component: load("/logout")
  },

  // Always leave this last one
  {
    path: "*",
    component: load("/error404")
  } // Not found
]
