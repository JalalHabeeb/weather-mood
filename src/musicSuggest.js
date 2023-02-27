import { MUSIC, ACTIVITY_SUGGESTION
 } from "./constants.js";

export const musicSuggest = (data) => {
  const sunny = [800, 801, 803];
  const cloudy = [804, 900, 751, 741, 731, 721, 711, 700];
  const rainy = [802, 522, 521, 520, 511, 502, 501, 500, 302, 301, 300];
  const snowy = [623, 622, 621, 612, 611, 610, 602, 601, 600];
  const stormy = [233, 232, 231, 230, 202, 201, 200];

  let { code } = data.data[0].weather;

  if (snowy.indexOf(code) !== -1) {
    MUSIC.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/6PFPjumGRpZnBzqnDci6qJ?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    ACTIVITY_SUGGESTION.innerHTML = `<strong>Hybrid Theory</strong> released on October 24, 2000. The album's lyrical themes deal with problems lead vocalist Chester Bennington experienced during his adolescence, including drug abuse and the constant fighting and divorce of his parents. It takes its title from the previous name of the band as well as the concept of music theory and combining different styles. <a href="https://en.wikipedia.org/wiki/Hybrid_Theory" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(public/assets/snow.jpg)";
  } else if (rainy.indexOf(code) !== -1) {
    MUSIC.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4Gfnly5CzMJQqkUFfoHaP3?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    ACTIVITY_SUGGESTION.innerHTML = `<strong>Meteora</strong> is the second studio album by Linkin Park. It was released on March 25, 2003. The title Meteora is taken from the Greek Orthodox monasteries originally bearing the name. Meteora has a similar sound to Hybrid Theory, and the album took almost a year to be recorded. <a href="https://en.wikipedia.org/wiki/Meteora_(album)" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(public/assets/rain.jpg)";
  } else if (cloudy.indexOf(code) !== -1) {
    MUSIC.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5uvXx5ZQswNRFCdHR521YZ?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    ACTIVITY_SUGGESTION.innerHTML = `<strong>A Thousand Suns</strong> is the fourth studio album by Linkin Park. It was released on September 13, 2010. It is a concept album dealing with human fears such as nuclear warfare. The title is a reference to the Bhagavad Gita, by J. Robert Oppenheimer, who described the atomic bomb as being "as bright as a thousand suns". <a href="https://en.wikipedia.org/wiki/A_Thousand_Suns" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(public/assets/cloud.jpg)";
  } else if (sunny.indexOf(code) !== -1) {
    MUSIC.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5Eevxp2BCbWq25ZdiXRwYd?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    ACTIVITY_SUGGESTION.innerHTML = `<strong>One More Light</strong> is the seventh studio album by Linkin Park. It was released on May 19, 2017. It is the band's first album to have a title track, as they felt that the song "One More Light" was the heart of the album. It is also the last album to be released before the death of lead vocalist Chester Bennington on July 20, 2017. <a href="https://en.wikipedia.org/wiki/One_More_Light" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(public/assets/sun.jpg)";
  } else if (stormy.indexOf(code) !== -1) {
    MUSIC.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5NH94cATqx5fjBE794xZLy?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    ACTIVITY_SUGGESTION.innerHTML = `<strong>Collision Course</strong> is a collaborative album from Jay-Z and Linkin Park, released on November 30, 2004. From Linkin Park's catalog, Collision Course features three songs from Meteora and four from Hybrid Theory. <a href="https://en.wikipedia.org/wiki/Collision_Course_(EP)" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(public/assets/storm.jpg)";
  }
};
