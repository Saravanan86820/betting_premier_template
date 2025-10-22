
// Match detail overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    // Constants and configuration
    const MATCH_DATA = {
        1: {
            team1: { name: "PSG", logo: "img/psg.png" },
            team2: { name: "Olympique Marseille", logo: "img/olympique.png" },
            date: "Today, 18:00",
            venue: "Parc des Princes",
            competition: "Ligue 1",
            status: "LIVE 65'",
            score: "2 - 1",
            stats: {
                possession: "58% - 42%",
                shots: "14 - 8",
                corners: "6 - 3",
                fouls: "12 - 15"
            }
        },
        2: {
            team1: { name: "Lyon", logo: "img/lyon.png" },
            team2: { name: "Monaco", logo: "img/monaco.png" },
            date: "Today, 20:00",
            venue: "Groupama Stadium",
            competition: "Ligue 1",
            status: "UPCOMING",
            score: "- - -",
            stats: {
                possession: "-",
                shots: "-",
                corners: "-",
                fouls: "-"
            }
        },
        3: {
            team1: { name: "PSG", logo: "img/psg.png" },
            team2: { name: "Olympique Marseille", logo: "img/olympique.png" },
            date: "Today, 16:30",
            venue: "Parc des Princes",
            competition: "Ligue 1",
            status: "LIVE 45'",
            score: "1 - 0",
            stats: {
                possession: "62% - 38%",
                shots: "9 - 4",
                corners: "4 - 1",
                fouls: "8 - 12"
            }
        },
        4: {
            team1: { name: "Lyon", logo: "img/lyon.png" },
            team2: { name: "Monaco", logo: "img/monaco.png" },
            date: "Today, 22:00",
            venue: "Groupama Stadium",
            competition: "Ligue 1",
            status: "UPCOMING",
            score: "- - -",
            stats: {
                possession: "-",
                shots: "-",
                corners: "-",
                fouls: "-"
            }
        }
    };
    
    const SLIDE_INTERVAL = 5000; // 5 seconds
    
    // DOM Elements
    const elements = {
        matchItems: document.querySelectorAll('.match-item'),
        matchDetailOverlay: document.getElementById('matchDetailOverlay'),
        matchDetailContent: document.getElementById('matchDetailContent'),
        defaultMatchContent: document.getElementById('defaultMatchContent'),
        closeBtn: document.getElementById('closeMatchDetail'),
        track: document.querySelector('.match-slider__track'),
        slides: document.querySelectorAll('.match-slider__slide'),
        prevButton: document.querySelector('.match-slider__button--prev'),
        nextButton: document.querySelector('.match-slider__button--next'),
        indicators: document.querySelectorAll('.match-slider__indicator'),
        leagueHeaders: document.querySelectorAll('.league-list__header'),
        countryHeaders: document.querySelectorAll('.leagues-container__country-header')
    };
    
    // State
    let currentSlide = 0;
    
    // Match Detail Functions
    function showMatchDetail(matchId) {
        const match = MATCH_DATA[matchId];
        if (!match) return;
        
        matchDetailContent.innerHTML = createMatchDetailHTML(match);
        elements.matchDetailOverlay.style.display = 'flex';
        elements.defaultMatchContent.style.display = 'none';
        
        const matchDetails = document.querySelector('.match-details');
        matchDetails.classList.add('match-details--overlay-open');
        matchDetails.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    }
    
    function createMatchDetailHTML(match) {
        const [homeScore, awayScore] = match.score.split(' - ');
        const isLive = match.status.includes('LIVE');
        const minute = isLive ? match.status.split(' ')[1] : '';
        const [possessionHome, possessionAway] = match.stats.possession.split(' - ');
        const [shotsHome, shotsAway] = match.stats.shots.split(' - ');
        const [cornersHome, cornersAway] = match.stats.corners.split(' - ');
        const [foulsHome, foulsAway] = match.stats.fouls.split(' - ');
        
        return `
            <div class="match-overview">
                <div class="match-overview__teams">
                    <div class="match-overview__team">
                        <img src="${match.team1.logo}" alt="${match.team1.name}" class="match-overview__team-logo">
                        <span class="match-overview__team-name">${match.team1.name}</span>
                    </div>
                    <div class="match-overview__score">
                        <span class="match-overview__score-home">${homeScore}</span>
                        <span class="match-overview__vs">-</span>
                        <span class="match-overview__score-away">${awayScore}</span>
                    </div>
                    <div class="match-overview__team">
                        <img src="${match.team2.logo}" alt="${match.team2.name}" class="match-overview__team-logo">
                        <span class="match-overview__team-name">${match.team2.name}</span>
                    </div>
                </div>
                <div class="match-overview__status">
                    <span class="match-overview__minute">${minute}</span>
                    <span class="match-overview__live">${isLive ? 'LIVE' : 'UPCOMING'}</span>
                </div>
            </div>
            
            <div class="match-detail-overlay__info">
                <div class="match-detail-overlay__info-row">
                    <span class="match-detail-overlay__info-label">Date & Time:</span>
                    <span class="match-detail-overlay__info-value">${match.date}</span>
                </div>
                <div class="match-detail-overlay__info-row">
                    <span class="match-detail-overlay__info-label">Venue:</span>
                    <span class="match-detail-overlay__info-value">${match.venue}</span>
                </div>
                <div class="match-detail-overlay__info-row">
                    <span class="match-detail-overlay__info-label">Competition:</span>
                    <span class="match-detail-overlay__info-value">${match.competition}</span>
                </div>
                <div class="match-detail-overlay__info-row">
                    <span class="match-detail-overlay__info-label">Referee:</span>
                    <span class="match-detail-overlay__info-value">Clément Turpin</span>
                </div>
            </div>
            
            <div class="match-stats">
                <h4 class="match-stats__title">Statistics</h4>
                ${createStatBarHTML('Possession', possessionHome, possessionAway)}
                ${createStatBarHTML('Shots', shotsHome, shotsAway, shotsHome === '-' ? '50%' : '55%', shotsHome === '-' ? '50%' : '45%')}
                ${createStatBarHTML('Corners', cornersHome, cornersAway, cornersHome === '-' ? '50%' : '60%', cornersHome === '-' ? '50%' : '40%')}
                ${createStatBarHTML('Fouls', foulsHome, foulsAway, foulsHome === '-' ? '50%' : '45%', foulsHome === '-' ? '50%' : '55%')}
            </div>
        `;
    }
    
    function createStatBarHTML(label, homeValue, awayValue, homeWidth = homeValue, awayWidth = awayValue) {
        return `
            <div class="match-stats__item">
                <span class="match-stats__label">${label}</span>
                <div class="match-stats__bar">
                    <div class="match-stats__bar-home" style="width: ${homeWidth}">${homeValue}</div>
                    <div class="match-stats__bar-away" style="width: ${awayWidth}">${awayValue}</div>
                </div>
            </div>
        `;
    }
    
    function closeMatchDetail() {
        elements.matchDetailOverlay.style.display = 'none';
        elements.defaultMatchContent.style.display = 'block';
        
        const matchDetails = document.querySelector('.match-details');
        matchDetails.classList.remove('match-details--overlay-open');
    }
    
    // Slider Functions
    function updateSlider() {
        elements.track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        elements.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('match-slider__indicator--active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % elements.slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + elements.slides.length) % elements.slides.length;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    
    // League Functions
    function toggleLeagueSection(header) {
        const matchesSection = header.nextElementSibling;
        const isVisible = matchesSection.classList.contains('league-list__matches--visible');
        
        // Close all other sections
        document.querySelectorAll('.league-list__matches--visible').forEach(section => {
            section.classList.remove('league-list__matches--visible');
        });
        
        // Toggle the clicked section if it wasn't already open
        if (!isVisible) {
            matchesSection.classList.add('league-list__matches--visible');
        }
    }
    
    function toggleLeagues(element) {
        const allLists = document.querySelectorAll('.leagues-container__league-list');
        const allIcons = document.querySelectorAll('.leagues-container__toggle-icon');
        const leagueList = element.nextElementSibling;
        const icon = element.querySelector('.leagues-container__toggle-icon');
        
        // Close all other sections
        allLists.forEach((list) => {
            if (list !== leagueList) {
                list.classList.add('leagues-container__league-list--hidden');
            }
        });
        
        // Reset all icons to '+'
        allIcons.forEach((i) => (i.textContent = '+'));
        
        // Toggle the clicked one
        const isHidden = leagueList.classList.toggle('leagues-container__league-list--hidden');
        icon.textContent = isHidden ? '+' : '−';
    }
    

    
    
    // Event Listeners
    function initializeEventListeners() {

        // League country headers
        elements.countryHeaders.forEach(header => {
            header.addEventListener('click', function() {
                toggleLeagues(this);
            });
        });

        // Match items
        elements.matchItems.forEach(item => {
            item.addEventListener('click', function() {
                const matchId = this.getAttribute('data-match');
                showMatchDetail(matchId);
            });
        });
        
        // Close button
        elements.closeBtn.addEventListener('click', closeMatchDetail);
        
        // Slider controls
        elements.nextButton.addEventListener('click', nextSlide);
        elements.prevButton.addEventListener('click', prevSlide);
        
        // Slider indicators
        elements.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // League headers
        elements.leagueHeaders.forEach(header => {
            header.addEventListener('click', () => toggleLeagueSection(header));
        });
    }
    
    // Initialize
    function initialize() {
        initializeEventListeners();
        
        // Auto-advance slides
        setInterval(nextSlide, SLIDE_INTERVAL);
        
        // Open the first league by default
        if (elements.leagueHeaders.length > 0) {
            toggleLeagueSection(elements.leagueHeaders[0]);
        }
    }
    
    // Start the application
    initialize();
});
