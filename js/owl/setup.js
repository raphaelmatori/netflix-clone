const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjBhZDk1ZDk4MGNjZmMxYTA3MjhiNjgzNmQ0NTU1ZSIsInN1YiI6IjYwNWUxYWMyNDM1MDExMDA2YjIyMTZmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RZwV-ufDUkPV-KuSFXZ2MKqNCfyWlUKTpcVykkeN3X8";

$(document).ready(function () {
    fetch('https://api.themoviedb.org/4/discover/movie', {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.results.forEach(item => {
                $("#main-carousel").append(
                    `<div class="item">
                        <img class="box-movie" src="https://image.tmdb.org/t/p/w500${item.poster_path}" />
                    </div>`
                );
            })

            $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                nav: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 8
                    }
                }
            })
        });
});
