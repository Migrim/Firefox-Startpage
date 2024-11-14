document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchEngineSelect = document.getElementById('search-engine');
    const urlIcon = document.getElementById('url-icon');

    function updatePlaceholder() {
        const selectedEngine = localStorage.getItem('searchEngine') || 'google';
        let placeholderText;
    
        switch (selectedEngine) {
            case 'google':
                placeholderText = 'Search with Google or enter a URL';
                break;
            case 'duckduckgo':
                placeholderText = 'Search with DuckDuckGo or enter a URL';
                break;
            case 'bing':
                placeholderText = 'Search with Bing or enter a URL';
                break;
            case 'ecosia':
                placeholderText = 'Search with Ecosia or enter a URL';
                break;
            case 'yahoo':
                placeholderText = 'Search with Yahoo or enter a URL';
                break;
            case 'startpage':
                placeholderText = 'Search with Startpage or enter a URL';
                break;
            case 'swisscows':
                placeholderText = 'Search with Swisscows or enter a URL';
                break;
            case 'qwant':
                placeholderText = 'Search with Qwant or enter a URL';
                break;
            case 'yandex':
                placeholderText = 'Search with Yandex or enter a URL';
                break;
            case 'brave':
                placeholderText = 'Search with Brave or enter a URL';
                break;
            case 'baidu':
                placeholderText = 'Search with Baidu or enter a URL';
                break;
            case 'ask':
                placeholderText = 'Search with Ask or enter a URL';
                break;
            case 'wolframalpha':
                placeholderText = 'Search with Wolfram Alpha or enter a URL';
                break;
            case 'mojeek':
                placeholderText = 'Search with Mojeek or enter a URL';
                break;
            case 'metager':
                placeholderText = 'Search with MetaGer or enter a URL';
                break;
            case 'dogpile':
                placeholderText = 'Search with Dogpile or enter a URL';
                break;
            case 'searx':
                placeholderText = 'Search with Searx or enter a URL';
                break;
            case 'you':
                placeholderText = 'Search with You.com or enter a URL';
                break;
            case 'peekier':
                placeholderText = 'Search with Peekier or enter a URL';
                break;
            case 'presearch':
                placeholderText = 'Search with Presearch or enter a URL';
                break;
            case 'info':
                placeholderText = 'Search with Info.com or enter a URL';
                break;
            default:
                placeholderText = 'Search or enter a URL';
        }
    
        searchInput.placeholder = placeholderText;
    }
    
    function getSearchUrl(query) {
        const selectedEngine = localStorage.getItem('searchEngine') || 'google';
        
        switch (selectedEngine) {
            case 'google':
                return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            case 'duckduckgo':
                return `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
            case 'bing':
                return `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            case 'ecosia':
                return `https://www.ecosia.org/search?q=${encodeURIComponent(query)}`;
            case 'yahoo':
                return `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
            case 'startpage':
                return `https://www.startpage.com/sp/search?q=${encodeURIComponent(query)}`;
            case 'swisscows':
                return `https://swisscows.com/web?query=${encodeURIComponent(query)}`;
            case 'qwant':
                return `https://www.qwant.com/?q=${encodeURIComponent(query)}`;
            case 'yandex':
                return `https://yandex.com/search/?text=${encodeURIComponent(query)}`;
            case 'brave':
                return `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
            case 'baidu':
                return `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
            case 'ask':
                return `https://www.ask.com/web?q=${encodeURIComponent(query)}`;
            case 'wolframalpha':
                return `https://www.wolframalpha.com/input/?i=${encodeURIComponent(query)}`;
            case 'mojeek':
                return `https://www.mojeek.com/search?q=${encodeURIComponent(query)}`;
            case 'metager':
                return `https://metager.org/meta/meta.ger3?eingabe=${encodeURIComponent(query)}`;
            case 'dogpile':
                return `https://www.dogpile.com/serp?q=${encodeURIComponent(query)}`;
            case 'searx':
                return `https://searx.org/search?q=${encodeURIComponent(query)}`;
            case 'you':
                return `https://you.com/search?q=${encodeURIComponent(query)}`;
            case 'neeva':
                return `https://peekier.com/#!${encodeURIComponent(query)}`;
            case 'presearch':
                return `https://engine.presearch.org/search?q=${encodeURIComponent(query)}`;
            case 'info':
                return `https://www.info.com/search?q=${encodeURIComponent(query)}`;
            default:
                return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }    
    
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.trim();

        if (query.match(/^https?:\/\//)) {
            window.location.href = query;
        } else {
            window.location.href = getSearchUrl(query);
        }
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim();
        urlIcon.style.display = query.match(/^https?:\/\//) ? 'inline' : 'none';
    });

    searchEngineSelect.addEventListener('change', function() {
        const selectedEngine = searchEngineSelect.value;
        localStorage.setItem('searchEngine', selectedEngine);
        updatePlaceholder();
    });

    function loadSettings() {
        const savedEngine = localStorage.getItem('searchEngine') || 'google';
        searchEngineSelect.value = savedEngine;
        updatePlaceholder();
    }

    loadSettings();
});


