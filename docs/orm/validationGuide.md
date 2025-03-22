# Criando validações em Modelos Sequelize

O **Sequelize** oferece diversas validações integradas para garantir a integridade dos dados antes de serem inseridos no banco de dados. Essas validações são definidas dentro da propriedade `validate` de cada campo no modelo.

Abaixo, estão as principais validações disponíveis, com exemplos práticos de uso.

---

## Validação de Campos Obrigatórios

### **`allowNull: false`**
Impede que o campo seja nulo.

```javascript
name: {
	type: DataTypes.STRING,
	allowNull: false, // O campo não pode ser nulo
}
```

### **`notNull`** (Mensagem de erro personalizada)

```javascript
name: {
	type: DataTypes.STRING,
	allowNull: false,
	validate: {
		notNull: { msg: "O nome é obrigatório." },
	},
}
```

---

## Validações de String

### **Comprimento Mínimo e Máximo (`len`)**

```javascript
username: {
	type: DataTypes.STRING,
	allowNull: false,
	validate: {
		len: { args: [3, 20], msg: "O nome deve ter entre 3 e 20 caracteres." },
	},
}
```

### **Validação de E-mail (`isEmail`)**

```javascript
email: {
	type: DataTypes.STRING,
	allowNull: false,
	unique: true,
	validate: {
		isEmail: { msg: "O e-mail deve ser válido." },
	},
}
```

### **Validação de URL (`isUrl`)**

```javascript
website: {
	type: DataTypes.STRING,
	allowNull: true,
	validate: {
		isUrl: { msg: "O website deve ser uma URL válida." },
	},
}
```

### **Validação de Expressão Regular (`is` - Regex personalizado)**

```javascript
phone: {
	type: DataTypes.STRING,
	validate: {
		is: {
			args: [/^\d{2}-\d{4,5}-\d{4}$/], // Formato: XX-XXXXX-XXXX
			msg: "O telefone deve estar no formato XX-XXXXX-XXXX.",
		},
	},
}
```

---

## Validações de Números

### **Verificar se o valor é um Número Inteiro (`isInt`)**

```javascript
age: {
	type: DataTypes.INTEGER,
	allowNull: false,
	validate: {
		isInt: { msg: "A idade deve ser um número inteiro." },
	},
}
```

### **Definir Valor Mínimo (`min`)**

```javascript
age: {
	type: DataTypes.INTEGER,
	validate: {
		min: { args: 18, msg: "A idade mínima permitida é 18 anos." },
	},
}
```

### **Definir Valor Máximo (`max`)**

```javascript
score: {
	type: DataTypes.INTEGER,
	validate: {
		max: { args: 100, msg: "A pontuação máxima permitida é 100." },
	},
}
```

### **Verificar se é um Número Decimal (`isDecimal`)**

```javascript
price: {
	type: DataTypes.DECIMAL(10, 2),
	validate: {
		isDecimal: { msg: "O preço deve ser um número decimal válido." },
	},
}
```

---

## Validações de Enumerações

### **Verificar se um Valor está Dentro de uma Lista (`isIn`)**

```javascript
role: {
	type: DataTypes.ENUM("admin", "user", "moderator"),
	allowNull: false,
	validate: {
		isIn: {
			args: [["admin", "user", "moderator"]],
			msg: "O cargo deve ser 'admin', 'user' ou 'moderator'.",
		},
	},
}
```

---

## Validações de Datas

### **Verificar se é uma Data (`isDate`)**

```javascript
birthday: {
	type: DataTypes.DATEONLY,
	validate: {
		isDate: { msg: "A data de nascimento deve ser válida." },
	},
}
```

---

## Validações de Booleanos

### **Verificar se é um Booleano (`isIn`)**

```javascript
isActive: {
	type: DataTypes.BOOLEAN,
	validate: {
		isIn: {
			args: [[true, false]],
			msg: "O campo ativo deve ser verdadeiro ou falso.",
		},
	},
}
```

