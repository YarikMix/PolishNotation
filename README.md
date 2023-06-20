# PolishNotation
Движок для парсинга и вычисления математических выражений с помощью польской нотации

Созданный движок позволяет вычислять результат математических выражений, а также тождеств и неравенств

Доступные бинарные операции:

+, -, *, /, ^, (, )

Операции сравнения:

<, >, <=, =>, ==

Унарные операции:

sin, cos, abs

Также доступна передача параметров в виде словаря (ключ - значение)


**Алгоритм состоит из трех частей**

1. Токенизация выражения (tokenization.mjs)
2. Перевод из инфкисной формы записи в постфиксную (infixToPostfix.mjs)
3. Вычисление выражения с помощью Польской нотации (evalRPN.mjs)
