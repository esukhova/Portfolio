import "../styles/style.scss";

document.addEventListener('DOMContentLoaded', () => {

    //Swiper functionality
    const swiperSpa = new Swiper('.spa .swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: false,
        pagination: {
            el: '.spa .pagination',
            type: 'bullets',
            clickable: 'true',
        },
        navigation: {
            nextEl: '.spa .button-next',
            prevEl: '.spa .button-prev',
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            800: {
                slidesPerView: 3,
            },
            900: {
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 7,
            },
            1700: {
                slidesPerView: 8,
            },
        }
    })
})

const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);

    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 8;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if (
                scrollY > animItemOffset - animItemPoint &&
                scrollY < animItemOffset + animItemHeight
            ) {
                animItem.classList.add("_active");
            } else {
                if (!animItem.classList.contains("_anim-no-hide")) {
                    animItem.classList.remove("_active");
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollY || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
    }
}
