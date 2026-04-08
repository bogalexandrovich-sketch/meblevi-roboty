const projects = [
    { title: "Дитяча 'Мрія'", material: "ЛДСП Egger", category: "Дитячі", image: "assets/images/kids-1.jpg" },
{ title: "Кухня Anthracite", material: "МДФ фарбований", category: "Кухні", image: "assets/images/kitchen-1.jpg" },
{ title: "Тумба під ТВ", material: "Шпон", category: "Вітальні", image: "assets/images/living-1.jpg" },
// Додайте сюди інші роботи
];

function renderPage() {
    const params = new URLSearchParams(window.location.search);
    const categoryFilter = params.get('cat') || 'Всі';

    // Оновлюємо заголовок на сторінці
    const titleElement = document.querySelector('h2');
    if (titleElement) titleElement.innerText = categoryFilter === 'Всі' ? 'Наші роботи' : categoryFilter;

    const container = document.querySelector('.grid');
    const filtered = categoryFilter === 'Всі'
    ? projects
    : projects.filter(p => p.category === categoryFilter);

    if (filtered.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-400 py-10">У цій категорії поки немає робіт.</p>`;
        return;
    }

    container.innerHTML = filtered.map(project => `
    <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
    <div class="h-64 bg-gray-200">
    <img src="${project.image}" alt="${project.title}"
    onerror="this.parentElement.innerHTML='<div class=\'flex items-center justify-center h-full text-gray-400\'>Фото скоро буде</div>'"
    class="w-full h-full object-cover">
    </div>
    <div class="p-6">
    <span class="text-xs font-semibold text-amber-600 uppercase tracking-wider">${project.category}</span>
    <h3 class="text-xl font-bold mt-1 mb-2">${project.title}</h3>
    <p class="text-gray-600 text-sm mb-4">${project.material}</p>
    <button class="w-full border-2 border-black py-2 rounded-lg hover:bg-black hover:text-white transition font-medium">
    Детальніше
    </button>
    </div>
    </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderPage);
function highlightActiveLink() {
    const params = new URLSearchParams(window.location.search);
    const currentCat = params.get('cat');
    const navLinks = document.querySelectorAll('#main-nav a');
    const isContactsPage = window.location.pathname.includes('contacts.html');

    navLinks.forEach(link => {
        // Скидаємо стилі для всіх посилань
        link.classList.remove('text-amber-600', 'font-bold', 'border-amber-600');
        link.classList.add('border-transparent', 'text-gray-600');

        const linkText = link.innerText.trim();

        if (isContactsPage && linkText === 'Контакти') {
            // Підсвітка контактів на їхній сторінці
            setActive(link);
        } else if (!isContactsPage && !currentCat && linkText === 'Всі') {
            // Підсвітка "Всі", якщо ми на головній без параметрів
            setActive(link);
        } else if (!isContactsPage && currentCat === linkText) {
            // Підсвітка активної категорії (Кухні, Шафи і т.д.)
            setActive(link);
        }
    });
}

function setActive(el) {
    el.classList.add('text-amber-600', 'font-bold', 'border-amber-600');
    el.classList.remove('border-transparent', 'text-gray-600');
}

// Викликаємо функцію після завантаження контенту
document.addEventListener('DOMContentLoaded', () => {
    // Ваші попередні виклики (наприклад, renderPage)
    highlightActiveLink();
});
