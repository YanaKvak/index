// Плавный скролл к элементу
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Добавляем обработчики событий для кнопок категорий
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.category-button[data-category="popular"]').addEventListener('click', function() {
        smoothScroll('.popular-plants');
    });
    document.querySelector('.category-button[data-category="sun"]').addEventListener('click', function() {
        smoothScroll('.sun-plants');
    });
    document.querySelector('.category-button[data-category="shady"]').addEventListener('click', function() {
        smoothScroll('.shady-plants');
    });
    document.querySelector('.category-button[data-category="kitchen"]').addEventListener('click', function() {
        smoothScroll('.kitchen-plants');
    });
    document.querySelector('.category-button[data-category="bedroom"]').addEventListener('click', function() {
        smoothScroll('.bedroom-plants');
    });

    // Кнопка возврата к началу страницы
    const scrollToTopButton = document.getElementById("scrollToTop");
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    };

    // Плавный скролл к началу страницы
    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Обработчики выбора почвы и освещенности
    const soilTypeSelect = document.getElementById("soilType");
    const lightTypeSelect = document.getElementById("lightType");

    soilTypeSelect.addEventListener("change", function () {
        const selectedSoil = soilTypeSelect.options[soilTypeSelect.selectedIndex].text;
        console.log(`Выбран тип почвы: ${selectedSoil}`);
    });

    lightTypeSelect.addEventListener("change", function () {
        const selectedLight = lightTypeSelect.options[lightTypeSelect.selectedIndex].text;
        console.log(`Выбрана освещенность: ${selectedLight}`);
    });
});

// Валидация формы
function validateForm(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const numberInput = document.getElementById('number');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?\d{10,15}$/;

    if (!emailPattern.test(emailInput.value)) {
        alert("Пожалуйста, введите корректный адрес электронной почты.");
        return;
    }

    if (!phonePattern.test(numberInput.value)) {
        alert("Пожалуйста, введите корректный номер телефона в формате +7XXXXXXXXXX.");
        return;
    }

    // Если все данные корректны, отправляем форму
    sendEmail(event);

    // Очищаем форму после отправки
    document.getElementById("myForm").reset();
}


// Данные для поиска растений
const plants = [
    { name: "Потос", link: "pothos.html" },
    { name: "Фиалка", link: "violet.html" },
    { name: "Алоэ вера", link: "aloe-vera.html" },
    { name: "Орхидея", link: "orchid.html" },
    { name: "Хлорофитум", link: "hlorophytum.html" },
    { name: "Суккуленты", link: "succulents.html" },
    { name: "Гербера", link: "gerbera.html" },
    { name: "Лаванда", link: "lavanda.html" },
    { name: "Агавы", link: "agave.html" },
    { name: "Кактусы", link: "cactus.html" },
    { name: "Аглаонема", link: "aglaonema.html" },
    { name: "Каладий", link: "caladium.html" },
    { name: "Бегония", link: "begonia.html" },
    { name: "Камелия", link: "camellia.html" },
    { name: "Филодендрон", link: "philodendron.html" },
    { name: "Базилик", link: "basil.html" },
    { name: "Петрушка", link: "parsley.html" },
    { name: "Мелисса", link: "melissa.html" },
    { name: "Череда", link: "chamomile.html" },
    { name: "Кинза", link: "cilantro.html" },
    { name: "Сансевиерия", link: "sansevieria.html" },
    { name: "Спатифиллум", link: "spathiphyllum.html" },
    { name: "Узумбарская фиалка", link: "uzumbara-violet.html" },
    { name: "Папоротник", link: "fern.html" },
    { name: "Герань", link: "geranium.html" },
    { name: "Монстера", link: "monstera" },
    { name: "Фикус Бенджамина", link: "ficus-benjamina" },
    { name: "Каланхоэ", link: "kalanchoe" },
    { name: "Орхидея Фаленопсис", link: "orchid-phalaenopsis" },
    { name: "Замиокулькас", link: "zamioculcas" },
    { name: "Папоротник нефролепис", link: "nephrolepis" },
    { name: "Спатифиллум", link: "spathiphyllum" },
    { name: "Пеперомия", link: "peperomia" },
    { name: "Мята", link: "mint" },
    { name: "Тимьян", link: "thyme" },
    { name: "Пилея", link: "pilea" },
    { name: "Алоказия", link: "alocasia" },
    { name: "Хойя", link: "hoya" },
    { name: "Валотта", link: "valotta" },
    { name: "Калатея", link: "calathea" }
];

// Элементы для поиска
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Проверяем, что элементы существуют
if (searchInput && searchResults) {
    // Функция для отображения результатов поиска
    function displayResults(query) {
        searchResults.innerHTML = ''; // Очищаем предыдущие результаты

        if (!query) { // Если нет запроса, скрываем результаты
            searchResults.style.display = 'none';
            return;
        }

        // Фильтрация по запросу
        const results = plants.filter(plant => 
            plant.name.toLowerCase().startsWith(query.toLowerCase())
        );

        // Показ результатов, если есть совпадения
        if (results.length > 0) {
            searchResults.style.display = 'block';
            results.forEach(plant => {
                const item = document.createElement('div');
                item.classList.add('search-result-item');
                item.textContent = plant.name;

                // Переход по ссылке при клике
                item.addEventListener('click', () => {
                    window.location.href = plant.link;
                });

                searchResults.appendChild(item);
            });
        } else {
            searchResults.style.display = 'none';
        }
    }

    // Обработчик ввода текста
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        displayResults(query);
    });

    // Скрытие результатов при клике вне области поиска
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
}
