# MoneyKeeper -

Это приложение для учета доходов и расходов, а также планирования личных финансов. Вот некоторые ключевые возможности:

## Учет бюджета

Вы легко можете отслеживать свой личный или семейный бюджет

<hr>

## Статистика расходов и доходов

С помощью графиков на странице **'DashBoard'** вы можете просматривать статистику своих расходов или доходов

<hr>

## Планирование бюджета

С помощью календаря на странице **'Calendar'** вы с легкостью можете устанавливать и корректировать месячный бюджетный план

<hr>

#### Это простое приложение, которое предоставляет альтернативу сложным бюджетным приложениям. Вы можете использовать [<u>***MoneyKeeper***</u>] даже если раньше не работали с подобными приложениями. Оно поможет вам эффективно управлять своими финансами и достичь ваших финансовых целей.

<hr>

## Содержание

-   [Как запустить проект](#как-запустить-проект)
-   [Stack технологий](#stack-технологий)
-   [Страницы проекта](#страницы-проекта)
-   [Отчет по выполненному ТЗ](#отчет-по-выполненному-тз)
-   [Команда разработчиков](#команда-разработчиков)

## Как запустить проект

1. Скачать Angular (прописать `npm install -g @angular/cli` в терминале).
2. Загрузить проект к себе.
3. Прописать `npm install` для загрузки необходимых модулей.
4. Прописать в терминале `npm start` или `ng serve` для запуска проекта.

## Stack технологий

-   <u>_Angular_</u> версии 17.3.4
-   <u>_NodeJS_</u> версии 18.18.0
-   <u>_FireBase_</u> в качестве СУБД

## Страницы проекта

-   Приветственная страница с кнопками для регистрации или входа<br>
    ![Welcome page](https://github.com/Easy-Lane/money-keeper/blob/user-profile/src/assets/readme-images/readme-welcome.png)

<hr>

-   Страница с возможностью изменить данные профиля<br>
    ![User Profile](https://github.com/Easy-Lane/money-keeper/blob/cb44075e46ac480c987fb2725e0527c079ae8aa6/src/assets/readme-images/readme-user-profile.png)

<hr>

-   Страница с графиками анализа расходов и доходов<br>
    ![DashBoard](https://github.com/Easy-Lane/money-keeper/assets/129308099/c7e9544f-9bad-473f-8ec7-ff31b12f4fbe)

<hr>

-   Страница с календарём, в котором можно посмотреть и добавить расход и доход за любой день<br>
    ![Calendar](https://github.com/Easy-Lane/money-keeper/assets/129308099/e48208c7-7fd6-4ea5-8885-988553372372)

<hr>

## Отчет по выполненному ТЗ

| Пункт ТЗ                                                | Путь в проекте                                                                                                                                                                     |
|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 3-4 реактивные формы                                    | src/app/components/authorization/login/login.component.ts<br/>src/app/components/authorization/register/register.component.ts<br/>src/app/pages/user-profile/user-profile.component.ts |
| 2-3 функциональных модуля                               | любой компонент                                                                                                                                                                    |
| Простое внедрение зависимостей                          | любой компонент                                                                                                                                                                    |
| 3 lazy-модуля для роутинга                              | src/app/app.routes.ts                                                                                                                                                              |
| Компоненты используют @Input @Output                    | src/app/components/skeleton/skeleton.component.ts<br/>Ещё надо Output                                                                                                              |
| Базовый rxjs                                            | src/app/services/UserSercive/UserManagmentService.ts                                                                                                                               |
| Паттерн фабрика                                         | src/app/app.config.ts                                                                                                                                                              |
| Reusable компоненты                                     | src/app/components/header-navigation/header-navigation.component.ts<br/>src/app/components/skeleton/skeleton.component.ts                                                          |
| Передача параметров в роутах                            | src/app/components/header-navigation/header-navigation.component.ts                                                                                                                |
| Guard's / Guarded routing                               | src/app/guards/auth.guard.ts                                                                                                                                                       |
| 1-2 кастомная атрибутивная директива                    | src/app/directives/money-class.directive.ts                                                                                                                                        |
| 1-2 кастомная структырная директива                     | src/app/directives/for-charts.directive.ts                                                                                                                                         |
| 1-2 кастомных пайпа                                     | src/currency-pipe/currency.pipe.ts                                                                                                                                                 |
| Использование @ViewChild @ViewChildren                  | src/app/components/authorization/authorization-buttons/authorization-buttons.component.ts                                                                                          |
| Запросы на сервер                                       | Firebase                                                                                                                                                                           |
| Форматирование кода в соответствии с code-style         | использование .eslint.json                                                                                                                                                         |
| MVVM                                                    | src/app/components/input-control/input-control.component.ts                                                                                                                        |
| Сложное внедрение зависимостей                          | src/app/interfaces/IUserInterface.ts                                                                                                                                               |
| Global Error Handler                                    | src/app/services/global-error-handler/global-error-handler.service.ts                                                                                                              |
| Хлебные крошки / Breadcrumbs                            | src\app\services\breadcrumb-service\breadcrumb.service.ts<br/>src\app\components\breadcrumbs\breadcrumbs.component.ts                                                                                                                          |
| Использование @HostListener                             | src/app/components/calendar/slideout-menu/slideout-menu.component.ts<br/>src/app/components/header-navigation/header-navigation.component.ts                                       |
| Динамический рендер компоненты                          | src/app/pages/user-profile/user-profile.component.html (с 81 строчки)                                                                                                              |
| Скелетоны                                               | src/app/components/skeleton/skeleton.component.ts                                                                                                                                  |
| Адаптивность                                            | Адаптив есть на всём проекте                                                                                                                                                       |
| Angular animations                                      | src/app/components/header-navigation/header-navigation.component.ts                                                                                                                |
| Глобальный сервис события                               | src/app/services/open-slideout-service/slideout-controll-service.ts                                                                                                                |

<hr>

## Команда разработчиков

-   [**Калугин Илья**](https://github.com/scary327) - Welcome Page, User Profile, Header, Readme, Skeletons
-   [**Рябков Георгий**](https://github.com/PepegaSlayer) - Calendar, Firebase, Routing,
-   [**Остролуцкий Матвей**](https://github.com/emper10N) - DashBoard, Паттерн Фабрика
-   [**Шилков Никита**](https://github.com/straxissosad) - Куратор проекта
