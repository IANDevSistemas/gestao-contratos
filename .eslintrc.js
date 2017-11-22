// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: "standard",
  // required to lint *.vue files
  plugins: ["html"],
  globals: {
    $: true,
    moment: true
  },
  // add your custom rules here
  rules: {
    /**
     * Possible warns
     */
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    // disallow duplicate arguments in function definitions
    "no-dupe-args": "warn",
    // disallow duplicate keys in object literals
    "no-dupe-keys": "warn",
    // disallow duplicate case labels
    "no-duplicate-case": "warn",
    // disallow empty block statements
    "no-empty": "warn",
    // disallow empty character classes in regular expressions
    "no-empty-character-class": "warn",
    // disallow reassigning exceptions in catch clauses
    "no-ex-assign": "warn",
    // disallow unnecessary boolean casts
    "no-extra-boolean-cast": "warn",
    // disallow unnecessary parentheses
    "no-extra-parens": "warn",
    // disallow unnecessary semicolons
    "no-extra-semi": "warn",
    // disallow reassigning function declarations
    "no-func-assign": "warn",
    // disallow variable or function declarations in nested blocks
    "no-inner-declarations": "warn",
    // disallow invalid regular expression strings in RegExp constructors
    "no-invalid-regexp": "warn",
    // disallow irregular whitespace outside of strings and comments
    "no-irregular-whitespace": "warn",
    // disallow calling global object properties as functions
    "no-obj-calls": "warn",
    // disallow multiple spaces in regular expressions
    "no-regex-spaces": "warn",
    // disallow confusing multiline expressions
    "no-unexpected-multiline": "warn",
    // disallow unreachable code after return, throw, continue, and break statements
    "no-unreachable": "warn",
    // disallow control flow statements in finally blocks
    "no-unsafe-finally": "warn",
    // disallow negating the left operand of relational operators
    "no-unsafe-negation": "warn",
    // enforce valid JSDoc comments
    "valid-jsdoc": "warn",
    // enforce comparing typeof expressions against valid strings
    "valid-typeof": "warn",

    /**
     * Best Practices
     */
    // enforce return statements in callbacks of array methods
    "array-callback-return": "warn",
    // enforce the use of variables within the scope they are defined
    "block-scoped-var": "warn",
    // enforce that class methods utilize this
    "class-methods-use-this": "warn",
    // enforce a maximum cyclomatic complexity allowed in a program
    complexity: [
      "warn",
      {
        max: 10
      }
    ],
    // require return statements to either always or never specify values
    "consistent-return": "warn",
    // enforce consistent brace style for all control statements
    curly: "warn",
    // require default cases in switch statements
    "default-case": "warn",
    // enforce consistent newlines before and after dots
    "dot-location": ["warn", "property"],
    // disallow lexical declarations in case clauses
    "no-case-declarations": "warn",
    // disallow else blocks after return statements in if statements
    "no-else-return": "warn",
    // disallow empty functions
    "no-empty-function": "warn",
    // disallow unnecessary labels
    "no-extra-label": "warn",
    // disallow leading or trailing decimal points in numeric literals
    "no-floating-decimal": "warn",
    // disallow assignments to native objects or read-only global variables
    "no-global-assign": "warn",
    // disallow shorthand type conversions
    "no-implicit-coercion": "warn",
    // disallow variable and function declarations in the global scope
    "no-implicit-globals": "warn",
    // disallow the use of eval()-like methods
    "no-implied-eval": "warn",
    // disallow this keywords outside of classes or class-like objects
    "no-invalid-this": "warn",
    // disallow labeled statements
    "no-labels": "warn",
    // disallow function declarations and expressions inside loop statements
    "no-loop-func": "warn",
    // disallow new operators with the Function object
    "no-new-func": "warn",
    // disallow new operators with the String, Number, and Boolean objects
    "no-new-wrappers": "warn",
    // disallow reassigning function parameters
    "no-param-reassign": "warn",
    // disallow the use of the __proto__ property
    "no-proto": "warn",
    // disallow variable redeclaration
    "no-redeclare": "warn",
    // disallow assignment operators in return statements
    "no-return-assign": "warn",
    // disallow unnecessary return await
    "no-return-await": "warn",
    // disallow assignments where both sides are exactly the same
    "no-self-assign": "warn",
    // disallow comparisons where both sides are exactly the same
    "no-self-compare": "warn",
    // disallow throwing literals as exceptions
    "no-throw-literal": "warn",
    // disallow unused expressions
    "no-unused-expressions": "warn",
    // disallow unused labels
    "no-unused-labels": "warn",
    // disallow unnecessary calls to .call() and .apply()
    "no-useless-call": "warn",
    // disallow unnecessary concatenation of literals or template literals
    "no-useless-concat": "warn",
    // disallow unnecessary escape characters
    "no-useless-escape": "warn",
    // disallow redundant return statements
    "no-useless-return": "warn",
    //
    "no-warning-comments": [
      "warn",
      {
        terms: ["todo", "fix", "fixme", "bug"],
        location: "start"
      }
    ],
    // disallow with statements
    "no-with": "warn",
    // require using warn objects as Promise rejection reasons
    "prefer-promise-reject-errors": "warn",
    // disallow async functions which have no await expression
    "require-await": "warn",
    // require var declarations be placed at the top of their containing scope
    "vars-on-top": "warn",
    "wrap-iife": ["warn", "any"],

    /**
     * Strict Mode
     */
    // require or disallow strict mode directives
    strict: ["warn", "global"],

    /**
     * Variables
     */
    // disallow deleting variables
    "no-delete-var": "warn",
    // disallow identifiers from shadowing restricted names
    "no-shadow-restricted-names": "warn",
    // disallow the use of undeclared variables unless mentioned in /*global */ comments
    "no-undef": "warn",
    // disallow the use of undefined as an identifier
    "no-undefined": "warn",
    // disallow unused variables
    "no-unused-vars": ["warn"],

    /**
     * Stylistic Issues
     */
    // enforce linebreaks after opening and before closing array brackets
    "array-bracket-newline": [
      "warn",
      {
        multiline: true
      }
    ],
    // enforce consistent spacing inside array brackets
    "array-bracket-spacing": ["warn", "never"],
    // enforce line breaks after each array element
    // "array-element-newline": ["warn", {
    //   "multiline": true
    // }],
    // enforce consistent spacing inside single-line blocks
    "block-spacing": "warn",
    // enforce consistent brace style for blocks
    "brace-style": "warn",
    // enforce camelcase naming convention
    camelcase: "warn",
    // require or disallow trailing commas
    "comma-dangle": ["warn", "never"],
    // enforce consistent spacing before and after commas
    "comma-spacing": [
      "warn",
      {
        before: false,
        after: true
      }
    ],
    // enforce consistent comma style
    "comma-style": ["warn", "last"],
    // enforce consistent spacing inside computed property brackets
    "computed-property-spacing": ["warn", "never"],
    // enforce consistent naming when capturing the current execution context
    "consistent-this": ["warn", "self"],
    // require or disallow newline at the end of files
    "eol-last": ["warn", "always"],
    // require or disallow spacing between function identifiers and their invocations
    "func-call-spacing": ["warn", "never"],
    // require function names to match the name of the variable or property to which they are assigned
    "func-name-matching": "warn",
    // enforce the consistent use of either function declarations or expressions
    "func-style": [
      "warn",
      "declaration",
      {
        allowArrowFunctions: true
      }
    ],
    // enforce consistent indentation
    // indent: ["warn", 2],
    // jsx-quotes
    "jsx-quotes": ["warn", "prefer-double"],
    // enforce consistent spacing between keys and values in object literal properties
    "key-spacing": [
      "warn",
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    // enforce consistent spacing before and after keywords
    "keyword-spacing": [
      "warn",
      {
        before: true,
        after: true
      }
    ],
    // enforce consistent linebreak style
    "linebreak-style": ["warn", "unix"],
    // enforce a maximum number of parameters in function definitions
    "max-params": ["warn", 5],
    // enforce a maximum number of statements allowed in function blocks
    // "max-statements": ["warn", 10],
    // enforce a maximum number of statements allowed per line
    "max-statements-per-line": [
      "warn",
      {
        max: 1
      }
    ],
    // require constructor names to begin with a capital letter
    "new-cap": [
      "warn",
      {
        newIsCap: true
      }
    ],
    // require parentheses when invoking a constructor with no arguments
    "new-parens": "warn",
    // require a newline after each call in a method chain
    "newline-per-chained-call": [
      "warn",
      {
        ignoreChainWithDepth: 2
      }
    ],
    // disallow if statements as the only statement in else blocks
    "no-lonely-if": "warn",
    // disallow mixed spaces and tabs for indentation
    "no-mixed-spaces-and-tabs": "warn",
    // disallow multiple empty lines
    "no-multiple-empty-lines": [
      "warn",
      {
        max: 2,
        maxBOF: 1,
        maxEOF: 1
      }
    ],
    // disallow all tabs
    "no-tabs": "warn",
    // disallow trailing whitespace at the end of lines
    "no-trailing-spaces": "warn",
    // disallow dangling underscores in identifiers
    "no-underscore-dangle": "warn",
    //disallow ternary operators when simpler alternatives exist
    "no-unneeded-ternary": "warn",
    // disallow whitespace before properties
    "no-whitespace-before-property": "warn",
    // enforce the location of single-line statements
    "nonblock-statement-body-position": ["warn", "beside"],
    // enforce consistent spacing inside braces
    "object-curly-spacing": ["warn", "always"],
    // enforce consistent linebreak style for operators
    "operator-linebreak": ["warn", "after"],
    // require or disallow padding within blocks
    "padded-blocks": ["warn", "never"],
    // enforce the consistent use of either backticks, double, or single quotes
    quotes: ["warn", "double"],
    // require quotes around object literal property names
    "quote-props": ["warn", "consistent-as-needed"],
    // disallow unnecessary semicolon
    semi: ["warn", "never"],
    // enforce consistent spacing before and after semicolons
    "semi-spacing": [
      "warn",
      {
        before: false,
        after: true
      }
    ],
    // enforce location of semicolons
    "semi-style": ["warn", "last"],
    // enforce consistent spacing before function definition opening parenthesis
    "space-before-function-paren": [
      "warn",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "never"
      }
    ],
    // enforce consistent spacing inside parentheses
    "space-in-parens": ["warn", "never"],
    // require spacing around infix operators
    "space-infix-ops": "warn",
    // enforce consistent spacing before or after unary operators
    "space-unary-ops": "warn",
    // enforce consistent spacing after the // or /* in a comment
    "spaced-comment": ["warn", "always"],
    // enforce spacing around colons of switch statements
    "switch-colon-spacing": [
      "warn",
      {
        after: true,
        before: false
      }
    ],
    // require or disallow spacing between template tags and their literals
    "template-tag-spacing": ["warn", "never"],
    // require or disallow Unicode byte order mark (BOM)
    "unicode-bom": ["warn", "never"],

    /** 
     * ECMAScript 6 
     */
    // require braces around arrow function bodies
    "arrow-body-style": ["warn", "as-needed"],
    // require parentheses around arrow function arguments
    "arrow-parens": ["warn", "as-needed"],
    // enforce consistent spacing before and after the arrow in arrow functions
    "arrow-spacing": [
      "warn",
      {
        before: true,
        after: true
      }
    ],
    // require super() calls in constructors
    "constructor-super": "warn",
    // enforce consistent spacing around * operators in generator functions
    "generator-star-spacing": [
      "warn",
      {
        before: true,
        after: false
      }
    ],
    // disallow reassigning class members
    "no-class-assign": "warn",
    // disallow arrow functions where they could be confused with comparisons
    "no-confusing-arrow": "warn",
    // disallow reassigning const variables
    "no-const-assign": "warn",
    // disallow duplicate class members
    "no-dupe-class-members": "warn",
    // disallow duplicate module imports
    "no-duplicate-imports": "warn",
    // disallow new operators with the Symbol object
    "no-new-symbol": "warn",
    // disallow this/super before calling super() in constructors
    "no-this-before-super": "warn",
    // disallow unnecessary computed property keys in object literals
    "no-useless-computed-key": "warn",
    // disallow unnecessary constructors
    "no-useless-constructor": "warn",
    // disallow renaming import, export, and destructured assignments to the same name
    "no-useless-rename": "warn",
    // require let or const instead of var
    "no-var": "warn",
    // require arrow functions as callbacks
    "prefer-arrow-callback": "warn",
    // require const declarations for variables that are never reassigned after declared
    "prefer-const": "warn",
    // require destructuring from arrays and/or objects
    "prefer-destructuring": "warn",
    // require rest parameters instead of arguments
    "prefer-rest-params": "warn",
    // require spread operators instead of .apply()
    "prefer-spread": "warn",
    // require template literals instead of string concatenation
    "prefer-template": "warn",
    // require generator functions to contain yield
    "require-yield": "warn",
    // enforce spacing between rest and spread operators and their expressions
    "rest-spread-spacing": ["warn", "never"],
    //  enforce sorted import declarations within modules
    "sort-imports": "warn",
    // require symbol descriptions
    "symbol-description": "warn",
    // require or disallow spacing around embedded expressions of template strings
    "template-curly-spacing": "warn",
    // require or disallow spacing around the * in yield* expressions
    "yield-star-spacing": ["warn", "before"]
  }
}
