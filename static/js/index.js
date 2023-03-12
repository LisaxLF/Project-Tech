const settingEl = document.querySelector('.homepage .settingsPref')

settingEl.addEventListener('click', () => window.location.replace('/settingsPref'));

// API ROCKET LEAGUE
const options = {
	method: 'GET',
	headers: {
		'User-Agent': 'RapidAPI Playground',
		'Accept-Encoding': 'identity',
		'X-RapidAPI-Key': '7ddecef64amsh5c02ed8b29dcec9p183898jsncfd3fe96d42b',
		'X-RapidAPI-Host': 'rocket-league1.p.rapidapi.com'
	}
};

fetch('https://rocket-league1.p.rapidapi.com/ranks/LisaLF', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));



