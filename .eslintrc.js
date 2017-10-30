// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "env": {
    "browser": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  "extends": "standard",
  // required to lint *.vue files
  "plugins": ["html"],
  "globals": {
    "$": true,
    "moment": true
  },
  // add your custom rules here
  "rules": {
    /**
     * Possible Errors
     */
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    // disallow duplicate arguments in function definitions
    "no-dupe-args": "error",
    // disallow duplicate keys in object literals
    "no-dupe-keys": "error",
    // disallow duplicate case labels
    "no-duplicate-case": "error",
    // disallow empty block statements
    "no-empty": "warn",
    // disallow empty character classes in regular expressions
    "no-empty-character-class": "error",
    // disallow reassigning exceptions in catch clauses
    "no-ex-assign": "error",
    // disallow unnecessary boolean casts
    "no-extra-boolean-cast": "error",
    // disallow unnecessary parentheses
    "no-extra-parens": "error",
    // disallow unnecessary semicolons
    "no-extra-semi": "error",
    // disallow reassigning function declarations
    "no-func-assign": "error",
    // disallow variable or function declarations in nested blocks
    "no-inner-declarations": "error",
    // disallow invalid regular expression strings in RegExp constructors
    "no-invalid-regexp": "error",
    // disallow irregular whitespace outside of strings and comments
    "no-irregular-whitespace": "error",
    // disallow calling global object properties as functions
    "no-obj-calls": "error",
    // disallow multiple spaces in regular expressions
    "no-regex-spaces": "error",
    // disallow confusing multiline expressions
    "no-unexpected-multiline": "error",
    // disallow unreachable code after return, throw, continue, and break statements
    "no-unreachable": "error",
    // disallow control flow statements in finally blocks
    "no-unsafe-finally": "error",
    // disallow negating the left operand of relational operators
    "no-unsafe-negation": "error",
    // enforce valid JSDoc comments
    "valid-jsdoc": "error",
    // enforce comparing typeof expressions against valid strings
    "valid-typeof": "error",

    /**
     * Best Practices
     */
    // enforce return statements in callbacks of array methods
    "array-callback-return": "error",
    // enforce the use of variables within the scope they are defined
    "block-scoped-var": "error",
    // enforce that class methods utilize this
    "class-methods-use-this": "error",
    // enforce a maximum cyclomatic complexity allowed in a program
    "complexity": [
      "error",
      {
        "max": 10
      }
    ],
    // require return statements to either always or never specify values
    "consistent-return": "warn",
    // enforce consistent brace style for all control statements
    "curly": "error",
    // require default cases in switch statements
    "default-case": "error",
    // enforce consistent newlines before and after dots
    "dot-location": ["error", "property"],
    // disallow lexical declarations in case clauses
    "no-case-declarations": "error",
    // disallow else blocks after return statements in if statements
    "no-else-return": "error",
    // disallow empty functions
    "no-empty-function": "error",
    // disallow unnecessary labels
    "no-extra-label": "error",
    // disallow leading or trailing decimal points in numeric literals
    "no-floating-decimal": "error",
    // disallow assignments to native objects or read-only global variables
    "no-global-assign": "error",
    // disallow shorthand type conversions
    "no-implicit-coercion": "error",
    // disallow variable and function declarations in the global scope
    "no-implicit-globals": "error",
    // disallow the use of eval()-like methods
    "no-implied-eval": "error",
    // disallow this keywords outside of classes or class-like objects
    "no-invalid-this": "error",
    // disallow labeled statements
    "no-labels": "error",
    // disallow function declarations and expressions inside loop statements
    "no-loop-func": "error",
    // disallow new operators with the Function object
    "no-new-func": "error",
    // disallow new operators with the String, Number, and Boolean objects
    "no-new-wrappers": "warn",
    // disallow reassigning function parameters
    "no-param-reassign": "warn",
    // disallow the use of the __proto__ property
    "no-proto": "error",
    // disallow variable redeclaration
    "no-redeclare": "error",
    // disallow assignment operators in return statements
    "no-return-assign": "error",
    // disallow unnecessary return await
    "no-return-await": "error",
    // disallow assignments where both sides are exactly the same
    "no-self-assign": "error",
    // disallow comparisons where both sides are exactly the same
    "no-self-compare": "error",
    // disallow throwing literals as exceptions
    "no-throw-literal": "error",
    // disallow unused expressions
    "no-unused-expressions": "error",
    // disallow unused labels
    "no-unused-labels": "error",
    // disallow unnecessary calls to .call() and .apply()
    "no-useless-call": "error",
    // disallow unnecessary concatenation of literals or template literals
    "no-useless-concat": "error",
    // disallow unnecessary escape characters
    "no-useless-escape": "error",
    // disallow redundant return statements
    "no-useless-return": "error",
    //
    "no-warning-comments": [
      "warn",
      {
        "terms": ["todo", "fix", "fixme", "bug"],
        "location": "start"
      }
    ],
    // disallow with statements
    "no-with": "error",
    // require using Error objects as Promise rejection reasons
    "prefer-promise-reject-errors": "error",
    // disallow async functions which have no await expression
    "require-await": "error",
    // require var declarations be placed at the top of their containing scope
    "vars-on-top": "error",
    "wrap-iife": ["error", "any"],

    /**
     * Strict Mode
     */
    // require or disallow strict mode directives
    "strict": ["error", "global"],

    /**
     * Variables
     */
    // disallow deleting variables
    "no-delete-var": "error",
    // disallow identifiers from shadowing restricted names
    "no-shadow-restricted-names": "error",
    // disallow the use of undeclared variables unless mentioned in /*global */ comments
    "no-undef": "error",
    // disallow the use of undefined as an identifier
    "no-undefined": "error",
    // disallow unused variables
    "no-unused-vars": ["warn"],

    /**
     * Stylistic Issues
     */
    // enforce linebreaks after opening and before closing array brackets
    "array-bracket-newline": [
      "error",
      {
        "multiline": true
      }
    ],
    // enforce consistent spacing inside array brackets
    "array-bracket-spacing": ["error", "never"],
    // enforce line breaks after each array element
    // "array-element-newline": ["error", {
    //   "multiline": true
    // }],
    // enforce consistent spacing inside single-line blocks
    "block-spacing": "error",
    // enforce consistent brace style for blocks
    "brace-style": "error",
    // enforce camelcase naming convention
    "camelcase": "error",
    // require or disallow trailing commas
    "comma-dangle": ["error", "never"],
    // enforce consistent spacing before and after commas
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    // enforce consistent comma style
    "comma-style": ["error", "last"],
    // enforce consistent spacing inside computed property brackets
    "computed-property-spacing": ["error", "never"],
    // enforce consistent naming when capturing the current execution context
    "consistent-this": ["error", "self"],
    // require or disallow newline at the end of files
    "eol-last": ["error", "always"],
    // require or disallow spacing between function identifiers and their invocations
    "func-call-spacing": ["error", "never"],
    // require function names to match the name of the variable or property to which they are assigned
    "func-name-matching": "error",
    // enforce the consistent use of either function declarations or expressions
    "func-style": ["error", "declaration"],
    // enforce consistent indentation
    "indent": ["warn", 2],
    // jsx-quotes
    "jsx-quotes": ["error", "prefer-double"],
    // enforce consistent spacing between keys and values in object literal properties
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    // enforce consistent spacing before and after keywords
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    // enforce consistent linebreak style
    "linebreak-style": ["error", "unix"],
    // enforce a maximum number of parameters in function definitions
    "max-params": ["error", 5],
    // enforce a maximum number of statements allowed in function blocks
    // "max-statements": ["warn", 10],
    // enforce a maximum number of statements allowed per line
    "max-statements-per-line": [
      "error",
      {
        "max": 1
      }
    ],
    // require constructor names to begin with a capital letter
    "new-cap": [
      "error",
      {
        "newIsCap": true
      }
    ],
    // require parentheses when invoking a constructor with no arguments
    "new-parens": "error",
    // require a newline after each call in a method chain
    "newline-per-chained-call": [
      "error",
      {
        "ignoreChainWithDepth": 2
      }
    ],
    // disallow if statements as the only statement in else blocks
    "no-lonely-if": "error",
    // disallow mixed spaces and tabs for indentation
    "no-mixed-spaces-and-tabs": "error",
    // disallow multiple empty lines
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 2,
        "maxBOF": 1,
        "maxEOF": 1
      }
    ],
    // disallow all tabs
    "no-tabs": "error",
    // disallow trailing whitespace at the end of lines
    "no-trailing-spaces": "warn",
    // disallow dangling underscores in identifiers
    "no-underscore-dangle": "error",
    //disallow ternary operators when simpler alternatives exist
    "no-unneeded-ternary": "error",
    // disallow whitespace before properties
    "no-whitespace-before-property": "error",
    // enforce the location of single-line statements
    "nonblock-statement-body-position": ["error", "beside"],
    // enforce consistent spacing inside braces
    "object-curly-spacing": ["warn", "always"],
    // enforce consistent linebreak style for operators
    "operator-linebreak": ["error", "before"],
    // require or disallow padding within blocks
    "padded-blocks": ["warn", "never"],
    // enforce the consistent use of either backticks, double, or single quotes
    "quotes": ["warn", "double"],
    // require quotes around object literal property names
    "quote-props": ["error", "consistent-as-needed"],
    // disallow unnecessary semicolon
    "semi": ["error", "never"],
    // enforce consistent spacing before and after semicolons
    "semi-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    // enforce location of semicolons
    "semi-style": ["error", "last"],
    // enforce consistent spacing before function definition opening parenthesis
    "space-before-function-paren": [
      "warn",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "never"
      }
    ],
    // enforce consistent spacing inside parentheses
    "space-in-parens": ["error", "never"],
    // require spacing around infix operators
    "space-infix-ops": "error",
    // enforce consistent spacing before or after unary operators
    "space-unary-ops": "error",
    // enforce consistent spacing after the // or /* in a comment
    "spaced-comment": ["error", "always"],
    // enforce spacing around colons of switch statements
    "switch-colon-spacing": [
      "error",
      {
        "after": true,
        "before": false
      }
    ],
    // require or disallow spacing between template tags and their literals
    "template-tag-spacing": ["error", "never"],
    // require or disallow Unicode byte order mark (BOM)
    "unicode-bom": ["error", "never"],

    /** 
     * ECMAScript 6 
     */
    // require braces around arrow function bodies
    "arrow-body-style": ["error", "as-needed"],
    // require parentheses around arrow function arguments
    "arrow-parens": ["error", "always"],
    // enforce consistent spacing before and after the arrow in arrow functions
    "arrow-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    // require super() calls in constructors
    "constructor-super": "error",
    // enforce consistent spacing around * operators in generator functions
    "generator-star-spacing": [
      "error",
      {
        "before": true,
        "after": false
      }
    ],
    // disallow reassigning class members
    "no-class-assign": "error",
    // disallow arrow functions where they could be confused with comparisons
    "no-confusing-arrow": "error",
    // disallow reassigning const variables
    "no-const-assign": "error",
    // disallow duplicate class members
    "no-dupe-class-members": "error",
    // disallow duplicate module imports
    "no-duplicate-imports": "error",
    // disallow new operators with the Symbol object
    "no-new-symbol": "error",
    // disallow this/super before calling super() in constructors
    "no-this-before-super": "error",
    // disallow unnecessary computed property keys in object literals
    "no-useless-computed-key": "error",
    // disallow unnecessary constructors
    "no-useless-constructor": "error",
    // disallow renaming import, export, and destructured assignments to the same name
    "no-useless-rename": "error",
    // require let or const instead of var
    "no-var": "error",
    // require arrow functions as callbacks
    "prefer-arrow-callback": "error",
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
    "rest-spread-spacing": ["error", "never"],
    //  enforce sorted import declarations within modules
    "sort-imports": "warn",
    // require symbol descriptions
    "symbol-description": "warn",
    // require or disallow spacing around embedded expressions of template strings
    "template-curly-spacing": "error",
    // require or disallow spacing around the * in yield* expressions
    "yield-star-spacing": ["error", "before"]
  }
}
