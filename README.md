# Screenplay Rating Analyzer (Frontend-сервис)

Руководство для развёртывания Frontend-сервиса на Linux и Windows

# Установка NodeJS 22.21

## ✅ Проверка: может, NodeJS уже установлен?

```bash
node --version
```

Если команда работает и показывает версию не ниже 18 → **NodeJS уже установлен**, 

Если команда не найдена → продолжи установку ниже.

---

## 🐧 Установка на Ubuntu/Debian

```bash
curl -sL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh

sudo bash nodesource_setup.sh

sudo apt install nodejs -y
```

## ❖ Установка на Windows

Скачай и установи: https://nodejs.org/dist/v22.21.1/node-v22.21.1-x64.msi

# Установка зависимостей

```bash
npm install
```

# Старт сервиса в режиме отладки

```bash
npx quasar dev
```

# Production-сборка

```bash
npx quasar build
```
