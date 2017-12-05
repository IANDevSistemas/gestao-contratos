function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/pages${component || ""}/Index.vue`)
  // return () => import(`@/pages/${component}/`)
}

function crudRouter(name, path = "cadastro") {
  return {
    path: name,
    component: load(`/${path}/${name}`),
    children: [
      {
        name: `${path}.${name}`.replace("/", "."),
        path: "",
        component: load(`/${path}/${name}/table`)
      },
      {
        path: "form",
        component: load(`/${path}/${name}/form`),
        children: [
          {
            path: ":id",
            component: load(`/${path}/${name}/form`)
          }
        ]
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
    path: "/contrato",
    component: load("/contrato"),
    children: [
      {
        name: "contrato",
        path: ":idcontrato",
        component: load("/contrato/form"),
        children: [
          {
            name: "contrato-documento",
            path: "documento",
            component: load("/contrato/documento")
          },
          crudRouter("valor", "/contrato")
        ]
      }
    ]
  },

  // Cadastros
  {
    path: "/cadastro",
    component: load("/cadastro"),
    children: [crudRouter("empresa"), crudRouter("tipo-contrato"), crudRouter("motivo-contrato"), crudRouter("pessoa")]
  },

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