document.addEventListener('keydown', function(event) {
    const searchInput = document.getElementById('search-input');

    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        if ((event.altKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            searchInput.focus();
        }

        if ((event.metaKey || event.altKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            searchInput.focus();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const currentVersion = '2.2'; 
    const storedVersion = localStorage.getItem('version');

    const notification = document.getElementById('version-notification');
    const closeNotification = document.getElementById('close-notification');

    function isNewerVersion(stored, current) {
        if (!stored) return true;  

        const storedParts = stored.split('.').map(Number);
        const currentParts = current.split('.').map(Number);

        for (let i = 0; i < Math.max(storedParts.length, currentParts.length); i++) {
            const storedPart = storedParts[i] || 0;
            const currentPart = currentParts[i] || 0;
            if (currentPart > storedPart) return true;
            if (currentPart < storedPart) return false;
        }
        return false;
    }


    if (!storedVersion || isNewerVersion(storedVersion, currentVersion)) {
        notification.style.display = 'flex';  
    } else {
        notification.style.display = 'none';  
    }

    closeNotification.addEventListener('click', function() {
        notification.style.display = 'none';  
        localStorage.setItem('version', currentVersion); 
        console.log(`Version ${currentVersion} stored in localStorage.`);
    });
})

document.addEventListener('DOMContentLoaded', function() {
    const dateWidget = document.getElementById('date-widget');
    
    const tooltip = document.createElement('div');
    tooltip.classList.add('custom-tooltip');
    document.body.appendChild(tooltip);

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th'; 
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    function updateDateWidget() {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();

        const monthEmojis = [
            '❄️', '⛄', '🌸', '🌷', '☀️', '🍉', '🌈', '🌻', '🍂', '🎃', '🍁', '🎄'
        ];

        const specialDays = {
            '1-1': { emoji: '🎆', description: "New Year's Day" },
            '1-15': { emoji: '🍕', description: "National Pizza Day" },
            '1-21': { emoji: '🦸‍♂️', description: "National Hugging Day" },
            '1-27': { emoji: '🕯️', description: "Holocaust Remembrance Day" },
            '2-2': { emoji: '🦫', description: "Groundhog Day" },
            '2-11': { emoji: '🔬', description: "the International Day of Women and Girls in Science" },
            '2-14': { emoji: '💖', description: "Valentine's Day" },
            '2-20': { emoji: '⚖️', description: "the World Day of Social Justice" },
            '2-29': { emoji: '👻', description: "Leap Day, a rare and mysterious occurrence" },
            '3-2': { emoji: '🧛', description: "the anniversary of the discovery of the 'Vampire Star' feeding on its neighbor" },
            '3-8': { emoji: '🌷', description: "International Women's Day" },
            '3-14': { emoji: '🥧', description: "Pi Day" },
            '3-20': { emoji: '🌌', description: "the Spring Equinox and a day to celebrate our galaxy" },
            '3-21': { emoji: '🌈', description: "the International Day for the Elimination of Racial Discrimination" },
            '3-31': { emoji: '🏳️‍⚧️', description: "the International Transgender Day of Visibility" },
            '4-1': { emoji: '🤡', description: "April Fool's Day" },
            '4-7': { emoji: '🏥', description: "World Health Day" },
            '4-10': { emoji: '🕳️', description: "the anniversary of the Black Hole Image Release" },
            '4-12': { emoji: '🚀', description: "Yuri's Night, celebrating the first human in space" },
            '4-22': { emoji: '🌎', description: "Earth Day" },
            '4-30': { emoji: '👽', description: "the anniversary of the Kepler Telescope confirming the first Earth-sized planet in a habitable zone" },
            '5-1': { emoji: '⚒️', description: "International Workers' Day" },
            '5-4': { emoji: '⭐', description: "Star Wars Day" },
            '5-11': { emoji: '💀', description: "the day the closest known black hole was discovered" },
            '5-17': { emoji: '🏳️‍🌈', description: "the International Day Against Homophobia, Transphobia, and Biphobia" },
            '5-25': { emoji: '🚀', description: "Geek Pride Day" },
            '6-5': { emoji: '🌍', description: "World Environment Day" },
            '6-10': { emoji: '🪐', description: "the anniversary of the discovery of Neptune's rings" },
            '6-18': { emoji: '🧀', description: "International Sushi Day" },
            '6-20': { emoji: '🆘', description: "World Refugee Day" },
            '6-21': { emoji: '🌞', description: "the Summer Solstice" },
            '6-22': { emoji: '🪦', description: "the day a 'Zombie' star system was discovered" },
            '6-28': { emoji: '🏳️‍🌈', description: "the anniversary of the Stonewall Riots" },
            '7-6': { emoji: '🍫', description: "World Chocolate Day" },
            '7-16': { emoji: '🌌', description: "the anniversary of the Apollo 11 Moon Landing" },
            '7-18': { emoji: '✊', description: "Nelson Mandela International Day" },
            '7-20': { emoji: '🍦', description: "National Ice Cream Day" },
            '7-25': { emoji: '📡', description: "the anniversary of the first detection of an extraterrestrial radio burst" },
            '7-30': { emoji: '🤝', description: "the International Day of Friendship" },
            '8-6': { emoji: '☮️', description: "Hiroshima Peace Memorial Day" },
            '8-10': { emoji: '🕸️', description: "National S'mores Day, best enjoyed with spooky stories around the campfire" },
            '8-12': { emoji: '👧', description: "International Youth Day" },
            '8-15': { emoji: '🎙️', description: "the anniversary of the Wow! Signal" },
            '8-19': { emoji: '👐', description: "World Humanitarian Day" },
            '8-20': { emoji: '🌌', description: "the day Voyager 2 reached interstellar space" },
            '8-23': { emoji: '📖', description: "the International Day for the Remembrance of the Slave Trade and Its Abolition" },
            '8-30': { emoji: '🔦', description: "the anniversary of a strange flash observed in a distant galaxy cluster" },
            '9-5': { emoji: '📚', description: "the International Day of Charity" },
            '9-13': { emoji: '👩‍💻', description: "Programmer's Day" },
            '9-19': { emoji: '🏴‍☠️', description: "Talk Like a Pirate Day" },
            '9-21': { emoji: '🕊️', description: "the International Day of Peace" },
            '9-23': { emoji: '💜', description: "Bisexual Visibility Day" },
            '9-23': { emoji: '🛸', description: "the anniversary of a mysterious light source detected on Mars by the Curiosity Rover" },
            '9-30': { emoji: '🦇', description: "Bat Night, celebrating and exploring these mysterious creatures" },
            '10-1': { emoji: '🎶', description: "International Music Day" },
            '10-4': { emoji: '🐶', description: "World Animal Day" },
            '10-5': { emoji: '👩‍🏫', description: "World Teachers' Day" },
            '10-8': { emoji: '🏳️‍🌈', description: "International Lesbian Day" },
            '10-10': { emoji: '🧠', description: "World Mental Health Day" },
            '10-11': { emoji: '🏳️‍🌈', description: "National Coming Out Day" },
            '10-13': { emoji: '🪐', description: "the anniversary of Saturn's discovery by Galileo" },
            '10-16': { emoji: '🥖', description: "World Food Day" },
            '10-21': { emoji: '🔊', description: "the anniversary of the first detected mysterious space sound" },
            '10-26': { emoji: '🏳️‍⚧️', description: "Intersex Awareness Day" },
            '10-30': { emoji: '🔮', description: "the anniversary of mysterious signals detected from a distant galaxy" },
            '10-31': { emoji: '🎃', description: "Halloween" },
            '10-31': { emoji: '🌑', description: "the Spooky Moon Phase (Darkest Night)" },
            '11-8': { emoji: '⚛️', description: "World Radiography Day" },
            '11-11': { emoji: '🌌', description: "the anniversary of the discovery of the largest known galaxy" },
            '11-16': { emoji: '🕳️', description: "the day the first wandering black hole was discovered" },
            '11-19': { emoji: '👨', description: "International Men's Day" },
            '11-20': { emoji: '🏳️‍⚧️', description: "Transgender Day of Remembrance" },
            '11-25': { emoji: '🧡', description: "the International Day for the Elimination of Violence Against Women" },
            '11-28': { emoji: '🍁', description: "Giving Tuesday" },
            '12-1': { emoji: '🎗️', description: "World AIDS Day" },
            '12-3': { emoji: '♿', description: "the International Day of Persons with Disabilities" },
            '12-7': { emoji: '⚓', description: "Pearl Harbor Remembrance Day" },
            '12-8': { emoji: '💿', description: "Pretend to Be a Time Traveler Day" },
            '12-10': { emoji: '📟', description: "World Computer Literacy Day" },
            '12-10': { emoji: '🕊️', description: "Human Rights Day" },
            '12-11': { emoji: '🏞️', description: "International Mountain Day" },
            '12-12': { emoji: '👩‍💻', description: "the International Day of Code" },
            '12-14': { emoji: '👻', description: "the anniversary of the first detection of a 'ghost particle' from outside our galaxy" },
            '12-15': { emoji: '🎅', description: "National Ugly Sweater Day" },
            '12-18': { emoji: '🌌', description: "the anniversary of a new exoplanet discovery" },
            '12-21': { emoji: '❄️', description: "the Winter Solstice" },
            '12-24': { emoji: '🎅', description: "Christmas Eve" },
            '12-25': { emoji: '🎅', description: "Christmas Day" },
            '12-31': { emoji: '🎆', description: "New Year's Eve" },
            '10-13': { emoji: '🍂', description: "the Day of the Unlucky Friday the 13th" },
            '11-2': { emoji: '💀', description: "Day of the Dead" }
        };

        const todayKey = `${month + 1}-${day}`;
        const specialDay = specialDays[todayKey];
        const emoji = specialDay ? specialDay.emoji : monthEmojis[month];

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const ordinalSuffix = getOrdinalSuffix(day); 
        const formattedDate = `${day}${ordinalSuffix} of ${monthNames[month]} ${emoji}`;
        dateWidget.textContent = formattedDate;

        const tooltipText = specialDay 
            ? `Today is ${specialDay.description}! (${formattedDate})` 
            : `Today is ${formattedDate}`;

        tooltip.textContent = tooltipText;
    }

    updateDateWidget();

    dateWidget.addEventListener('mouseenter', function() {
        tooltip.style.display = 'block';
        tooltip.classList.add('show');
    });

    dateWidget.addEventListener('mousemove', function(e) {
        const xOffset = 10;
        const yOffset = 10;
        tooltip.style.left = `${e.pageX + xOffset}px`;
        tooltip.style.top = `${e.pageY + yOffset}px`;
    });

    dateWidget.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
        tooltip.classList.remove('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dateToggle = document.getElementById('date-toggle');
    const dateWidget = document.getElementById('date-widget');
    const clockWidget = document.getElementById('clock-widget');

    function toggleDateWidget(isVisible) {
        if (isVisible) {
            dateWidget.style.display = 'block';
            setTimeout(() => {
                dateWidget.classList.add('show'); 
            }, 50); 
            clockWidget.style.top = '80px'; 
        } else {
            dateWidget.classList.remove('show');
            setTimeout(() => {
                dateWidget.style.display = 'none'; 
            }, 1000);

            setTimeout(() => {
                clockWidget.style.top = '20px';
            }, 1000); 
        }
    }

    dateToggle.addEventListener('change', () => {
        const isChecked = dateToggle.checked;
        localStorage.setItem('dateWidgetVisible', isChecked);
        toggleDateWidget(isChecked);
    });

    const savedDateWidgetState = localStorage.getItem('dateWidgetVisible');
    if (savedDateWidgetState !== null) {
        const isVisible = JSON.parse(savedDateWidgetState);
        dateToggle.checked = isVisible;
        toggleDateWidget(isVisible);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const clockToggle = document.getElementById('clock-toggle');
    const clockWidget = document.getElementById('clock-widget');
    const timeElement = document.getElementById('time');

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    let clockInterval;

    function toggleClockWidget(isVisible) {
        if (isVisible) {
            clockWidget.style.display = 'block';
            updateClock();
            clockInterval = setInterval(updateClock, 1000);
            setTimeout(() => {
                clockWidget.classList.add('show'); 
            }, 50); 
        } else {
            clockWidget.classList.remove('show'); 
            clearInterval(clockInterval);
            setTimeout(() => {
                clockWidget.style.display = 'none'; 
            }, 1000);  
        }
    }

    clockToggle.addEventListener('change', () => {
        const isChecked = clockToggle.checked;
        localStorage.setItem('clockWidgetVisible', isChecked);
        toggleClockWidget(isChecked);
    });

    const savedClockWidgetState = localStorage.getItem('clockWidgetVisible');
    if (savedClockWidgetState !== null) {
        const isVisible = JSON.parse(savedClockWidgetState);
        clockToggle.checked = isVisible;
        toggleClockWidget(isVisible);
    }
});

window.addEventListener('load', function() {
    const clockWidget = document.getElementById('clock-widget');
    const savedClockWidgetState = localStorage.getItem('clockWidgetVisible');

    if (savedClockWidgetState === null || savedClockWidgetState === 'false') {
        clockWidget.style.display = 'none';
    } else {
        setTimeout(() => {
            clockWidget.classList.add('fly-in');
        }, 100); 
    }
});

document.querySelector('.weather-widget').addEventListener('mouseenter', function (e) {
    const weatherWidget = e.currentTarget;
    const maxTilt = 10;

    function tilt(event) {
        const rect = weatherWidget.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        const tiltX = (-maxTilt * y) / (rect.height / 2);
        const tiltY = (maxTilt * x) / (rect.width / 2);

        weatherWidget.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    function resetTilt() {
        weatherWidget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        weatherWidget.removeEventListener('mousemove', tilt);
    }

    weatherWidget.addEventListener('mousemove', tilt);
    weatherWidget.addEventListener('mouseleave', resetTilt);
});
function saveShortcut(element) {
    const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || {};
    const oldUrl = element.getAttribute('data-old-url');
    if (oldUrl && shortcuts[oldUrl]) {
        delete shortcuts[oldUrl];
    }

    const newUrl = element.getAttribute('data-url');
    if (newUrl.trim() === '') {
        return; 
    }

    const favicon = element.querySelector('img') ? element.querySelector('img').src : '';
    shortcuts[newUrl] = favicon;
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
}

function normalizeUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url;
}

function loadShortcuts() {
    let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || {};
    let container = document.querySelector('.shortcuts');
    
    container.innerHTML = ''; 

    let shortcutRows = parseInt(localStorage.getItem('shortcutRows') || '1');
    let maxShortcuts = shortcutRows * 6;

    let rowCount = 0;
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('shortcut-row');
    container.appendChild(rowContainer);

    Object.keys(shortcuts).slice(0, maxShortcuts).forEach((url, index) => {
        if (index % 6 === 0 && index !== 0) {
            rowContainer = document.createElement('div');
            rowContainer.classList.add('shortcut-row');
            container.appendChild(rowContainer);
            rowCount++;
        }
        let element = document.createElement('div');
        element.classList.add('shortcut');
        element.setAttribute('data-url', url);
        element.setAttribute('data-old-url', url); 
        element.innerHTML = `<img src="${shortcuts[url]}" alt="favicon" width="32" height="32">`;
        
        rowContainer.appendChild(element);
        
        element.addEventListener('click', function(event) {
            handleShortcutClick(event, element);
        });
    });

    for (let i = Object.keys(shortcuts).length; i < maxShortcuts; i++) {
        if (i % 6 === 0 && i !== 0) {
            rowContainer = document.createElement('div');
            rowContainer.classList.add('shortcut-row');
            container.appendChild(rowContainer);
            rowCount++;
        }
        let placeholder = document.createElement('div');
        placeholder.classList.add('shortcut');
        placeholder.innerHTML = `<span class="material-icons">add</span>`;
        placeholder.addEventListener('click', function(event) {
            handleShortcutClick(event, placeholder);
        });
        rowContainer.appendChild(placeholder);
    }
}

document.getElementById('shortcut-rows').addEventListener('change', function() {
    const rows = this.value;
    localStorage.setItem('shortcutRows', rows);
    loadShortcuts();
});

function handleShortcutClick(event, element) {
    let url = element.getAttribute('data-url');
    if (url) {
        if (event.button === 1 || event.ctrlKey || event.metaKey) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    } else {
        let newUrl = prompt("Enter the URL:");
        if (newUrl) {
            newUrl = normalizeUrl(newUrl);
            if (newUrl) { 
                let faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${newUrl}`;
                element.innerHTML = `<img src="${faviconUrl}" alt="favicon" width="32" height="32">`;
                element.setAttribute('data-url', newUrl); 
                saveShortcut(element);
            }
        }
    }
}

document.querySelectorAll('.shortcut').forEach(element => {
    element.addEventListener('mousedown', function(event) {
        handleShortcutClick(event, element);
    });
});

document.querySelector('.settings-icon').addEventListener('click', function() {
    document.querySelector('.settings-modal').classList.toggle('show');
});

document.querySelector('.close-modal').addEventListener('click', function() {
    document.querySelector('.settings-modal').classList.remove('show');
});

document.addEventListener('DOMContentLoaded', function() {
    const dotColorOption = document.getElementById('dot-color-option');
    const customColorInput = document.getElementById('dot-color');
    const blobs = document.querySelectorAll('.shape-blob');

    function setCircleColors(color) {
        blobs.forEach(blob => {
            blob.style.background = color;
        });
    }

    function applyBlueShades() {
        const blueShades = [
            'linear-gradient(135deg, #4a90e2, #0066cc)',
            'linear-gradient(135deg, #5b9bd5, #0072e3)',
            'linear-gradient(135deg, #6fa4e8, #003b88)',
            'linear-gradient(135deg, #003b88, #1f6ed4)',
            'linear-gradient(135deg, #1c5fb8, #003b88)',
            'linear-gradient(135deg, #4f86c6, #0a65ab)',
            'linear-gradient(135deg, #2e90e5, #0078d7)'
        ];
        blobs.forEach((blob, index) => {
            blob.style.background = blueShades[index % blueShades.length];
        });
    }
    
    function applyGreenShades() {
        const greenShades = [
            'linear-gradient(135deg, #3cb371, #2e8b57)',
            'linear-gradient(135deg, #32cd32, #006400)',
            'linear-gradient(135deg, #228b22, #006400)',
            'linear-gradient(135deg, #7cfc00, #228b22)',
            'linear-gradient(135deg, #00ff7f, #3cb371)',
            'linear-gradient(135deg, #66cdaa, #20b2aa)',
            'linear-gradient(135deg, #2e8b57, #4caf50)'
        ];
        blobs.forEach((blob, index) => {
            blob.style.background = greenShades[index % greenShades.length];
        });
    }
    
    function applyPurpleShades() {
        const purpleShades = [
            'linear-gradient(135deg, #8a2be2, #5d3fd3)',
            'linear-gradient(135deg, #9370db, #7b68ee)',
            'linear-gradient(135deg, #6a0dad, #9400d3)',
            'linear-gradient(135deg, #800080, #4b0082)',
            'linear-gradient(135deg, #8b008b, #ff00ff)',
            'linear-gradient(135deg, #da70d6, #ba55d3)',
            'linear-gradient(135deg, #9400d3, #9932cc)'
        ];
        blobs.forEach((blob, index) => {
            blob.style.background = purpleShades[index % purpleShades.length];
        });
    }
    
    function applyOrangeShades() {
        const orangeShades = [
            'linear-gradient(135deg, #ff8c00, #ff4500)',
            'linear-gradient(135deg, #ff7f50, #ff6347)',
            'linear-gradient(135deg, #ff4500, #ff6347)',
            'linear-gradient(135deg, #ffa07a, #ff8c00)',
            'linear-gradient(135deg, #ff6347, #ff4500)',
            'linear-gradient(135deg, #ff4500, #ff7f00)',
            'linear-gradient(135deg, #ffb347, #ffcc33)'
        ];
        blobs.forEach((blob, index) => {
            blob.style.background = orangeShades[index % orangeShades.length];
        });
    }
    
    function applyPinkShades() {
        const pinkShades = [
            'linear-gradient(135deg, #ff69b4, #ff1493)',
            'linear-gradient(135deg, #ff85a2, #ff005f)',
            'linear-gradient(135deg, #ff1493, #c71585)',
            'linear-gradient(135deg, #ff8aa3, #ff3e96)',
            'linear-gradient(135deg, #ff5f6d, #ff69b4)',
            'linear-gradient(135deg, #f08080, #ff69b4)',
            'linear-gradient(135deg, #d87093, #ff1493)'
        ];
        blobs.forEach((blob, index) => {
            blob.style.background = pinkShades[index % pinkShades.length];
        });
    }
    
    function applyTealShades() {
        const tealShades = [
            'linear-gradient(135deg, #008080, #20b2aa)',
            'linear-gradient(135deg, #48d1cc, #00ced1)',
            'linear-gradient(135deg, #5f9ea0, #4682b4)',
            'linear-gradient(135deg, #66cdaa, #2e8b57)',
            'linear-gradient(135deg, #2f4f4f, #008b8b)',
            'linear-gradient(135deg, #00ced1, #40e0d0)',
            'linear-gradient(135deg, #008b8b, #5f9ea0)'
        ];
        blobs.forEach((blob, index) => {
            blob.style.background = tealShades[index % tealShades.length];
        });
    }
    
    function resetCircleColors() {
        const defaultColors = [
            'linear-gradient(135deg, #31f30a, #0219e9)',
            'linear-gradient(135deg, #005bb5, #0083cc)',
            'linear-gradient(135deg, #6e21a2, #923fba)',
            'linear-gradient(135deg, #cc4230, #cc3700)',
            'linear-gradient(135deg, #fe4500, #fe4500)'
        ];
        blobs.forEach((blob, index) => {
            blob.style.background = defaultColors[index % defaultColors.length];
        });
    }
    
    function applyColorOption(option) {
        if (option === 'blue') {
            applyBlueShades();
        } else if (option === 'green') {
            applyGreenShades();
        } else if (option === 'purple') {
            applyPurpleShades();
        } else if (option === 'orange') {
            applyOrangeShades();
        } else if (option === 'pink') {
            applyPinkShades();
        } else if (option === 'teal') {
            applyTealShades();
        } else if (option === 'custom') {
            customColorInput.classList.add('show');
            const savedCustomColor = localStorage.getItem('dotColor');
            if (savedCustomColor) setCircleColors(savedCustomColor);
        } else {
            customColorInput.classList.remove('show');
            resetCircleColors();
        }
    }
    
    dotColorOption.addEventListener('change', function() {
        const selectedOption = dotColorOption.value;
        localStorage.setItem('dotColorOption', selectedOption);
    
        if (['blue', 'green', 'purple', 'orange', 'pink', 'teal'].includes(selectedOption)) {
            location.reload();
        } else {
            applyColorOption(selectedOption);
        }
    
        if (selectedOption !== 'custom') {
            customColorInput.classList.remove('show');
        }
    });    

    customColorInput.addEventListener('input', function() {
        const colorValue = this.value.startsWith('#') ? this.value : `#${this.value}`;
        setCircleColors(colorValue);
        localStorage.setItem('dotColor', colorValue);
    });

    function loadDotColor() {
        const savedOption = localStorage.getItem('dotColorOption') || 'default';
        dotColorOption.value = savedOption;
        applyColorOption(savedOption);
        if (savedOption === 'custom') {
            const savedCustomColor = localStorage.getItem('dotColor');
            if (savedCustomColor) {
                customColorInput.value = savedCustomColor.replace(/^#/, '');
                setCircleColors(savedCustomColor);
            }
        }
    }

    loadDotColor();
});

document.getElementById('color-scheme').addEventListener('change', function() {
    const selectedScheme = this.value;
    switch (selectedScheme) {
        case 'dark':
            document.body.style.backgroundColor = 'linear-gradient(to right, #000000, #000000)';
            break;
        case 'light':
            document.body.style.backgroundColor = 'linear-gradient(to right, #fcfcfc, #fcfcfc)';
            break;
        case 'midnight':
            document.body.style.backgroundColor = 'linear-gradient(to right, #270761, #270761)';
            break;
        case 'sunset':
            document.body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
            break;
        case 'ocean':
            document.body.style.background = 'linear-gradient(to right, #0f2027, #203a43, #2c5364)'; 
            break;
        default:
            document.body.style.backgroundColor = '';
            break;
    }
    localStorage.setItem('colorScheme', selectedScheme);
});

document.addEventListener('DOMContentLoaded', function() {
    loadSettings();

    document.getElementById('color-scheme').addEventListener('change', function() {
        const selectedScheme = this.value;
        setColorScheme(selectedScheme);
        localStorage.setItem('colorScheme', selectedScheme);
    });

    document.getElementById('dot-color-option').addEventListener('change', function() {
        const customColorInput = document.getElementById('dot-color');
        if (this.value === 'custom') {
            customColorInput.classList.add('show');
        } else {
            customColorInput.classList.remove('show');
            resetCircleColors(); 
            localStorage.removeItem('dotColor');
        }
        localStorage.setItem('dotColorOption', this.value);
    });
    
    document.getElementById('city').addEventListener('input', function() {
        const city = this.value;
        localStorage.setItem('city', city);
        updateWeatherDataByCity(city);
    });

    document.getElementById('shortcut-rows').addEventListener('change', function() {
        const rows = this.value;
        localStorage.setItem('shortcutRows', rows);
        loadShortcuts();
    });

    function setColorScheme(scheme) {
        switch (scheme) {
            case 'dark':
                document.body.style.background = 'black';
                break;
            case 'light':
                document.body.style.background = '#1F2024';
                break;
            case 'midnight':
                document.body.style.background = '#270761';
                break;
            case 'sunset':
                document.body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
                break;
            case 'forest':
                document.body.style.background = '#4f7445'; 
                break;
            case 'mystic':
                document.body.style.background = 'linear-gradient(to right, #2e3d82, #633974, #e94560)';
                break;
            default:
                document.body.style.background = '';
                break;
        }
    }

    function setCircleColors(color) {
        document.querySelectorAll('.background-circle').forEach(circle => {
            circle.style.background = color;
        });
    }

    function resetCircleColors() {
        const defaultColors = [
            'linear-gradient(135deg, #31f30a, #0219e9)',
            'linear-gradient(135deg, #005bb5, #0083cc)',
            'linear-gradient(135deg, #6e21a2, #923fba)',
            'linear-gradient(135deg, #cc4230, #cc3700)',
            'linear-gradient(135deg, #fe4500, #fe4500)'
        ];
        document.querySelectorAll('.shape-blob').forEach((blob, index) => {
            blob.style.background = defaultColors[index % defaultColors.length];
        });
    }

    function loadSettings() {
        const savedScheme = localStorage.getItem('colorScheme');
        if (savedScheme) {
            document.getElementById('color-scheme').value = savedScheme;
            setColorScheme(savedScheme);
        }

        const savedDotColorOption = localStorage.getItem('dotColorOption');
        if (savedDotColorOption) {
            document.getElementById('dot-color-option').value = savedDotColorOption;
            if (savedDotColorOption === 'custom') {
                document.getElementById('dot-color').classList.add('show');
                const savedDotColor = localStorage.getItem('dotColor');
                if (savedDotColor) {
                    document.getElementById('dot-color').value = savedDotColor;
                    setCircleColors(savedDotColor);
                }
            }
        }

        const savedCity = localStorage.getItem('city');
        if (savedCity) {
            document.getElementById('city').value = savedCity;
            updateWeatherDataByCity(savedCity);
        }

        const savedShortcutRows = localStorage.getItem('shortcutRows');
        if (savedShortcutRows) {
            document.getElementById('shortcut-rows').value = savedShortcutRows;
            loadShortcuts();
        }
    }
});

function updateWeatherData(latitude, longitude) {
    const apiKey = '61894ea1f7464ad581e144615242807';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('temperature').innerText = `${data.current.temp_c}°C`;
            document.getElementById('condition').innerText = getConditionDescription(data.current.condition.text);
            document.getElementById('location').innerText = data.location.name;
            getWeatherIcon(data.current.condition.text);
            showWeatherData();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function updateWeatherDataByCity(city) {
    const apiKey = '61894ea1f7464ad581e144615242807';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('temperature').innerText = `${data.current.temp_c}°C`;
            document.getElementById('condition').innerText = getConditionDescription(data.current.condition.text);
            document.getElementById('location').innerText = data.location.name;
            const localTime = data.location.localtime;
            const isNight = checkIfNight(localTime);
            getWeatherIcon(data.current.condition.text, isNight);
            showWeatherData();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function checkIfNight(localTime) {
    const hour = new Date(localTime).getHours();
    return hour >= 21 || hour < 6;
}

function getWeatherIcon(weather, isNight) {
    const iconMap = {
        'Sunny': { day: 'clear-day.svg', night: 'clear-night.svg' },
        'Clear': { day: 'clear-day.svg', night: 'clear-night.svg' },
        'Partly Cloudy': { day: 'partly-cloudy-day.svg', night: 'partly-cloudy-night.svg' },
        'Partly cloudy': { day: 'partly-cloudy-day.svg', night: 'partly-cloudy-night.svg' },
        'Cloudy': { day: 'cloudy.svg', night: 'cloudy.svg' },
        'Overcast': { day: 'overcast-day.svg', night: 'overcast-night.svg' },
        'Mist': { day: 'mist.svg', night: 'mist.svg' },
        'Light rain shower': { day: 'partly-cloudy-day-rain.svg', night: 'partly-cloudy-night-rain.svg' },
        'Light rain': { day: 'partly-cloudy-day-rain.svg', night: 'partly-cloudy-night-rain.svg' },
        'Patchy rain nearby': { day: 'partly-cloudy-day-drizzle.svg', night: 'partly-cloudy-night-drizzle.svg' },
        'Patchy light rain': { day: 'partly-cloudy-day-drizzle.svg', night: 'partly-cloudy-night-drizzle.svg' },
        'Light drizzle': { day: 'partly-cloudy-day-drizzle.svg', night: 'partly-cloudy-night-drizzle.svg' },
        'Rain': { day: 'rain.svg', night: 'rain.svg' },
        'Moderate rain': { day: 'rain.svg', night: 'rain.svg' },
        'Moderate or heavy rain shower': { day: 'rain.svg', night: 'rain.svg' },
        'Moderate or heavy rain with thunder': { day: 'thunderstorms-day-rain.svg', night: 'thunderstorms-night-rain.svg' },
        'Thunderstorm': { day: 'thunderstorms-day-extreme-rain.svg', night: 'thunderstorms-night-extreme-rain.svg' },
        'Thundery outbreaks in nearby': { day: 'thunderstorms-day.svg', night: 'thunderstorms-night.svg' },
        'Thundery outbreaks possible': { day: 'thunderstorms-day.svg', night: 'thunderstorms-night.svg' },
        'Patchy light rain in area with thunder': { day: 'thunderstorms-day-rain.svg', night: 'thunderstorms-night-rain.svg' },
        'Snow': { day: 'snow.svg', night: 'snow.svg' },
        'Sleet': { day: 'sleet.svg', night: 'sleet.svg' },
        'Hail': { day: 'hail.svg', night: 'hail.svg' },
        'Fog': { day: 'fog-day.svg', night: 'fog-night.svg' },
        'Blizzard': { day: 'snow.svg', night: 'snow.svg' },
        'Ice Pellets': { day: 'sleet.svg', night: 'sleet.svg' },
        'Other': { day: 'star.svg', night: 'star.svg' }
    };

    const variant = isNight ? 'night' : 'day';

    const weatherIconFile = iconMap[weather] ? iconMap[weather][variant] : iconMap['Other'][variant];
    const weatherIconElement = document.getElementById('weather-icon');

    if (weatherIconElement) {
        weatherIconElement.innerHTML = `<img src="svg/${weatherIconFile}" alt="${weather}" style="width: 90px; height: 90px;" draggable="false">`;
    } else {
        console.error('Element with id "weather-icon" not found.');
    }
}

function getConditionDescription(condition) {
    const conditionMap = {
        'Sunny': 'Bright and sunny',
        'Clear': 'Clear skies',
        'Partly Cloudy': 'Partly cloudy skies',
        'Partly cloudy': 'Partly cloudy skies',
        'Cloudy': 'Cloudy skies',
        'Overcast': 'Overcast conditions',
        'Mist': 'Misty conditions',
        'Light rain shower': 'Light rain showers',
        'Patchy rain nearby': 'Intermittent rain in the vicinity',
        'Patchy light rain': 'Patchy light rain',
        'Light Rain': 'Light rain',
        'Light rain': 'Light rain',
        'Moderate rain': 'Moderate Rain',
        'Light drizzle': 'Light drizzle',
        'Moderate Rain': 'Moderate rain',
        'Heavy Rain': 'Heavy rain',
        'Moderate or heavy rain shower': 'Moderate to heavy rain showers',
        'Moderate or heavy rain with thunder': 'Moderate to heavy rain with thunder',
        'Thunderstorm': 'Thunderstorms in the area',
        'Thundery outbreaks in nearby': 'Thunderstorms nearby',
        'Thundery outbreaks possible': 'Possible nearby thunderstorms',
        'Patchy light rain in area with thunder': 'Light rain and thunder nearby',
        'Snow': 'Snowfall',
        'Sleet': 'Sleet showers',
        'Hail': 'Hail showers',
        'Fog': 'Foggy conditions',
        'Blizzard': 'Blizzard conditions',
        'Ice Pellets': 'Ice pellets falling',
        'Other': 'Unpredictable weather'
    };    
    return conditionMap[condition] || `API: ${condition}`;
}

function showWeatherData() {
    document.getElementById('skeleton-weather-icon').style.display = 'none';
    document.getElementById('skeleton-temperature').style.display = 'none';
    document.getElementById('skeleton-condition').style.display = 'none';
    document.getElementById('skeleton-location').style.display = 'none';

    const weatherIconElement = document.getElementById('weather-icon');
    weatherIconElement.style.display = 'inline-block'; 
    weatherIconElement.offsetWidth; 
    weatherIconElement.style.opacity = '1'; 
    weatherIconElement.style.transform = 'scale(1)'; 

    document.getElementById('temperature').style.display = 'inline-block';
    document.getElementById('condition').style.display = 'inline-block';
    document.getElementById('location').style.display = 'inline-block';
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                updateWeatherData(latitude, longitude);
                setInterval(() => updateWeatherData(latitude, longitude), 300000); 
            },
            error => {
                console.error('Error occurred while fetching location:', error);
                showNoLocationData();  
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        showNoLocationData();  
    }
}

function showNoLocationData() {
    document.getElementById('temperature').style.display = 'none';
    document.getElementById('condition').style.display = 'none';
    document.getElementById('location').innerText = 'no location';
    document.getElementById('weather-icon').textContent = 'location_off';
    document.getElementById('weather-icon').style.color = '#f22c3d';  
    showWeatherData();
}

document.addEventListener('DOMContentLoaded', function() {
    loadShortcuts();
    setupTooltips();
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
        updateWeatherDataByCity(savedCity);
    } else {
        getLocation();
    }
});

function setupTooltips() {
    const container = document.querySelector('.shortcuts');
    container.addEventListener('mouseover', function(event) {
        const shortcut = event.target.closest('.shortcut');
        if (shortcut) {
            const url = shortcut.getAttribute('data-url');
            if (url) {
                const existingTooltip = document.querySelector('.tooltip');
                if (existingTooltip) {
                    existingTooltip.remove();
                }

                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = url;
                document.body.appendChild(tooltip);

                shortcut.addEventListener('mousemove', (event) => {
                    updateTooltipPosition(event, tooltip, shortcut);
                });

                shortcut.addEventListener('mouseleave', () => {
                    tooltip.remove();
                });
            }
        }
    });
}

function updateTooltipPosition(event, tooltip, shortcut) {
    const rect = shortcut.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const offset = 10;

    tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2)}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + offset}px`;
}

window.addEventListener('resize', function() {
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        tooltip.style.display = 'none';
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.shortcuts');
    const contextMenu = document.createElement('div');
    contextMenu.classList.add('custom-context-menu');
    contextMenu.innerHTML = `
        <ul>
            <li id="open-in-new-tab" style="display: none;">New Tab</li>
            <li id="edit-shortcut">Edit</li>
            <li id="delete-shortcut">Delete</li>
        </ul>
    `;
    document.body.appendChild(contextMenu);

    let currentShortcut = null;

    container.addEventListener('contextmenu', function (event) {
        event.preventDefault();

        const shortcut = event.target.closest('.shortcut');
        if (shortcut) {
            currentShortcut = shortcut;

            const openInNewTabItem = document.getElementById('open-in-new-tab');
            if (shortcut.getAttribute('data-url')) {
                openInNewTabItem.style.display = 'block';
            } else {
                openInNewTabItem.style.display = 'none';
            }

            contextMenu.style.left = `${event.pageX}px`;
            contextMenu.style.top = `${event.pageY}px`;
            contextMenu.style.display = 'block';
        }
    });

    document.getElementById('open-in-new-tab').addEventListener('click', function () {
        if (currentShortcut) {
            const url = currentShortcut.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
            contextMenu.style.display = 'none'; 
        }
    });

    document.getElementById('edit-shortcut').addEventListener('click', function () {
        if (currentShortcut) {
            const url = currentShortcut.getAttribute('data-url');
            const newUrl = prompt('Edit URL:', url);

            if (newUrl !== null) {
                const normalizedUrl = normalizeUrl(newUrl);
                currentShortcut.setAttribute('data-url', normalizedUrl);
                currentShortcut.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain_url=${normalizedUrl}" alt="favicon" width="32" height="32">`;
                saveShortcut(currentShortcut);
            }

            contextMenu.style.display = 'none'; 
        }
    });

    document.getElementById('delete-shortcut').addEventListener('click', function () {
        if (currentShortcut) {
            currentShortcut.setAttribute('data-url', '');
            currentShortcut.innerHTML = `<span class="material-icons">add</span>`;
            saveShortcut(currentShortcut);

            contextMenu.style.display = 'none'; 
        }
    });

    document.addEventListener('click', function () {
        contextMenu.style.display = 'none';
    });
});

