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
        path: "search",
        component: load("/diretorio/search")
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
      {
        name: "contrato",
        path: "",
        component: load("/contrato/form")
      },
      {
        name: "contrato.documento",
        path: "documento",
        component: load("/contrato/documento")
      },
      {
        name: "contrato.valor",
        path: "valor",
        component: load("/contrato/valor")
      },
      {
        name: "contrato.responsavel",
        path: "responsavel",
        component: load("/contrato/responsavel")
      },
      {
        name: "contrato.unidade",
        path: "unidade",
        component: load("/contrato/unidade")
      },
      {
        name: "contrato.protocolo",
        path: "protocolo",
        component: load("/contrato/protocolo")
      }
    ]
  },

  // Contrato Valor
  {
    path: "/contrato/valor/:id",
    component: load("/contrato/valor/form")
  },

  // Contrato Responsável
  {
    path: "/contrato/responsavel/:id",
    component: load("/contrato/responsavel/form")
  },

  {
    path: "/contrato/protocolo/:id",
    component: load("/contrato/protocolo/form")
  },

  // Cadastros
  {
    path: "/cadastro",
    component: load("/cadastro"),
    children: [crudRouter("empresa"), crudRouter("indice"), crudRouter("tipo-contrato"), crudRouter("tipo-responsavel-contrato"), /* crudRouter("motivo-contrato"),*/ crudRouter("pessoa")]
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
