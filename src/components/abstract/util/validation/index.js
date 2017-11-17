/**
 * Verifica se é CPF ou CNPJ
 * @param {string} valor valor que será avaliado
 * @returns {string} "CPF" ou "CNPJ"
 * @throws error caso não seja cpf ou cnpj
 * @see http://www.todoespacoonline.com/w/
 */
function testCpfCnpj(valor) {
  const text = `${valor}`
  // Verifica CPF
  if (text.length === 11) {
    return "CPF"
  }

  if (text.length === 14) {
    // Verifica CNPJ
    return "CNPJ"
  }

  // Não retorna nada
  throw new Error("valor não é nem cpf e nem cnpj")
}

/**
 * Multiplica dígitos vezes posições
 *
 * @param {string} digitos digitos Os digitos desejados
 * @param {string} posicoes posicoes A posição que vai iniciar a regressão
 * @param {number} somaDigitos soma_digitos A soma das multiplicações entre posições e dígitos
 * @return {string} Os dígitos enviados concatenados com o último dígito
 * @see http://www.todoespacoonline.com/w/
*/
function calcDigitosPosicoes(digitos, posicoes = 10, somaDigitos = 0) {
  let sum = somaDigitos
  let pos = posicoes
  // Faz a soma dos dígitos com a posição
  // Ex. para 10 posições:
  //   0    2    5    4    6    2    8    8   4
  // x10   x9   x8   x7   x6   x5   x4   x3  x2
  //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
  for (let i = 0, { length } = digitos; i < length; i++) {
    // Preenche a soma com o dígito vezes a posição
    sum = sum + digitos[i] * pos

    // Subtrai 1 da posição
    pos--

    // Parte específica para CNPJ
    // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
    if (pos < 2) {
      // Retorno a posição para 9
      pos = 9
    }
  }

  // Captura o resto da divisão entre sum dividido por 11
  // Ex.: 196 % 11 = 9
  sum = sum % 11

  // Verifica se sum é menor que 2
  if (sum < 2) {
    // sum agora será zero
    sum = 0
  } else {
    // Se for maior que 2, o resultado é 11 menos sum
    // Ex.: 11 - 9 = 2
    // Nosso dígito procurado é 2
    sum = 11 - sum
  }

  // Concatena mais um dígito aos primeiro nove dígitos
  // Ex.: 025462884 + 2 = 0254628842
  const cpf = digitos + sum

  // Retorna
  return cpf
}

/**
 * Valida se for CPF
 *
 * @param {string} cpf O CPF com ou sem pontos e traço
 * @return {bool} true para CPF correto - false para CPF incorreto
 * @see http://www.todoespacoonline.com/w/
*/
function checkCpf(cpf) {
  const valor = `${cpf}`
    // Garante que o valor é uma string
    .toString()
    // Remove caracteres inválidos do valor
    .replace(/[^0-9]/g, "")

  // Captura os 9 primeiros dígitos do CPF
  // Ex.: 02546288423 = 025462884
  const digitos = valor.substr(0, 9)

  // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
  // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
  const esperado = calcDigitosPosicoes(calcDigitosPosicoes(digitos), 11)

  // Verifica se o novo CPF gerado é idêntico ao CPF enviado
  if (esperado === cpf) {
    // CPF válido
    return true
  }
  // CPF inválido
  return false
}

/**
 * Valida se for um CNPJ
 *
 * @param {string} cnpj O CNPJ com ou sem pontos e traço
 * @return {bool} true para CNPJ correto
 * @see http://www.todoespacoonline.com/w/
*/
function checkCnpj(cnpj) {
  const valor = `${cnpj}`
    // Garante que o valor é uma string
    .toString()
    // Remove caracteres inválidos do valor
    .replace(/[^0-9]/g, "")

  // Captura os primeiros 12 números do CNPJ
  // Faz o primeiro cálculo
  const calculo1 = calcDigitosPosicoes(valor.substr(0, 12), 5)

  // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
  const calculo2 = calcDigitosPosicoes(calculo1, 6)

  // Verifica se o CNPJ gerado é idêntico ao enviado
  if (valor === calculo2) {
    return true
  }

  // Retorna falso por padrão
  return false
}

/**
 * Valida o CPF ou CNPJ
 *
 * @param {string} cpfCnpj O valor a ser testado
 * @return {bool} true para válido, false para inválido
 * @see http://www.todoespacoonline.com/w/
*/
function checkCpfCnpj(cpfCnpj) {
  try {
    const valor = `${cpfCnpj}`
      // Garante que o valor é uma string
      .toString()
      // Remove caracteres inválidos do valor
      .replace(/[^0-9]/g, "")

    // Verifica se é CPF ou CNPJ
    const check = testCpfCnpj(valor)

    if (check === "CPF") {
      // Valida CPF
      // Retorna true para cpf válido
      return checkCpf(valor)
    } else if (check === "CNPJ") {
      // Valida CNPJ
      // Retorna true para CNPJ válido
      return checkCnpj(valor)
    }
  } catch (ignored) {
    return false
  }

  // Não retorna nada
  return false
}

export default {
  checkCpf,
  checkCnpj,
  checkCpfCnpj
}