---

## Criando Validações Personalizadas

Caso precise de uma validação mais complexa, é possível definir funções personalizadas.

### **Exemplo: Senha Segura**

```javascript
password: {
	type: DataTypes.STRING,
	allowNull: false,
	validate: {
		isLongEnough(value) {
			if (value.length < 8) {
				throw new Error("A senha deve ter pelo menos 8 caracteres.");
			}
		},
		hasUppercase(value) {
			if (!/[A-Z]/.test(value)) {
				throw new Error("A senha deve conter pelo menos uma letra maiúscula.");
			}
		},
		hasNumber(value) {
			if (!/[0-9]/.test(value)) {
				throw new Error("A senha deve conter pelo menos um número.");
			}
		},
	},
}
```

---

## Exemplo de Validações

```javascript
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},

	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: { msg: "O nome é obrigatório." },
			len: { args: [3, 50], msg: "O nome deve ter entre 3 e 50 caracteres." },
		},
	},

	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: { msg: "O e-mail deve ser válido." },
		},
	},

	age: {
		type: DataTypes.INTEGER,
		validate: {
			isInt: { msg: "A idade deve ser um número inteiro." },
			min: { args: 18, msg: "A idade mínima é 18 anos." },
		},
	},

	role: {
		type: DataTypes.ENUM("admin", "user", "moderator"),
		validate: {
			isIn: {
				args: [["admin", "user", "moderator"]],
				msg: "O cargo deve ser 'admin', 'user' ou 'moderator'.",
			},
		},
	},

	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: { args: [8, 100], msg: "A senha deve ter pelo menos 8 caracteres." },
			is: {
				args: [/^(?=.*[A-Z])(?=.*\d).{8,}$/],
				msg: "A senha deve conter pelo menos uma letra maiúscula e um número.",
			},
		},
	},
});

module.exports = User;
```

---

## Validações disponíveis

Tipos de validações existentes

- **is**: espera uma expressão regular (valida o valor com base nela)
- **isUrl**: `true || false` (valida se o valor é uma URL válida)
- **isIP**: `true || false` (valida se o valor é um IPv4 ou IPv6 válido)
- **isInt**: `true || false` (valida se o valor é um inteiro)
- **isFloat**: `true || false` (valida se o valor é um numero com ponto flutuante)
- **isDecimal**: `true || false` (valida se o valor é um DECIMAL valido)
- **isIn**: `[[true, false]]` (valida se o valor é true ou false)
- **isDate**: `true || false` (valida se o valor é uma data válida)
- **isAlpha**: `true || false` (valida se o valor contem apenas caracteres alfabéticos)
- **isAlphanumeric**: `true || false` (valida se o valor contem apenas letras e números)
- **isUUID**: `[1-5]` (verifica se o valor é um UUID válido de uma versão específica)
- **isNumeric**: `true || false` (valida se o valor são apenas números)
- **isLowercase**: `true || false` (garante que todas as letras sejam minúsculas)
- **isUppercase**: `true || false` (garante que todas as letras sejam maiúsculas)
- **notEmpty**: `true || false` (garante que o campo não está vazio)
- **len**: `[numero_de_caracteres_mínimo, numero_de_caracteres_máximo]` (garante que o valor tem a quantidade de caracteres entre min e max)
- **min**: `numero_mínimo` (garante que um numero não seja menor que numero_mínimo)
- **max**: `numero_máximo` (garante que um numero não seja maior que o numero_máximo)
- **isAfter**: `'YYYY-MM-DD'` (valida se a data inserida é posterior a uma data específica.)
- **isBefore**: `'YYYY-MM-DD'` (valida se a data é anterior a uma data específica.)
- **isCreditCard**: `true || false` (valida se o valor é um número de cartão de crédito válido)
- **isEmail**: `true || false` (valida se o valor é um e-mail válido)
- **isMobilePhone**: `locale` (valida se é um número de telefone válido para um país específico)
- **equals**: `valor` (garante que o valor seja exatamente igual ao especificado)
- **contains**: `substring` (garante que o valor contenha uma determinada sequência de caracteres)
- **not**: `expressão_regular` (garante que o valor **não** corresponda à expressão regular fornecida)
- **notIn**: `[[valores]]` (garante que o valor **não** esteja na lista fornecida)
- **notContains**: `substring` (garante que o valor **não** contenha a sequência de caracteres especificada)
- **notNull**: `true || false` (impede que o valor seja `null`)
- **isJSON**: `true || false` (verifica se a string pode ser convertida para um JSON válido, muito simples)




