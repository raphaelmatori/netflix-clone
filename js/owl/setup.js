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
                                    <img class="box-movie image_${i.id}"
                                        src="https://image.tmdb.org/t/p/w500${i.poster_path}"
                                        title="${i.overview}"
                                        onClick="openVideo(${i.id})"
                                    />
                                </div>`
                                );
                            }
                        })

                        $(`.genre_${item.id}`).owlCarousel({
                            loop: false,
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


const openVideo = id => {
    const videos = []
    if (!$(".image_" + id).attr('data-first')) {
        $(".image_" + id).attr('data-first', true);
    }

    if ($(".image_" + id).attr('data-first') != "false") {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + bearerToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const aux = responseJson.results.filter(i => i.site === "YouTube");
                videos.push(...aux);

                if (videos.length > 0) {
                    $(".image_" + id).attr('data-video-id', videos[0].key);
                    $(".image_" + id).modalVideo();
                    if ($(".image_" + id).attr('data-first') == "true") {
                        $(".image_" + id).attr('data-first', false);
                        $(".image_" + id).first().click();

                    }
                } else {
                    alert("Desculpe-nos, não encontramos um vídeo disponível para esse título.")
                }
            });
    }

}