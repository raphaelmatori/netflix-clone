const bearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjBhZDk1ZDk4MGNjZmMxYTA3MjhiNjgzNmQ0NTU1ZSIsInN1YiI6IjYwNWUxYWMyNDM1MDExMDA2YjIyMTZmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RZwV-ufDUkPV-KuSFXZ2MKqNCfyWlUKTpcVykkeN3X8";
const fetchedGenre = [];

$(document).ready(function () {
    fetch('https://api.themoviedb.org/3/genre/movie/list', {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + bearerToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            fetchedGenre.push(...responseJson.genres);
            fetchedGenre.forEach(item => {
                $("#main-carousel").append(
                    `<div>
                        <h4 class="title">${item.name}</h4>
                        <div class="genre_${item.id} owl-carousel owl-theme"></div>
                    </div>`
                );
            })

            fetchedGenre.forEach(item => {
                fetch('https://api.themoviedb.org/4/discover/movie?with_genres=' + item.id, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + bearerToken,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        responseJson.results.forEach(i => {
                            if (i.poster_path) {
                                $(".genre_" + item.id).append(
                                    `<div class="item">
                                    <img class="box-movie" src="https://image.tmdb.org/t/p/w500${i.poster_path}" />
                                </div>`
                                );
                            }
                        })

                        $(`.genre_${item.id}`).owlCarousel({
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
                    })
            });



        });
});