function normalizeUrl(url) {
    const invalidCharacters = /[\s<>]/g;

    if (url.trim() === '' || invalidCharacters.test(url)) {
        alert('The URL contains invalid characters.');
        return '';
    }
    
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    return url;
}

function saveShortcut(element) {
    const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || {};
    const oldUrl = element.getAttribute('data-old-url');
    if (oldUrl && shortcuts[oldUrl]) {
        delete shortcuts[oldUrl];
    }

    const newUrl = element.getAttribute('data-url');
    const favicon = newUrl ? element.querySelector('img')?.src || '' : ''; 

    if (newUrl.trim() !== '') {
        shortcuts[newUrl] = favicon; 
    }

    localStorage.setItem('shortcuts', JSON.stringify(shortcuts)); 
}
document.addEventListener('DOMContentLoaded', function() {
    const quickNotesButton = document.getElementById('quick-notes-button');
    const quickNotesWrapper = document.getElementById('quick-notes-wrapper');
    const newNoteInput = document.getElementById('new-note-input');
    const notesIcon = document.getElementById('notes-icon');
    const quickNotesModal = document.getElementById('quick-notes-modal');
    const quickNotesContainer = document.getElementById('quick-notes-container');
    const undoButton = document.getElementById('undo-delete');
    const pinnedMessagesContainer = document.getElementById('pinned-messages-container');
    const emojiSelectorContainer = document.getElementById('emoji-selector-container');
    let undoTimeout = null;
    let lastDeletedNote = null;
    const emojis = ["⚠️", "💡", "😢", "😊", "😇", "📌", "🎉", "🔍", "📅", "🔥", "✅"];

    function loadNotesFromCache() {
        const cachedNotes = JSON.parse(localStorage.getItem('quickNotes')) || [];
        cachedNotes.forEach(note => addNoteToDOM(note.text, note.pinned, note.emoji));
    }

    function saveNotesToCache() {
        const notes = [];
        quickNotesContainer.querySelectorAll('.quick-note-item').forEach(noteItem => {
            const label = noteItem.querySelector('label');
            const isPinned = noteItem.classList.contains('pinned');
            
            const emoji = noteItem.getAttribute('data-emoji') || "📌";
            
            notes.push({ text: label.textContent, pinned: isPinned, emoji });
        });
        
        localStorage.setItem('quickNotes', JSON.stringify(notes));
    }

    function toggleModalVisibility() {
        quickNotesModal.style.display = quickNotesContainer.children.length > 0 && quickNotesWrapper.classList.contains('expanded') ? 'block' : 'none';
    }

    quickNotesButton.addEventListener('click', (event) => {
        event.stopPropagation();
        quickNotesWrapper.classList.toggle('expanded'); 
        if (quickNotesWrapper.classList.contains('expanded')) {
            notesIcon.style.display = 'none';
            newNoteInput.style.display = 'block';
            newNoteInput.focus();
        } else {
            notesIcon.style.display = 'block';
            newNoteInput.style.display = 'none';
        }
        toggleModalVisibility(); 
    });

    document.addEventListener('click', (event) => {
        if (!quickNotesModal.contains(event.target) && !quickNotesWrapper.contains(event.target)) {
            quickNotesWrapper.classList.remove('expanded');
            notesIcon.style.display = 'block';
            newNoteInput.style.display = 'none';
            toggleModalVisibility();
        }
    });

    document.addEventListener('keydown', function(event) {
        if ((event.altKey && event.shiftKey && event.key === 'n') || 
            ((event.ctrlKey || event.metaKey) && event.key === 'n')) {
            event.preventDefault();
            quickNotesWrapper.classList.add('expanded');
            notesIcon.style.display = 'none';
            newNoteInput.style.display = 'block';
            newNoteInput.focus();
            toggleModalVisibility();
        }
        if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
            event.preventDefault();
            undoLastDeletion();
        }
    });
    
    newNoteInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && newNoteInput.value.trim() !== '') {
            addNoteToDOM(newNoteInput.value.trim(), false, "📌");
            saveNotesToCache();
            newNoteInput.value = '';
        }
    });

    function deleteNoteWithUndo(noteItem) {
        if (undoTimeout) clearTimeout(undoTimeout);
    
        const noteText = noteItem.querySelector('label').textContent;
        lastDeletedNote = noteItem;
        noteItem.classList.add('fade-out');
    
        removePinnedNoteFromContainer(noteText);
    
        setTimeout(() => {
            noteItem.style.display = 'none';
            quickNotesContainer.removeChild(noteItem);
            saveNotesToCache();
            noteItem.classList.remove('fade-out');
        }, 2000);
    
        undoButton.style.display = 'block';
    }

    function addNoteToDOM(text, isPinned = false, emoji) {
        const noteItem = document.createElement('div');
        noteItem.classList.add('quick-note-item');
        noteItem.setAttribute('data-emoji', emoji);
    
        if (isPinned) {
            noteItem.classList.add('pinned');
        }
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        const label = document.createElement('label');
        label.textContent = text;
        
        const pinButton = document.createElement('button');
        pinButton.classList.add('pin-button');
        pinButton.textContent = '📌';
        
        pinButton.addEventListener('click', (event) => {
            event.stopPropagation();
            togglePinnedNoteDisplay(text, noteItem, emoji);
            saveNotesToCache();
        });
        
        noteItem.appendChild(checkbox);
        noteItem.appendChild(label);
        noteItem.appendChild(pinButton);
        quickNotesContainer.appendChild(noteItem);
    
        toggleModalVisibility();
        
        if (isPinned) {
            displayPinnedNoteInContainer(text, emoji);
        }
    
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#888';
                undoTimeout = setTimeout(() => deleteNoteWithUndo(noteItem), 3000);
            } else {
                label.style.textDecoration = 'none';
                label.style.color = 'white';
                if (undoTimeout) clearTimeout(undoTimeout);
            }
            newNoteInput.focus();
        });
    }

    function togglePinnedNoteDisplay(text, originalNoteItem, emoji) {
        if (originalNoteItem.classList.contains('pinned')) {
            removePinnedNoteFromContainer(text);
            originalNoteItem.classList.remove('pinned');
        } else {
            displayPinnedNoteInContainer(text, emoji);
            originalNoteItem.classList.add('pinned');
        }
    }

    function displayPinnedNoteInContainer(text, emoji) {
        let pinnedNote = pinnedMessagesContainer.querySelector(`.pinned-note[data-text="${text}"]`);
    
        if (!pinnedNote) {
            pinnedNote = document.createElement('div');
            pinnedNote.classList.add('pinned-note');
            pinnedNote.setAttribute('data-text', text);
            pinnedNote.setAttribute('data-emoji', emoji);
    
            const emojiSelector = document.createElement('span');
            emojiSelector.classList.add('emoji-selector');
            emojiSelector.textContent = emoji;
    
            emojiSelector.addEventListener('click', (event) => {
                event.stopPropagation();
                const existingMenu = emojiSelectorContainer.querySelector('.emoji-menu');
                if (existingMenu) {
                    emojiSelectorContainer.style.display = 'none'; 
                    existingMenu.remove();
                    return;
                }
    
                emojiSelectorContainer.innerHTML = '';
                const rect = emojiSelector.getBoundingClientRect();
                emojiSelectorContainer.style.top = `${rect.bottom}px`;
                emojiSelectorContainer.style.left = `${rect.left}px`;
                emojiSelectorContainer.style.display = 'block';
    
                const emojiMenu = document.createElement('div');
                emojiMenu.classList.add('emoji-menu');
                emojis.forEach(emj => {
                    const emojiOption = document.createElement('span');
                    emojiOption.textContent = emj;
                    emojiOption.addEventListener('click', () => {
                        emojiSelector.textContent = emj;
                        pinnedNote.setAttribute('data-emoji', emj);
    
                        applyEmojiEffect(pinnedNote, emj);
    
                        const noteItem = quickNotesContainer.querySelector(`.quick-note-item[data-text="${text}"]`);
                        if (noteItem) {
                            noteItem.setAttribute('data-emoji', emj);
                        }
    
                        const cachedNotes = JSON.parse(localStorage.getItem('quickNotes')) || [];
                        const noteIndex = cachedNotes.findIndex(note => note.text === text);
                        if (noteIndex !== -1) {
                            cachedNotes[noteIndex].emoji = emj;
                            localStorage.setItem('quickNotes', JSON.stringify(cachedNotes));
                        }
                        emojiSelectorContainer.style.display = 'none';
                    });
                    emojiMenu.appendChild(emojiOption);
                });
    
                emojiSelectorContainer.appendChild(emojiMenu);
            });
    
            const noteText = document.createElement('span');
            noteText.classList.add('scrolling-text');
            noteText.textContent = ` ${text}`;
    
            pinnedNote.appendChild(emojiSelector);
            pinnedNote.appendChild(noteText);
            pinnedMessagesContainer.appendChild(pinnedNote);
    
            applyEmojiEffect(pinnedNote, emoji);
        } else {
            const emojiSelector = pinnedNote.querySelector('.emoji-selector');
            emojiSelector.textContent = emoji;
            pinnedNote.setAttribute('data-emoji', emoji);
    
            applyEmojiEffect(pinnedNote, emoji);
        }
    }
    
    document.addEventListener('click', (event) => {
        if (!pinnedMessagesContainer.contains(event.target) && !emojiSelectorContainer.contains(event.target)) {
            emojiSelectorContainer.style.display = 'none';
        }
    });
    
    function applyEmojiEffect(element, emoji) {
        const emojiSelector = element.querySelector('.emoji-selector');
        emojiSelector.classList.remove('blinking', 'celebration', 'focus-ring', 'wave');
        element.classList.remove('glow', 'pulse');
    
        if (emoji === '⚠️') {
            emojiSelector.classList.add('blinking'); 
        } else if (emoji === '💡') {
            element.classList.add('glow'); 
        } else if (emoji === '🎉') {
            emojiSelector.classList.add('celebration'); 
        } else if (emoji === '🔍') {
            emojiSelector.classList.add('focus-ring'); 
        } else if (emoji === '🔥') {
            element.classList.add('pulse'); 
        } else if (emoji === '📅') {
            emojiSelector.classList.add('wave');
        }
    }

    function removePinnedNoteFromContainer(text) {
        const pinnedNote = pinnedMessagesContainer.querySelector(`.pinned-note[data-text="${text}"]`);
        if (pinnedNote) {
            pinnedMessagesContainer.removeChild(pinnedNote);
        }
    }

    function undoLastDeletion() {
        if (lastDeletedNote) {
            if (undoTimeout) clearTimeout(undoTimeout);

            lastDeletedNote.style.display = 'flex';
            quickNotesContainer.appendChild(lastDeletedNote);
            const checkbox = lastDeletedNote.querySelector('input[type="checkbox"]');
            const label = lastDeletedNote.querySelector('label');
            checkbox.checked = false;
            label.style.textDecoration = 'none';
            label.style.color = 'white';
            lastDeletedNote = null; 
            undoButton.style.display = 'none';
            toggleModalVisibility();
        }
    }

    undoButton.addEventListener('click', undoLastDeletion);

    loadNotesFromCache();
});
document.addEventListener('DOMContentLoaded', function() {
    const quickNotesButton = document.querySelector('.quick-notes-button');
    setTimeout(() => {
        quickNotesButton.style.opacity = 1; 
    }, 100); 
});
document.addEventListener('DOMContentLoaded', function() {
    const customSearchEnginesContainer = document.getElementById('custom-search-engines-container');
    const addSearchEngineButton = document.getElementById('add-search-engine');
    const modal = document.querySelector('.modal');
    const saveButton = document.getElementById('save-search-engine');
    const searchEngineInput = document.getElementById('search-engine-url');
    const displayCheckbox = document.getElementById('display-checkbox');
    const closeButton = document.querySelector('.close');
    const secondarySearchBarsContainer = document.createElement('div');
    const maxEngines = 5; // Maximum number of search engines allowed
    
    // Container for all secondary search bars
    secondarySearchBarsContainer.classList.add('secondary-search-bars-container');
    document.body.appendChild(secondarySearchBarsContainer);

    // Load search engines on startup
    loadCustomSearchEngines();
    updateAddButtonVisibility(); // Check initial visibility for the add button

    // Show modal when add button is clicked
    addSearchEngineButton.addEventListener('click', () => {
        searchEngineInput.value = ''; // Clear input field
        displayCheckbox.checked = false; // Reset checkbox
        modal.style.display = 'block'; // Show modal
    });

    // Close modal when the close button or outside area is clicked
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    // Save button to add the new search engine
    saveButton.addEventListener('click', () => {
        const url = searchEngineInput.value.trim();
        const display = displayCheckbox.checked;

        if (url) {
            const displayName = extractDisplayName(url);

            // Check if the maximum number of search engines has been reached
            if (customSearchEnginesContainer.childElementCount >= maxEngines) {
                alert("Maximum of 5 search engines reached.");
                closeModal();
                return;
            }

            addSearchEngineInput(displayName, display, url); // Pass URL for actual search
            saveCustomSearchEngines(); // Save to localStorage
            closeModal(); // Close the modal
            updateAddButtonVisibility(); // Update button visibility

            if (display) {
                createSecondarySearchBar(url, displayName);
            }
        }
    });

    // Function to extract a display name (hostname only) from the full URL
    function extractDisplayName(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', ''); // Extracts 'youtube.com' from 'https://www.youtube.com/...'
        } catch (error) {
            return url; // Fallback if URL is not valid
        }
    }

    function addSearchEngineInput(displayName, display, fullUrl) {
        const engineDiv = document.createElement('div');
        engineDiv.classList.add('custom-search-engine');
    
        engineDiv.innerHTML = `
            <img src="https://www.google.com/s2/favicons?domain=${displayName}" alt="${displayName}" class="search-engine-favicon">
            <span>${displayName}</span>
            <div class="icon-group">
                <span class="show-checkbox material-icons">${display ? 'check_box' : 'check_box_outline_blank'}</span>
                <span class="delete-icon material-icons">delete</span>
            </div>
        `;
    
        // Toggle functionality for the checkbox icon
        const checkboxIcon = engineDiv.querySelector('.show-checkbox');
        if (display) {
            checkboxIcon.classList.add('active'); // Set initial state
            createSecondarySearchBar(fullUrl, displayName); // Show secondary search bar if active
        }
    
        checkboxIcon.addEventListener('click', () => {
            const active = checkboxIcon.classList.toggle('active');
            checkboxIcon.textContent = active ? 'check_box' : 'check_box_outline_blank';
            saveCustomSearchEngines();

            if (active) {
                createSecondarySearchBar(fullUrl, displayName);
            } else {
                removeSecondarySearchBar(displayName);
            }
        });
    
        // Attach delete functionality to the delete icon
        engineDiv.querySelector('.delete-icon').addEventListener('click', () => {
            engineDiv.remove(); // Remove the search engine from the UI
            saveCustomSearchEngines(); // Save changes to localStorage
            removeSecondarySearchBar(displayName); // Also remove the associated secondary search bar
            updateAddButtonVisibility(); // Update button visibility after deletion
        });
    
        // Store full URL as a data attribute
        engineDiv.dataset.fullUrl = fullUrl;
        customSearchEnginesContainer.appendChild(engineDiv);
    }

    // Function to create a secondary search bar with animation delay
    function createSecondarySearchBar(url, displayName) {
        // Check if a search bar for this engine already exists
        if (document.querySelector(`.secondary-search-bar[data-engine="${displayName}"]`)) return;
        
        const secondarySearchBar = document.createElement('div');
        secondarySearchBar.classList.add('secondary-search-bar');
        secondarySearchBar.dataset.engine = displayName;

        // Set animation delay based on the current number of secondary search bars
        const index = secondarySearchBarsContainer.childElementCount;
        secondarySearchBar.style.animationDelay = `${index * 0.1}s`; // Add delay based on position

        const favicon = document.createElement('img');
        favicon.classList.add('secondary-search-favicon');
        favicon.src = `https://www.google.com/s2/favicons?domain=${displayName}`;
        secondarySearchBar.appendChild(favicon);

        const secondarySearchInput = document.createElement('input');
        secondarySearchInput.type = 'text';
        secondarySearchInput.placeholder = displayName; // Set placeholder to display name
        secondarySearchBar.appendChild(secondarySearchInput);

        // Set up search functionality for the input field
        secondarySearchInput.onkeydown = function(event) {
            if (event.key === 'Enter') {
                const queryUrl = `${url}${encodeURIComponent(secondarySearchInput.value)}`;
                if (event.ctrlKey || event.metaKey) {
                    // Open in new tab if Ctrl (Windows) or Command (Mac) is pressed
                    window.open(queryUrl, '_blank');
                } else {
                    // Otherwise, open in the same tab
                    window.location.href = queryUrl;
                }
                secondarySearchInput.value = '';
            }
        };

        // Append the new search bar to the container
        secondarySearchBarsContainer.appendChild(secondarySearchBar);
    }

    // Function to remove a specific secondary search bar
    function removeSecondarySearchBar(displayName) {
        const secondarySearchBar = document.querySelector(`.secondary-search-bar[data-engine="${displayName}"]`);
        if (secondarySearchBar) {
            secondarySearchBarsContainer.removeChild(secondarySearchBar);
        }
    }

    // Function to save search engines to localStorage
    function saveCustomSearchEngines() {
        const engines = [];
        customSearchEnginesContainer.querySelectorAll('.custom-search-engine').forEach(engineDiv => {
            const displayName = engineDiv.querySelector('span').textContent;
            const display = engineDiv.querySelector('.show-checkbox').classList.contains('active');
            const fullUrl = engineDiv.dataset.fullUrl;
            if (displayName && fullUrl) engines.push({ displayName, fullUrl, display });
        });
        localStorage.setItem('customSearchEngines', JSON.stringify(engines));
    }

    // Load saved search engines from localStorage
    function loadCustomSearchEngines() {
        const customEngines = JSON.parse(localStorage.getItem('customSearchEngines')) || [];
        customSearchEnginesContainer.innerHTML = '';
        customEngines.forEach(engine => {
            addSearchEngineInput(engine.displayName, engine.display, engine.fullUrl);
        });
    }

    // Function to update the visibility of the "Add Search Engine" button based on the number of search engines
    function updateAddButtonVisibility() {
        if (customSearchEnginesContainer.childElementCount >= maxEngines) {
            addSearchEngineButton.style.display = 'none'; // Hide the button if the limit is reached
        } else {
            addSearchEngineButton.style.display = 'block'; // Show the button if under the limit
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        searchEngineInput.value = ''; 
        displayCheckbox.checked = false; 
    }
});