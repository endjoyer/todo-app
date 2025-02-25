# TODO App

## Описание

Это SPA TODO-приложение, созданное в рамках тестового задания. Приложение позволяет управлять задачами, распределяя их по статусам и сохраняя данные после перезагрузки страницы.

## Деплой

Приложение развернуто по адресу: [todo-app-six-delta-32.vercel.app](https://todo-app-six-delta-32.vercel.app)

## Основной функционал

- Страница выбора проекта.
- Страница с задачами, содержащая три колонки:
  - **Queue** (Очередь)
  - **Development** (В разработке)
  - **Done** (Готово)
- Возможность изменения статуса задачи через drag-n-drop.
- Полноценная карточка задачи с возможностью редактирования и добавления подзадач.
- Каскадные комментарии (подобно Reddit/Picabu).
- Поиск по номеру и заголовку задачи.
- Возможность добавления вложенных файлов.
- Сохранение данных после перезагрузки страницы.
- Адаптивность под мобильные устройства.
- Плавные анимации и отзывчивый интерфейс.

## Используемый стек

- **React** (Create React App)
- **Redux**
- **SASS**

## Запуск проекта

1. Установите зависимости:
   ```sh
   npm install
   ```
2. Запустите проект в режиме разработки:
   ```sh
   npm start
   ```
3. Для сборки проекта используйте:
   ```sh
   npm run build
   ```
