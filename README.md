Frontend Boilerplate for Directual developers

Описание
Этот проект является примером интеграции фронтенд-приложения, написанного на React с приложением, разработанным при помощи платформы Directual(https://readme-ru.directual.com/). Платформа Directual не ограничивает выбор фронтенд фреймворков, так что вы можете использовать любой понравившийся вам фреймворк или же вовсе обойтись без него.

Используемые технологии:
Create React App (https://github.com/facebook/create-react-app),
TypeScript (http://www.typescriptlang.org/),
Redux (https://github.com/reduxjs/redux) + Redux Saga(https://github.com/redux-saga/redux-saga/blob/master/README_ru.md),
directual-api (https://www.npmjs.com/package/directual),
storybook-directual(https://www.npmjs.com/package/storybook-directual),
Connected react router(https://github.com/supasate/connected-react-router),
Moment (https://github.com/moment/moment/),
Lodash (https://github.com/lodash/lodash),
React-intl(https://github.com/formatjs/react-intl),
Axios (https://github.com/axios/axios),
Также на проекте настроен ESLint (react-app + airbnb-typescript), husky.

Установка
Убедитесь, что на вашем компьютере установлены
git (https://www.atlassian.com/git/tutorials/install-git),
nodejs (https://nodejs.org/en/download/)
npm (https://www.npmjs.com/get-npm)
Сделайте форк репозитория https://gitlab.directual.com/platform/directual-boilerplate
Клонируйте репозиторий на свой компьютер
Перейдите в корневую папку проекта и выполните следующие команды в консоли
npm install  - установит все необходимые зависимости проекта
npm start - запустит приложение в режиме “development” с указанными параметрами окружения (о настройке параметров окружения см. раздел “Параметры окружения” о деплое приложения, см секцию “Деплоим в продакшен”)
Параметры окружения

Для корректной интеграции с вашим приложением Directual необходимо указать следующие параметры окружения в файле .env.development. В файле .env.development все параметры имеют префикс REACT_APP_ ввиду специфики примера. В режиме “production” или в другом вашем приложении использование этого префикса необязательно.


Поле | Значение по умолчанию | Можно изменять | Как получить | описание
------------ | ------------- | ------------ | -------------
APP_PORT | 3000 | Да | Можно указать свое значение | Порт, на котором запустится ваше клиентское приложение
API_URL | https://directual.com | Да | Используйте значение по умолчанию, или зарегистрируйте поддомен для своей организации | Базовый URL, на который будут направляется все запросы к платформе directual с использованием directual-api
NETWORK_ID | - | Да | https://readme-ru.directual.com/nachalo-raboty/obzor-interfeisa-administratora | На экране управления приложениями, в карточке приложения поле id соответствует значению NETWORK_ID для вашего приложения. (Например 2243)
Параметр, необходимый для осуществления авторизации в вашем приложении с фронта
API_PASSWORD | - | Да | https://readme-ru.directual.com/tochki-dostupa-api/rest-api | (Поле APP_SECRET) Секретный ключ вашего приложения
API_TOKEN | - | Да | https://readme-ru.directual.com/tochki-dostupa-api/rest-api | (Поле APP_ID) Ключ API вашего приложения
GOOGLE_CLIENT_ID | - | Да | https://developers.google.com/identity/protocols/OAuth2 | Идентификатор вашего приложения google. Нужен, в случае если вы используете Google OAuth2.0

Важно! API_PASSWORD и API_TOKEN это приватная информация! Не рекомендуется эту информацию пушить в удаленный репозиторий.
Указав необходимое окружение и запустив команду npm start у вас запустится готовое приложение с авторизацией и главной страницей.
Для того, чтобы авторизоваться, вам необходимо будет добавить пользователя в ваше приложение(https://readme-ru.directual.com/nachalo-raboty/obzor-interfeisa-administratora/upravlenie-polzovatelyami). Также необходимо будет добавить пользователя в структуру WebUser в вашем приложении.

Также вы можете настроить Google OAuth2.0. В случае, если вы не указали параметр окружения GOOGLE_CLIENT_ID, вы не увидите кнопку “Login with Google”

В случае успешного логина, вы попадете на главную страницу приложения

Запросы
Взаимодействие с Directual происходит с через API Endpoints, которые настраиваются в соответствующем разделе приложения Directual 
Ссылка на документацию - https://readme-ru.directual.com/tochki-dostupa-api/

Запросы, которые вы осуществляете через directual-api - проксируются. В режиме development применяется прокси из файла “src/setupProxy.js” (https://create-react-app.dev/docs/proxying-api-requests-in-development), если вы собрали приложение, то для работы приложения необходимо запустить файл “server/server.js”, который запустит express-server, отвечающий за проксирование запросов и раздачу статического содержимого приложения.

Для отправления запросов с фронта используется библиотека directual метод api
Пример

import { api } from 'directual';

// GET запрос
function getData(params) {
  return api
    .structure(‘webUsers’)
    .getData(‘getUser’, params);
}
// POST запрос
function addData(payload) {
  return api
    .structure(‘books’)
    .sendData(‘addBook’, payload);
}

метод api возвращает Promise

Авторизация
В boilerplate реализована авторизация - отправляется запрос в структуру webUser, куда передается id и password
Чаще всего в id хранится почта юзера
Пароль хранится в формате md5
Например юзер { id: test, password: test } на платформе хранится как { id: test, password: 098f6bcd4621d373cade4e832627b4f6 }

Google авторизация
В boilerplate подключена Google авторизация, для её работы необходимо настроить своё приложение в Google и добавить в параметры запуска приложения параметр - “GOOGLE_CLIENT_ID”
Загрузка файлов
Загрузка файлов происходить с помощью метода api.fileUpload, например:
function uploadFile(file) {
  return api
    .fileUpload(file)
    .then(data => data.result);
}
Файл сохраняется в структуру fileUpload в платформенном приложении.

Деплоим в продакшен
Когда ваше приложение будет готово, вы можете запустить команду npm run build, которая соберет билд для продакшена. Когда он будет готов, вы можете запустить файл “server/server.js” с необходимыми параметрами окружения.

Например:
PORT='3000' NODE_ENV='production' API_URL='https://directual.com' AUTH_PATH='/good/v4/auth' API_PATH='/good/api/v3' API_PASSWORD='bbyINFPgHHs' API_TOKEN='540460cc-4a0a-4f80-a077-f7c647bb4e44' NETWORK_ID='2338' GOOGLE_CLIENT_ID='567532464802-1df3g5k74vui341sf2hl2jac2flpgsl.apps.googleusercontent.com' node server/server.js
