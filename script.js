document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchEngineSelect = document.getElementById('search-engine');
    const urlIcon = document.getElementById('url-icon');

    function updatePlaceholder() {
        const selectedEngine = localStorage.getItem('searchEngine') || 'google';
        const placeholderText = selectedEngine === 'google' ? 'Search with Google or enter a URL' : 'Search with DuckDuckGo or enter a URL';
        searchInput.placeholder = placeholderText;
    }

    function getSearchUrl(query) {
        const selectedEngine = localStorage.getItem('searchEngine') || 'google';
        if (selectedEngine === 'google') {
            return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        } else {
            return `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
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
        if (query.match(/^https?:\/\//)) {
            urlIcon.style.display = 'inline'; 
        } else {
            urlIcon.style.display = 'none'; 
        }
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
    const currentVersion = '1.9'; // Current version
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
            '2-14': { emoji: '💖', description: "Valentine's Day" },
            '2-20': { emoji: '⚖️', description: "World Day of Social Justice" },
            '3-8': { emoji: '🌷', description: "International Women's Day" },
            '3-14': { emoji: '🥧', description: "Pi Day" },
            '3-20': { emoji: '🌸', description: "Spring Equinox" },
            '3-21': { emoji: '🌈', description: "International Day for the Elimination of Racial Discrimination" },
            '3-31': { emoji: '🏳️‍⚧️', description: "International Transgender Day of Visibility" },
            '4-1': { emoji: '🤡', description: "April Fool's Day" },
            '4-7': { emoji: '🏥', description: "World Health Day" },
            '4-22': { emoji: '🌎', description: "Earth Day" },
            '5-1': { emoji: '⚒️', description: "International Workers' Day" },
            '5-4': { emoji: '⭐', description: "Star Wars Day" },
            '5-17': { emoji: '🏳️‍🌈', description: "International Day Against Homophobia, Transphobia and Biphobia" },
            '5-25': { emoji: '🚀', description: "Geek Pride Day" },
            '6-5': { emoji: '🌍', description: "World Environment Day" },
            '6-18': { emoji: '🧀', description: "International Sushi Day" },
            '6-20': { emoji: '🆘', description: "World Refugee Day" },
            '6-21': { emoji: '🌞', description: "Summer Solstice" },
            '6-28': { emoji: '🏳️‍🌈', description: "Stonewall Riots Anniversary" },
            '7-6': { emoji: '🍫', description: "World Chocolate Day" },
            '7-16': { emoji: '🎗️', description: "International Drag Day" },
            '7-18': { emoji: '✊', description: "Nelson Mandela International Day" },
            '7-20': { emoji: '🍦', description: "National Ice Cream Day" },
            '7-30': { emoji: '🤝', description: "International Day of Friendship" },
            '8-12': { emoji: '👧', description: "International Youth Day" },
            '8-19': { emoji: '👐', description: "World Humanitarian Day" },
            '9-5': { emoji: '📚', description: "International Day of Charity" },
            '9-13': { emoji: '👩‍💻', description: "Programmer's Day" }, 
            '9-19': { emoji: '🏴‍☠️', description: "Talk Like a Pirate Day" },
            '9-21': { emoji: '🕊️', description: "International Day of Peace" },
            '9-23': { emoji: '💜', description: "Bisexual Visibility Day" },
            '10-1': { emoji: '🎶', description: "International Music Day" },
            '10-4': { emoji: '🐶', description: "World Animal Day" },
            '10-5': { emoji: '👩‍🏫', description: "World Teachers' Day" },
            '10-8': { emoji: '🏳️‍🌈', description: "International Lesbian Day" },
            '10-10': { emoji: '🧠', description: "World Mental Health Day" },
            '10-11': { emoji: '🏳️‍🌈', description: "National Coming Out Day" },
            '10-16': { emoji: '🥖', description: "World Food Day" },
            '10-31': { emoji: '🎃', description: "Halloween" },
            '11-11': { emoji: '🕊️', description: "Armistice Day / Remembrance Day" },
            '11-19': { emoji: '👨', description: "International Men's Day" },
            '11-20': { emoji: '🏳️‍⚧️', description: "Transgender Day of Remembrance" },
            '11-25': { emoji: '🧡', description: "International Day for the Elimination of Violence Against Women" },
            '12-1': { emoji: '🎗️', description: "World AIDS Day" },
            '12-3': { emoji: '♿', description: "International Day of Persons with Disabilities" },
            '12-10': { emoji: '🕊️', description: "Human Rights Day" },
            '12-11': { emoji: '🏞️', description: "International Mountain Day" },
            '12-15': { emoji: '🎅', description: "National Ugly Sweater Day" },
            '12-24': { emoji: '🎅', description: "Christmas Eve" },
            '12-25': { emoji: '🎅', description: "Christmas Day" },
            '12-31': { emoji: '🎆', description: "New Year's Eve" },
            '12-10': { emoji: '📟', description: "World Computer Literacy Day" },
            '12-12': { emoji: '👩‍💻', description: "International Day of Code" } 
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

document.getElementById('dot-color-option').addEventListener('change', function() {
    const customColorInput = document.getElementById('dot-color');
    if (this.value === 'custom') {
        customColorInput.classList.add('show');
    } else {
        customColorInput.classList.remove('show');
    }
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
    
    document.getElementById('dot-color').addEventListener('input', function() {
        const color = this.value;
        if (/^[0-9A-Fa-f]{6}$/.test(color)) {
            const fullColor = `#${color}`;
            setCircleColors(fullColor);
            localStorage.setItem('dotColor', fullColor);
        }
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
                document.body.style.background = '#fcfcfc';
                break;
            case 'midnight':
                document.body.style.background = '#270761';
                break;
            case 'sunset':
                document.body.style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
                break;
            case 'forest':
                document.body.style.background = 'linear-gradient(to bottom, #2c5d3f, #97bc62)';

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
        document.querySelectorAll('.background-circle').forEach((circle, index) => {
            circle.style.background = defaultColors[index];
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
        if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
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

        lastDeletedNote = noteItem;
        noteItem.classList.add('fade-out');

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
                    emojiSelectorContainer.style.display = 'none'; // Hide if already open
                    existingMenu.remove();
                    return;
                }
    
                // Clear any existing content, display the container, and populate it with emoji options
                emojiSelectorContainer.innerHTML = '';
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
                        emojiSelectorContainer.style.display = 'none'; // Hide after selection
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
    
    // Close the emoji selector if clicking outside
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
            emojiSelector.classList.add('blinking'); // Blink only the emoji for alert
        } else if (emoji === '💡') {
            element.classList.add('glow'); // Softer glow effect for lightbulb emoji
        } else if (emoji === '🎉') {
            emojiSelector.classList.add('celebration'); // Bouncing animation for celebration emoji
        } else if (emoji === '🔍') {
            emojiSelector.classList.add('focus-ring'); // Pulsing focus ring for search emoji
        } else if (emoji === '🔥') {
            element.classList.add('pulse'); // Pulsing glow effect for fire emoji
        } else if (emoji === '📅') {
            emojiSelector.classList.add('wave'); // Subtle wave effect for calendar emoji
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