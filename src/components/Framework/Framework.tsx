import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {getProjects} from "@/utils/projects";
import {SpaCard} from "@/components/SpaCard/SpaCard";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export function Spa() {

    const isMobile = useMediaQuery('(max-width: 767px)');
    return (
        <section className="spa" id="spa">
            <div className="spa__container container">
                <h2 className="spa__title title title--type_h2 sign">
                    <span className="fast-flicker">S</span>PA
                </h2>
                <div className="spa__swiper-outer swiper-outer">
                    <Swiper
                        key={!isMobile ? 'with-default-slides' : 'no-default-slides'}
                        modules={[Navigation, Pagination]}
                        className="spa__swiper swiper"
                        slidesPerView={2}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            el: '.spa .pagination',
                            type: 'bullets',
                            clickable: true,
                        }}
                        navigation={{
                            nextEl: '.spa .button-next',
                            prevEl: '.spa .button-prev',
                        }}
                        breakpoints={{
                            500: {
                                slidesPerView: 3,
                            },
                            800: {
                                slidesPerView: 4,
                            },
                            900: {
                                slidesPerView: 5,
                            },
                            1400: {
                                slidesPerView: 7,
                            },
                            1700: {
                                slidesPerView: 8,
                            },
                        }}>
                        {getProjects('spa').map(p => (
                            <SwiperSlide key={p.id} className="swiper__slide">
                                <SpaCard spa={p}/>
                            </SwiperSlide>
                        ))}
                        {!isMobile && (
                            [1, 2, 3, 1].map((n, i) =>
                                <SwiperSlide key={`${n}-${i}`} className="swiper__slide">
                                    <SpaCard default={`default-${n}`}/>
                                </SwiperSlide>
                            )
                            )}
                    </Swiper>
                    <button className="spa__swiper-button-prev swiper__button-prev button-prev"
                            aria-label="Предыдущий слайд">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
                            <g data-name="05-Play">
                                <path style={{fill: "#6bdcff"}} d="m17 63 38-31L17 1v62z"/>
                                <path d="M24 34.868V6.711L17 1v62l38-31-19.331 9.977A8 8 0 0 1 24 34.868z"
                                      style={{fill: "#48befd"}}/>
                                <path style={{fill: "#1c69a1"}} d="M13 5v54l4 4V1l-4 4z"/>
                                <path d="M14.2 42.9a3 3 0 0 1-1.2-2.4V59l4 4V41.5a1.75 1.75 0 0 1-2.8 1.4z"
                                      style={{fill: "#15507a"}}/>
                                <path
                                    style={{fill: "none", stroke: "#000", strokeLinejoin: "round", strokeWidth: "2px"}}
                                    d="M17 11V9M23.129 58 17 63V13M17 7V1l38 31-30 24.474M17 1l-4 4v54l4 4"/>
                            </g>
                        </svg>
                    </button>
                    <button className="spa__swiper-button-next swiper__button-next button-next"
                            aria-label="Следующий слайд">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
                            <g data-name="05-Play">
                                <path style={{fill: "#6bdcff"}} d="m17 63 38-31L17 1v62z"/>
                                <path d="M24 34.868V6.711L17 1v62l38-31-19.331 9.977A8 8 0 0 1 24 34.868z"
                                      style={{fill: "#48befd"}}/>
                                <path style={{fill: "#1c69a1"}} d="M13 5v54l4 4V1l-4 4z"/>
                                <path d="M14.2 42.9a3 3 0 0 1-1.2-2.4V59l4 4V41.5a1.75 1.75 0 0 1-2.8 1.4z"
                                      style={{fill: "#15507a"}}/>
                                <path
                                    style={{fill: "none", stroke: "#000", strokeLinejoin: "round", strokeWidth: "2px"}}
                                    d="M17 11V9M23.129 58 17 63V13M17 7V1l38 31-30 24.474M17 1l-4 4v54l4 4"/>
                            </g>
                        </svg>
                    </button>
                    <div className="spa__swiper-pagination swiper__pagination pagination"></div>
                </div>
            </div>
        </section>
    )
}