O Sequelize oferece diversas validações para garantir a **consistência** e **segurança** dos dados. No entanto, os tipos `JSON` e `JSONB` não possuem validação nativa para seu conteúdo. Para suprir essa necessidade, foi criada uma interface de validação baseada em schemas, que assegura tanto a estrutura do JSON quanto a validação dos valores de suas chaves.

Para entender como os arquivos relacionados a esta validação funciona mais a fundo [clique aqui!](./json_validation_module.md)

## Validações do conteúdo JSON

```javascript
// exemplo exagerado de json só para dar um panorâma de uso de schemas json
const schema = {
	description: String,
	metadata: {
		user_id: (value) => typeof value === 'string' && value.length > 0,
		role: (value) => /^(admin|user|employee|moderator|guest)$/.test(value),
		account_status: (value) => /^(active|inactive|suspended|banned)$/.test(value),

		profile: {
			name: (value) => typeof value === 'string' && value.trim().length > 1,
			age: (value) => Number.isInteger(value) && value >= 13,
			email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
			phone: (value) => value === null || /^\+\d{1,3}\s?\d{4,14}$/.test(value),
			address: {
				street: (value) => typeof value === 'string' && value.trim().length > 2,
				city: (value) => typeof value === 'string' && value.trim().length > 2,
				postal_code: (value) => /^\d{5}-\d{3}$/.test(value),
				country: (value) => typeof value === 'string' && value.length === 2,
			},
		},

		configs: {
			darkTheme: (value) => value === null || typeof value === 'boolean',
			colorPreferences: {
				header_and_footer: (value) =>
					value === null ||
					/^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0|1|0?\.\d+)\)$/.test(value),
				border_profile_photo: (value) =>
					value === null ||
					/^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0|1|0?\.\d+)\)$/.test(value),
			},
			notifications: {
				email: (value) => typeof value === 'boolean',
				sms: (value) => typeof value === 'boolean',
				push: (value) => typeof value === 'boolean',
			},
		},

		social_links: {
			github: (value) => value === null || /^https:\/\/github\.com\/.+$/.test(value),
			linkedin: (value) =>
				value === null || /^https:\/\/www\.linkedin\.com\/in\/.+$/.test(value),
			twitter: (value) => value === null || /^https:\/\/twitter\.com\/.+$/.test(value),
			meta_interprise: {
				instagram: (value) =>
					value === null || /^https:\/\/www\.instagram\.com\/.+$/.test(value),
				facebook: (value) =>
					value === null || /^https:\/\/www\.facebook\.com\/.+$/.test(value),
			},
		},

		permissions: {
			can_edit: (value) => typeof value === 'boolean',
			can_delete: (value) => typeof value === 'boolean',
			can_create_users: (value) => typeof value === 'boolean',
			can_manage_roles: (value) => typeof value === 'boolean',
		},

		logs: {
			last_login: (value) => typeof value === 'string' && !isNaN(Date.parse(value)),
			last_action: (value) =>
				value === null ||
				["login", "logout", "update_profile", "delete_account"].includes(value),
			ip_address: (value) =>
				/^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/.test(value),
		},
	},
};

```
