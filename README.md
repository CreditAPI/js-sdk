![CreditAPI LOGO](https://creditapi.ru/assets/img/favicon.png)
https://creditapi.ru
# Credit API JS SDK
## JavaScript библиотека для работы с CreditAPI 

###Установка модуля
    node install credit-api
    
Возможно использование библиотеки в typescript приложениях
    import CreditApi from 'credit-api';
    
Или в качестве обычного JS класса
    const CreditApi = require('credit-api');

Перед началом использования библиотеки - ее необходимо инцициализировать
    CreditApi.init({CREDIT_API_HOST},{CREDIT_API_ORG});


### Доступные методы


    CreditApi.login(username,password) //авторизация. В качестве username может использоваться телефон или email

    CreditApi.signup(email,phone,password) //регистрация нового пользователя
    
    CreditApi.logout() //Удаление сессионного токена (Выход)
    
    CreditApi.refreshUser() //Загрузка текущего пользователя - необходимо вызывать каждый раз после загрузки страницы
    
    CreditApi.saveUserdata(data) //сохранение личных данных пользователя
    
    CreditApi.getCreditProducts() //получение списка кредитных продуктов
    
    CreditApi.getCreditProduct(id) //получение кредитного продукта по ID
    
    CreditApi.getLoans() //получение списка всех кредитов текущего пользователя
    
    CreditApi.getOpenedLoans() //получение списка открытых кредитов текущего пользователя
    
    CreditApi.getLoan(id) // получение информации о пользователе по ID
    
    CreditApi.getMoney(id) //запрос на перечисление денег по одобренной заявке
    
    CreditApi.getCards(refresh) // получение списка карт пользователя (refresh=true, чтобы принудительно обновить список карт)
    
    CreditApi.linkCard(return_url) //получить ссылку для привязки новой карты
    
    CreditApi.unlinkCard(id) //отвязать карту
    
    CreditApi.getApplicationFields(credit_product_id) //получить список полей для анкеты. credit_product_id можно не указывать
    
    CreditApi.sendVerificationCode() //отправить код верификации на мобильный телефон пользователя
    
    CreditApi.checkVerificationCode(sms_code) //проверить код верификации 
    
    CreditApi.newLoan(credit_product,amount,term,card_id) //создать заявку на новый кредит
    
    CreditApi.cancelLoan(id) // отменить заявку на новый кредит
    
    CreditApi.getRequiredDocuments() //получить список документов, обязательный для размещения на сайте
    
    getDocument(name) //получить документ по наименованию
    
    signDocument(name) //подписать документ
    
### Доступные объекты

    CreditApi.User //текущий авторизованный пользователь
    
    
Порядок выдачи кредита описан в документе "Общий порядок выдачи кредита", доступный в личном кабинете в разделе Интеграция/Инструкции

Подробное описание методов и объектов - в разделе Интеграция/Swagger

Пример использования данной библиотеки и шаблон готового сайта здесь: https://github.com/CreditAPI/CreditApiTemplateApp

